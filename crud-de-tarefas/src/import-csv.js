import fs from 'node:fs'
import { parse } from 'csv-parse'

// Função para fazer requisição POST
async function createTask(taskData) {
  const url = 'http://localhost:3333/tasks'
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData)
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP ${response.status}: ${errorText}`)
  }

  return await response.json()
}

async function importTasksFromCSV(filePath) {
  console.log(`🚀 Iniciando importação do arquivo: ${filePath}`)
  console.log(`📡 Servidor deve estar rodando em http://localhost:3333\n`)
  
  try {
    // Verificar se o servidor está rodando
    try {
      const healthCheck = await fetch('http://localhost:3333/tasks')
      if (!healthCheck.ok) {
        throw new Error('Servidor não está respondendo')
      }
      console.log('✅ Servidor conectado com sucesso!\n')
    } catch (error) {
      throw new Error('❌ Servidor não está rodando! Execute: node server.js')
    }

    // Verifica se arquivo existe
    if (!fs.existsSync(filePath)) {
      throw new Error(`Arquivo não encontrado: ${filePath}`)
    }

    // Configurar parser CSV
    const parser = fs
      .createReadStream(filePath)
      .pipe(parse({
        columns: true, // Usar primeira linha como header
        skip_empty_lines: true, // Pular linhas vazias
        trim: true, // Remover espaços extras
      }))

    let count = 0
    const errors = []
    const successTasks = []

    console.log('📊 Processando registros...\n')

    // Iterar através de cada linha do CSV
    for await (const record of parser) {
      try {
        // Validar dados obrigatórios (validação local)
        if (!record.title || record.title.trim() === '') {
          errors.push(`Linha ${count + 1}: Título é obrigatório`)
          continue
        }

        // Preparar dados para envio (sem campos internos)
        const taskData = {
          title: record.title.trim(),
          description: (record.description || '').trim()
        }

        // Enviar requisição POST para a API
        console.log(`📤 Enviando: ${taskData.title}`)
        const createdTask = await createTask(taskData)
        
        successTasks.push(createdTask)
        count++
        
        // Feedback visual
        console.log(`✅ ${count} - ${createdTask.title} (ID: ${createdTask.id.substring(0, 8)}...)`)
        
        // Delay para não sobrecarregar o servidor
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (error) {
        errors.push(`Linha ${count + 1}: ${error.message}`)
        console.log(`❌ Erro na linha ${count + 1}: ${error.message}`)
      }
    }

    // Relatório final
    console.log('\n' + '='.repeat(50))
    console.log(`🎯 Importação concluída!`)
    console.log(`✅ Tarefas importadas: ${count}`)
    
    if (errors.length > 0) {
      console.log(`❌ Erros encontrados: ${errors.length}`)
      errors.forEach(error => console.log(`   - ${error}`))
    }

    // Mostrar primeiras tarefas criadas
    if (successTasks.length > 0) {
      console.log(`\n📋 Primeiras tarefas criadas:`)
      successTasks.slice(0, 3).forEach(task => {
        console.log(`   • ${task.title} (${task.id.substring(0, 8)}...)`)
      })
    }
    
    console.log('='.repeat(50))

  } catch (error) {
    console.error('❌ Erro na importação:', error.message)
    process.exit(1)
  }
}

// Executar o script
const csvFilePath = process.argv[2] || './tasks.csv'
importTasksFromCSV(csvFilePath)