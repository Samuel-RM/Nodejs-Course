// Esto solo en los modulos nativos
// que no tienen promesas nativas

// const { promify }  = require('node:util')
// const readFilePromise = promify(fs.readFile)

const fs = require('node:fs/promises')

fs.readFile('./archivo.txt', 'utf8').then((text) => {
  console.log('primer texto: ', text)
})

console.log('acer cosas mientras lee el arcivo')

fs.readFile('./archivo2.txt', 'utf8').then((text) => {
  console.log('segundo texto: ', text)
})
