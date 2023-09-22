// Diferent usess of 'process'

// argumentos de entrada
// console.log(process.argv)

// controlar el proceso y su salida
// process.exit(1)

// podemos controlar eventos del proceso
// process.on('exit', () => {
//   // limpiar los recursos
// })

// current working directory
console.log(process.cwd())

// platform
console.log(process.env.NODE_ENV)
// Example
// if (process.env.NODE_ENV === 'development'){
//     console.log('Do not deploy!! Do not deploy!!');
//   }
