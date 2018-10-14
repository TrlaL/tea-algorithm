const Tea = require('./src/tea.js')

const data = 'Привет, мир!?'
const password = 'GagaGA113'
const tea = new Tea()
const encrypted = tea.encrypt(data, password)
const decrypted = tea.decrypt(encrypted, password)

console.log('encrypted:', encrypted)
console.log('decrypted:', decrypted)