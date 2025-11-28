// Representação de um espaço na memória do computador usando especificamente para transitar dadods de uma maneira muito rápida
// Salvar e ler na memória de uma maneira muito rápida
// Usado em streams para otimizar a performance
// Ele guarda os dados de maneira binária

const buf = Buffer.from('Hello World!')
console.log(buf)
// <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>

// hexadecimal 0123456789abcdef