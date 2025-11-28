// Sobre Streams
  // Consegue ler pequenas partes de alguma coisa e conseguir trabalhar com aqueles dados mesmo sem conseguir ler o arquivo por completo.

// Inicialmente pensamos: Netflix & Spotify

// Importação de clientes via CSV (Excel)
// 1gb - 1.000.000
// POST /upload import.csv

// 10mb/s - 100s

// 100s -> Inserções no banco de dados

// 10mb/s -> 10.000 linhas

// Readable Streams (Lendo uma informação aos poucos "usuário para backend")/Writable Streams (Enviando uma informação aos poucos "para o frontend")

// Streams ->

// process.stdin
//   .pipe(process.stdout)

import { Readable } from 'node:stream'

class OneToHundredStream extends Readable { 
  index = 1
  
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {

}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())