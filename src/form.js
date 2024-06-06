import { postTareas } from "./index.js";
import { deleteTask } from "./index.js";
import { getTask } from "./index.js";
import { elementos } from "./elementos.js";

export{div}

let input = document.getElementById('texto');
let boton = document.getElementById('addTarea');
let div = document.getElementById('vacioCont');
let contador = document.getElementById('contador');
let checkCount = 0; // Variable para contar los checks
getTask()


async function showTask() {
    elementos()
    
}

window.addEventListener("load", ()=> {
    showTask()
})
// Función para actualizar el contador en el DOM
function updateCounter() {
    contador.innerText = checkCount;
}



// Función para añadir una tarea
async function asignar() {
    if (input.value.trim() === '') { // el metodo trim elimina los espacios y los transforma en nada
        // No hacer nada si el input está vacío
        alert('Por favor, ingrese una tarea.');
        return;
    }
        
    // variable que contiene la data de la API por medio de la funcion postTareas
    let valores = await postTareas(input.value);

    // crea un contenedor donde se guarda la tarea, el checkbox y el emoji
    let task = document.createElement('div');
    task.className = 'task';
    task.id = valores[valores.length-1].id;
    // console.log(valores);

    // crea un checkbox para marcar la tarea como realizada
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.title = "Marcar";
    checkbox.className = 'checkbox';

    // evento de cambio para el checkbox para que no baje de 0
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            checkCount++;
        } else {
            checkCount = Math.max(0, checkCount - 1); // Evitar que baje de 0
        }
        updateCounter();
        // return task
    });

    // agrega al div lo que la persona puso en la tarea
    let taskText = document.createElement('span');
    taskText.innerText = input.value;

    // crea in emoji para  borrar la tarea
    let deleteIcon = document.createElement('span');
    deleteIcon.innerHTML = '♻️'; // Icono de papelera
    deleteIcon.title = "Borrar";
    deleteIcon.className = 'delete-icon';

    deleteIcon.addEventListener('click', function() { // evento de click para borrar el div
        if (checkbox.checked) {
            checkCount = Math.max(0, checkCount - 1); // Decrementa el contador si estaba marcado
            updateCounter();
        }
        div.removeChild(task);
        deleteTask(task.id); // se llama la funcion de borrar datos de la API
    });

    task.appendChild(checkbox);
    task.appendChild(taskText);
    task.appendChild(deleteIcon);
    div.appendChild(task);

    // validacion para dejar el input vacio cuando se agrege una tarea
    if (boton != false && input != "") {
        console.log(task);
    }
    input.value = "";
}

// Event listener para el botón que llama a la funcion de arriba llamada asignar
boton.addEventListener('click', asignar);

// Event listener para el input, para que cuando le de enter sea como el boton
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        asignar();
    }
    getTask()
});

// actualiza el contador
updateCounter();
