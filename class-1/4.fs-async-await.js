// Esto solo en los modulos nativos
// que no tienen promesas nativas

// const { promify }  = require('node:util')
// const readFilePromise = promify(fs.readFile)

const { readFile } = require('node:fs/promises')

// IIFE = Inmediately Invoke Function Expression
// Una IIFE es una funcion auto invocada

async function init () {
  console.log('Leyendo el primer archivo....')
  const text = await readFile('./archivo.txt', 'utf8')
  console.log('primer texto: ', text)
  console.log('--> Hacer cosas mientras lee el archivo...')

  console.log('Leyendo el segundo archivo.....')
  const secondText = await readFile('./archivo2.txt', 'utf8')
  console.log('segundo texto: ', secondText)
}

init()

// ;(
//    async () => {
//         console.log('Leyendo el primer archivo....')
//     const text = await readFile('./archivo.txt', 'utf8')
//     console.log('primer texto: ',text)

//     console.log('Leyendo el segundo archivo.....');
//     const secondText = await readFile('./archivo2.txt', 'utf8')
//     console.log('segundo texto: ',secondText)
//    }
// )()

// Diferencias de algo asincrono pero de formas =
// asincrono secuencial  / asincrono en paralelo / sincrono
