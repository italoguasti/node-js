import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from '../utils/build-route-path.js'
import path from 'node:path'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      const task = ({
        id: randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        completed_at: null,
        title,
        description: description || '',
      })

      database.insert('tasks', task)
      
      res.writeHead(201, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(task))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const tasks = database.select('tasks')
      const existingTask = tasks.find(task => task.id === id)

      if (!id) {
        return res.writeHead(400).end(JSON.stringify({
          error: 'Task ID is required'
        }))
      }

      if (!existingTask) {
        return res.writeHead(404).end(JSON.stringify({
          error: 'Task not found'
        }))
      }

      if (!title || title.trim() === '') {
        return res.writeHead(400).end(JSON.stringify({
          error: 'Title is required'
        }))
      }

      const now = new Date().toISOString()

      // ✅ Garantir que SEMPRE tenha todos os campos
      const updatedTask = {
        id: existingTask.id,
        title: title.trim(),
        description: (description || '').trim(),
        created_at: existingTask.created_at || now, // ✅ Fallback se não existir
        updated_at: now,
        completed_at: existingTask.completed_at || null // ✅ Fallback se não existir
      }

      database.update('tasks', id, updatedTask)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(updatedTask))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {

      const { id } = req.params

      if (!id || id.trim() === '') {
        return res.writeHead(400).end(JSON.stringify({
          error: 'Task ID cannot be empty'
        }))
      }

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      // ✅ 1. Validar se ID foi fornecido
      if (!id || id.trim() === '') {
        return res.writeHead(400).end(JSON.stringify({
          error: 'Task ID is required'
        }))
      }

      // ✅ 2. Buscar tarefa existente
      const tasks = database.select('tasks')
      const existingTask = tasks.find(task => task.id === id)

      // ✅ 3. Validar se tarefa existe
      if (!existingTask) {
        return res.writeHead(404).end(JSON.stringify({
          error: 'Task not found'
        }))
      }

      const now = new Date().toISOString()

      // ✅ 4. Toggle do status: se completed_at é null → completa, senão → volta para pendente
      const isCurrentlyCompleted = existingTask.completed_at !== null

      const updatedTask = {
        ...existingTask,
        completed_at: isCurrentlyCompleted ? null : now, // Toggle
        updated_at: now
      }

      // ✅ 5. Atualizar no banco
      database.update('tasks', id, updatedTask)

      // ✅ 6. Resposta com a tarefa atualizada
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({
        message: isCurrentlyCompleted ? 'Task marked as pending' : 'Task marked as completed',
        task: updatedTask
      }))
    }
  }
]

