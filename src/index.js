// const { text } = require("express")

// Inserte el código aquí
let input = document.getElementById('texto')
let boton = document.getElementById ('addTarea')
let div = document.getElementById ('vacioCont')
// let boton = document.getElementById('addTarea')


boton.addEventListener('click', function (){
    
    let task = document.createElement('div')
    task.style.border= "1px solid black";
    task.style.padding= "3px"
    task.style.gap = "3px"
    task.innerHTML = input.value
    div.appendChild(task)
})

async function addTask() {
    try { //si promesa se resuelve, https status 200
      const response = await fetch('http://localhost:3000/api/task');
      const data = await response.json(); //Await pausa la ejecución de una función hasta que la promisa sea resuelva
      console.log(data);
      //capturar pokemon
    } catch (error) { //si promesa no se resuelve, https status 400-499 y 500-599
      console.error(error);
    }
  }