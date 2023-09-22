// Esto solo en los modulos nativos
// que no tienen promesas nativas

// const { promify }  = require('node:util')
// const readFilePromise = promify(fs.readFile)

import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./archivo.txt', 'utf8'),
  readFile('./archivo2.txt', 'utf8')
]).then(([text, secondText]) => {
  console.log('primer texto: ', text)
  console.log('segundo texto: ', secondText)
})

// console.log('Leyendo el primer archivo....')
// const text = await readFile('./archivo.txt', 'utf8')
// console.log('primer texto: ',text)
// console.log('Leyendo el segundo archivo.....');
// const secondText = await readFile('./archivo2.txt', 'utf8')
// console.log('segundo texto: ',secondText)

// Async-await whit ESM
