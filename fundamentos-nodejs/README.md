# 📋 CRUD de Tarefas - Node.js

> Uma API REST para gerenciamento de tarefas desenvolvida durante o curso da **Rocketseat**, implementada com **Node.js puro** e focada no aprendizado dos conceitos fundamentais da plataforma.

![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![ES Modules](https://img.shields.io/badge/ES_Modules-✅-blue)
![Status](https://img.shields.io/badge/Status-Completo-brightgreen)
![Rocketseat](https://img.shields.io/badge/Rocketseat-🚀-purple)

## 🚀 **Sobre o Projeto**

Este projeto implementa um **CRUD completo de tarefas** utilizando apenas tecnologias nativas do Node.js, sem frameworks externos. Foi desenvolvido como prática durante um curso da **Rocketseat**, com foco no aprendizado de:

- ✅ **Módulos ES** (import/export)
- ✅ **Roteamento manual** com regex
- ✅ **Middlewares simples** customizados
- ✅ **File System** para persistência
- ✅ **Manipulação de JSON** e streams
- ✅ **UUID** com crypto nativo

## 📁 **Estrutura do Projeto**

```
fundamentos-nodejs/
├── 📂 streams/                     # 📖 Material educacional sobre Streams
│   ├── 📄 fundamentals.js          # Conceitos básicos de streams
│   ├── 📄 buffer.js                # Explicação sobre Buffers
│   ├── 📄 stream-http-server.js    # Servidor HTTP com streams
│   └── 📄 fake-upload-to-http-stream.js # Simulação de upload
├── 📂 src/
│   ├── 📂 middlewares/
│   │   ├── 📄 database.js          # Classe Database (CRUD local)
│   │   ├── 📄 json.js              # Parser de JSON body
│   │   └── 📄 routes.js            # Definição das rotas
│   ├── 📂 utils/
│   │   ├── 📄 build-route-path.js  # Construtor de rotas parametrizadas
│   │   └── 📄 extract-query-params.js # Extrator de query strings
│   ├── 📄 server.js                # Servidor HTTP principal
│   ├── 📄 db.json                  # Arquivo de persistência
│   ├── 📄 import-csv.js            # Utilitário de importação CSV
│   └── 📄 tasks.csv                # Arquivo exemplo para importação
├── 📄 package.json
└── 📄 README.md
```

## 📚 **Material de Estudo - Streams**

O projeto inclui uma pasta `/streams` com exemplos práticos para compreensão dos conceitos de streams no Node.js:

### **🔍 Arquivos de Estudo:**

#### **`buffer.js` - Conceitos de Buffer**
```javascript
// Representação de um espaço na memória para transitar dados rapidamente
// Usado em streams para otimizar performance
// Guarda dados de maneira binária

const buf = Buffer.from('Hello World!')
console.log(buf) // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>
```

#### **`fundamentals.js` - Fundamentos de Streams**
Demonstra os conceitos essenciais:
- **Readable Streams** - Lendo informações aos poucos
- **Writable Streams** - Enviando informações aos poucos  
- **Transform Streams** - Transformando dados em trânsito
- **Pipeline** - Conectando streams com `.pipe()`

**Caso de uso real:** Importação de CSV de 1GB sem carregar tudo na memória.

#### **`stream-http-server.js` - HTTP com Streams**
```javascript
// Servidor que processa dados por chunks
// req => ReadableStream
// res => WritableStream

const server = http.createServer(async (req, res) => {
  const buffers = []
  
  for await (const chunk of req) {
    buffers.push(chunk)
  }
  
  const fullStreamContent = Buffer.concat(buffers).toString()
  res.end(fullStreamContent)
})
```

#### **`fake-upload-to-http-stream.js` - Upload Simulado**
```javascript
// Simula upload de dados em chunks
class OneToHundredStream extends Readable { 
  index = 1
  
  _read() {
    const i = this.index++
    setTimeout(() => {
      if (i > 5) {
        this.push(null) // Finaliza stream
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf) // Envia chunk
      }
    }, 1000)
  }
}
```

### **🎯 Conceitos de Streams Demonstrados:**

1. **📦 Buffers** - Representação binária de dados na memória
2. **📡 Readable Streams** - Leitura de dados por partes
3. **📤 Writable Streams** - Escrita de dados por partes  
4. **🔄 Transform Streams** - Transformação de dados em tempo real
5. **🔗 Pipelines** - Conexão entre streams
6. **⚡ Performance** - Processamento sem carregar tudo na memória

### **🚀 Como Executar os Exemplos:**

```bash
# 1. Executar servidor de exemplo
node streams/stream-http-server.js

# 2. Em outro terminal, testar upload
node streams/fake-upload-to-http-stream.js

# 3. Testar conceitos básicos
node streams/fundamentals.js
node streams/buffer.js
```

### **🧠 Por que Streams são Importantes:**

- **🚀 Performance** - Processa dados grandes sem sobrecarregar memória
- **⚡ Eficiência** - Inicia processamento antes de receber todos os dados  
- **📊 Escalabilidade** - Lida com arquivos/dados de qualquer tamanho
- **🔄 Real-time** - Processamento contínuo e em tempo real

## 🛠️ **Tecnologias Utilizadas**

- **[Node.js](https://nodejs.org/)** (v16+) - Runtime JavaScript
- **ES Modules** - Sistema de módulos nativo
- **HTTP API** - Servidor nativo do Node.js
- **File System** - Persistência em `db.json`
- **Crypto UUID** - Geração de IDs únicos
- **csv-parse** - Biblioteca para parsing de CSV

## ⚙️ **Como Executar**

### **Instalação Rápida**
```bash
# 1. Clonar/navegar para o diretório
cd fundamentos-nodejs

# 2. Instalar dependências (se necessário)
npm install

# 3. Executar o servidor
node src/server.js
```

O servidor estará disponível em: **http://localhost:3333**

## 📡 **API Endpoints**

### **Base URL**
```
http://localhost:3333
```

### **📋 Listar Tarefas**
```http
GET /tasks
GET /tasks?search=texto
```

**Exemplos:**
```bash
# Listar todas
curl -i "http://localhost:3333/tasks"

# Buscar por termo
curl -i "http://localhost:3333/tasks?search=leitura"
```

**Resposta:** `200` com array de tarefas

### **➕ Criar Tarefa**
```http
POST /tasks
Content-Type: application/json

{
  "title": "Comprar creatina",
  "description": "Ir ao mercado"
}
```

**Exemplo:**
```bash
curl -i -X POST http://localhost:3333/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Comprar creatina","description":"Ir ao mercado"}'
```

**Resposta:** `201` com a tarefa criada

### **✏️ Atualizar Tarefa**
```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Novo título",
  "description": "Nova descrição"
}
```

**Exemplo:**
```bash
curl -i -X PUT http://localhost:3333/tasks/{ID} \
  -H "Content-Type: application/json" \
  -d '{"title":"Novo título","description":"Nova descrição"}'
```

**Resposta:** `200` com tarefa atualizada | `400` dados inválidos | `404` não encontrada

### **🗑️ Deletar Tarefa**
```http
DELETE /tasks/:id
```

**Exemplo:**
```bash
curl -i -X DELETE http://localhost:3333/tasks/{ID}
```

**Resposta:** `204` sem conteúdo (sucesso)

### **✅ Toggle Conclusão**
```http
PATCH /tasks/:id/complete
```

**Exemplo:**
```bash
curl -i -X PATCH http://localhost:3333/tasks/{ID}/complete
```

**Resposta:** `200` com mensagem e tarefa atualizada

## 📄 **Estrutura da Tarefa**

```json
{
  "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "title": "Comprar creatina",
  "description": "Ir ao mercado",
  "created_at": "2024-12-04T10:30:00.000Z",
  "updated_at": "2024-12-04T10:30:00.000Z",
  "completed_at": null
}
```

## 📤 **Importação via CSV**

### **Formato do Arquivo**
```csv
title,description
Estudar Node.js,Aprender conceitos fundamentais
Fazer exercícios,Praticar desenvolvimento de APIs
```

### **Como Importar**
```bash
# Com arquivo padrão
node src/import-csv.js

# Com arquivo específico
node src/import-csv.js caminho/para/arquivo.csv
```

## 🔧 **Arquivos Principais**

### **`database.js` - Classe Database**
Controla operações CRUD no arquivo `db.json`:
- `select(table, search)` - Lista registros (com filtro opcional)
- `insert(table, data)` - Adiciona novo registro
- `update(table, id, data)` - Atualiza registro existente
- `delete(table, id)` - Remove registro

### **`routes.js` - Sistema de Rotas**
Array de rotas com `method`, `path` e `handler` para todas as operações CRUD.

### **`json.js` - Middleware JSON**
Processa o body das requisições HTTP e popula `req.body` com objeto JavaScript usando streams.

## ⚠️ **Troubleshooting**

### **Erro Comum:**
```
TypeError: Cannot read properties of undefined (reading 'toLowerCase')
```

**Causa:** Busca em campos undefined/null

**Solução:** Validar campos antes do `.toLowerCase()`:
```javascript
// Em database.js - função select
if (search) {
  data = data.filter(row => {
    return Object.entries(search).some(([key, value]) => {
      const field = row[key]
      if (!field || typeof field !== 'string') return false
      return field.toLowerCase().includes(String(value).toLowerCase())
    })
  })
}
```

## 🎯 **Conceitos Aplicados**

- **HTTP Server** nativo do Node.js
- **ES Modules** (import/export)
- **Roteamento manual** com RegExp
- **Middlewares** customizados
- **File System** para persistência
- **🌊 Streams** para requisições HTTP e processamento de CSV
- **📦 Buffers** para manipulação eficiente de dados binários
- **JSON** parsing e manipulation
- **UUID** generation com crypto
- **Error handling** e status codes HTTP
- **Pipeline processing** com `.pipe()`

## 📚 **Material de Apoio**

Este projeto foi desenvolvido como parte da formação **Node.js da Rocketseat**, aplicando os fundamentos do Node.js de forma prática e incremental.

**Recursos utilizados:**
- Documentação oficial do Node.js
- Conceitos de APIs REST
- Boas práticas base de desenvolvimento backend
- Exemplos práticos com Streams e Buffers

---