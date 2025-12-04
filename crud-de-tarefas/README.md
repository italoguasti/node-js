# 📋 CRUD de Tarefas - Node.js

> Uma API REST completa para gerenciamento de tarefas, desenvolvida com **Node.js puro** aplicando conceitos fundamentais do servidor.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Status](https://img.shields.io/badge/Status-Completo-brightgreen)

## 🚀 **Sobre o Projeto**

Este é um projeto prático de **CRUD (Create, Read, Update, Delete)** para gerenciamento de tarefas, desenvolvido com **Node.js puro** sem frameworks externos. O objetivo é aplicar e consolidar os fundamentos do Node.js, incluindo:

- ✅ Servidor HTTP nativo
- ✅ Roteamento dinâmico com regex
- ✅ Middlewares customizados
- ✅ Manipulação de streams e JSON
- ✅ Sistema de banco de dados em arquivo
- ✅ Importação de dados via CSV

## 📁 **Estrutura do Projeto**

```
crud-de-tarefas/
├── 📂 src/
│   ├── 📂 middlewares/
│   │   ├── 📄 database.js          # Simulação de banco de dados
│   │   ├── 📄 json.js              # Middleware para parsing JSON
│   │   └── 📄 routes.js            # Definição das rotas da API
│   ├── 📂 utils/
│   │   ├── 📄 build-route-path.js  # Construtor de rotas com regex
│   │   └── 📄 extract-query-params.js # Extrator de query parameters
│   ├── 📄 server.js                # Servidor principal
│   ├── 📄 import-csv.js            # Script de importação CSV
│   ├── 📄 tasks.csv                # Arquivo exemplo para importação
│   └── 📄 db.json                  # Arquivo de banco de dados
├── 📄 package.json
└── 📄 README.md
```

## 🛠️ **Tecnologias Utilizadas**

- **[Node.js](https://nodejs.org/)** (v18+) - Runtime JavaScript
- **[csv-parse](https://csv.js.org/parse/)** - Biblioteca para parsing de CSV
- **HTTP nativo** - Servidor sem frameworks
- **File System** - Persistência em arquivo JSON

## ⚙️ **Instalação e Configuração**

### **1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/crud-de-tarefas.git
cd crud-de-tarefas
```

### **2. Instale as dependências**
```bash
npm install
```

### **3. Inicie o servidor**
```bash
npm run dev
```

O servidor estará rodando em: **http://localhost:3333**

## 📡 **Documentação da API**

### **Base URL**
```
http://localhost:3333
```

### **Endpoints Disponíveis**

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| `POST` | `/tasks` | Criar uma nova tarefa |
| `GET` | `/tasks` | Listar todas as tarefas |
| `GET` | `/tasks?search=termo` | Buscar tarefas por título/descrição |
| `PUT` | `/tasks/:id` | Atualizar uma tarefa completa |
| `PATCH` | `/tasks/:id/complete` | Marcar/desmarcar tarefa como concluída |
| `DELETE` | `/tasks/:id` | Deletar uma tarefa |

### **📋 Estrutura da Tarefa**
```javascript
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "title": "Estudar Node.js",
  "description": "Aprender os fundamentos do Node.js",
  "created_at": "2024-12-04T10:30:00.000Z",
  "updated_at": "2024-12-04T10:30:00.000Z",
  "completed_at": null
}
```

### **🔗 Exemplos de Uso**

#### **Criar Tarefa**
```bash
curl -X POST http://localhost:3333/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Minha primeira tarefa",
    "description": "Descrição da tarefa"
  }'
```

#### **Listar Todas as Tarefas**
```bash
curl http://localhost:3333/tasks
```

#### **Buscar Tarefas**
```bash
curl "http://localhost:3333/tasks?search=node"
```

#### **Atualizar Tarefa**
```bash
curl -X PUT http://localhost:3333/tasks/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Título atualizado",
    "description": "Nova descrição"
  }'
```

#### **Marcar como Concluída**
```bash
curl -X PATCH http://localhost:3333/tasks/{id}/complete
```

#### **Deletar Tarefa**
```bash
curl -X DELETE http://localhost:3333/tasks/{id}
```

## 📤 **Importação via CSV**

### **Formato do Arquivo CSV**
```csv
title,description
Estudar Node.js,Aprender os fundamentos do Node.js
Criar API REST,Desenvolver uma API completa
Implementar CRUD,Criar operações de banco de dados
```

### **Como Importar**
```bash
# 1. Certifique-se que o servidor está rodando
node src/server.js

# 2. Em outro terminal, execute:
node src/import-csv.js

# Ou especifique um arquivo:
node src/import-csv.js caminho/para/arquivo.csv
```

## 🎯 **Funcionalidades**

### ✅ **Implementadas**
- [x] **CRUD Completo** - Criar, listar, atualizar e deletar tarefas
- [x] **Busca** - Filtrar tarefas por título ou descrição  
- [x] **Status de Conclusão** - Marcar tarefas como concluídas/pendentes
- [x] **Validações** - Validação de dados obrigatórios
- [x] **Timestamps** - Controle de criação e atualização
- [x] **Importação CSV** - Import em lote via arquivo CSV
- [x] **Tratamento de Erros** - Respostas HTTP apropriadas
- [x] **Roteamento Dinâmico** - Sistema de rotas com parâmetros

### 🔄 **Possíveis Melhorias**
- [ ] Autenticação e autorização
- [ ] Paginação para listagem
- [ ] Filtros avançados (data, status)
- [ ] Backup automático do banco
- [ ] Rate limiting
- [ ] Logs estruturados
- [ ] Testes automatizados

## 🧪 **Testando a API**

### **Com cURL**
Todos os exemplos acima utilizam cURL para testar os endpoints.

### **Com Insomnia/Postman**
Importe a coleção com os seguintes requests:
- **Create Task** - `POST /tasks`
- **List Tasks** - `GET /tasks`
- **Search Tasks** - `GET /tasks?search=termo`
- **Update Task** - `PUT /tasks/:id`
- **Toggle Task Completion** - `PATCH /tasks/:id/complete`
- **Delete Task** - `DELETE /tasks/:id`

## 📚 **Conceitos Aplicados**

Este projeto demonstra o uso prático de:

- **HTTP Server** nativo do Node.js
- **Streams** para processamento de dados
- **Event Loop** e programação assíncrona
- **Modules** ES6 (import/export)
- **File System** para persistência
- **RegExp** para roteamento dinâmico
- **JSON** manipulation e parsing
- **Error handling** e status codes HTTP
- **CSV parsing** e data import

## 👨‍💻 **Autor**

Desenvolvido como projeto prático para estudo dos fundamentos do **Node.js** por @italoguasti.

---