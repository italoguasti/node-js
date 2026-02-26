import { expect, it, beforeAll, afterAll, describe } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app.js'
import { beforeEach } from 'node:test'

describe('Transactions routes', () => {
  beforeAll( async () => {
    await app.ready()
  })
  
  afterAll( async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })
  
  // deve ser possivel fazer x
  it('should be able to create a new transaction', async () => {
    const response = await request( app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 6200,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
    .post('/transactions')
    .send({
      title: 'New transaction',
      amount: 5000,
      type: 'credit',
    })
    
    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies || [])
      .expect(200)

    const transactionId = listTransactionResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies || [])
      .expect(200)

    expect(listTransactionResponse.body.transactions).toEqual(
        expect.objectContaining({
          title: 'New transaction',
          amount: 5000,
        }),
    )
  })
})