// To use the Try...Catch method you have to add '/promises' to the const fs
const fs = require('node:fs')

// A ''ls' command whit a CallBack
fs.readdir('.', (err, files) => {
  if (err) {
    console.log('Error al leer el director', err)
    return
  }

  files.forEach((file) => {
    console.log(file)
  })
})

// // Whit a TryCath
// fs.readdir('.')
//   .then(files => {
//     files.forEach(file => {
//       console.log(file)
//     })
//   })
//   .catch(err => {
//     if (err) {
//       console.error('Error al leer el directorio: ', err)
//       return;
//     }
//   })
