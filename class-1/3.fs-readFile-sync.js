const fs = require('node:fs')

console.log('Leyendo el primero archivo ...')
const text = fs.readFile('./archivo.txt', 'utf8')
console.log('primer texto: ', text)

console.log('acer cosas mientras lee el arcivo')

console.log('Leyendo el segundo archivo...')
const secondText = fs.readFile('./archivo2.txt', 'utf8')
console.log('segundo texto: ', secondText)
