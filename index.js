const fs = require('fs')
const Tea = require('./src/tea')

const tea = new Tea();

const params = {
  encrypted: 'encrypted.txt',
  decrypted: 'decrypted.txt',
  encoding: 'utf8',
  data: 'Какой-то сложный текст: привет, мир!?',
  password: 'gagaga1'
}

function encrypt(params) {
  const encrypted = tea.encrypt(params.data, params.password)
  fs.writeFileSync(params.encrypted, encrypted, params.encoding)
}

function decrypt(params) {
  const encrypted = fs.readFileSync(params.encrypted, params.encoding)
  const decrypted = tea.decrypt(encrypted, params.password)
  fs.writeFileSync(params.decrypted, decrypted)
}

encrypt(params)
decrypt(params)