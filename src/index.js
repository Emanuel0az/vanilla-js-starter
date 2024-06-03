// const { text } = require("express")

// Inserte el código aquí
let texto = document.getElementById('texto')
let boton = document.getElementById('addTarea')


boton.addEventListener('click', function (){
    let nuevoDiv = document.createElement('div')
    let nuevoText = texto
    nuevoDiv.appendChild(nuevoText)

})