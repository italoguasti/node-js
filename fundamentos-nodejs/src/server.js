import http from 'node:http'
import { routes } from './middlewares/routes.js'
import { json } from './middlewares/json.js'
import { extractQueryParams } from './utils/extract-query-params.js'


// - HTTP
//   - Método HTTP
//   - URL
// GET, POST, PUT, PATCH, DELETE

// Stateful - Stateless

// JSON - JavaScript Object Notation

// Cabecalhos (Requisições e Respostas) => Metadados

// HTTP Status Code

// UUID - Universally Unique Identifier

// Formar de qualquer aplicação que consumir a API consegue enviar informações
// Query Parameters: http://localhost:3333/users?userId=1&name=Lito |
//     URL Stateful -> Filtos, paginação, ordenação, não-obrigatórios
// Route Parameters: GET http://localhost:3333/users/1 | 
//      DELETE http://localhost:3333/users/1 | Identificação de recursos (na URL)
// Request Body: Envio de informações de um formulário (HTTPs)

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    const { query, ...params } = routeParams.groups

    req.params = params
    req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end() 
})

server.listen(3333)

// Middleware é um interceptor de requisições
// Ele recebe como parametro req, res