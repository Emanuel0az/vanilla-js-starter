
import { postTareas } from "./index.js";

let input = document.getElementById('texto');
let boton = document.getElementById('addTarea');
let div = document.getElementById('vacioCont');

boton.addEventListener('click', function () {
    if (input.value.trim() === '') { // el metodo trim elimina los espacios y los transforma en nada
        // No hacer nada si el input está vacío
        alert('Por favor, ingrese una tarea.');
        return;
    }

    let task = document.createElement('div');
    task.className = 'task';
    
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.title = "Marcar"
    checkbox.className = 'checkbox';
    
    let taskText = document.createElement('span');
    taskText.innerText = input.value;
    
    let deleteIcon = document.createElement('span');
    deleteIcon.innerHTML = '♻️'; // Icono de papelera
    deleteIcon.title = "Borrar"
    deleteIcon.className = 'delete-icon';
    deleteIcon.addEventListener('click', function() {
        div.removeChild(task);
    });
    
    task.appendChild(checkbox);
    task.appendChild(taskText);
    task.appendChild(deleteIcon);
    div.appendChild(task);
    
    // input.value = ''; // Limpiar el campo de entrada

    if (boton != false && input != "") {
      console.log(postTareas);

      postTareas(input.value)

    }

});