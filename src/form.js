
import { postTareas } from './index.js';
import { elementos } from './elementos.js';
export {actuaConunter}
export {revisarTareas}
export {showTask}

// Obtener referencias a elementos del DOM
let input = document.getElementById('texto');
let boton = document.getElementById('addTarea');
let div = document.getElementById('vacioCont');
let contador = document.getElementById('contador');
let men = document.getElementById("mensajeTarea");

let checkCount = 0; // Variable para contar los checks

// Función que se ejecuta cuando la página carga
window.addEventListener("load", () => {
    showTask(); // Muestra las tareas al cargar la página
});

// Función para actualizar el contador en el DOM
function actuaConunter(count) {
    checkCount = count;
    contador.innerText = checkCount;
    localStorage.setItem('checkCount', checkCount); // Guarda el contador en localStorage
}

// Función para añadir una tarea
async function asignar() {
    if (input.value.trim() === '') {
        alert('Por favor, ingrese una tarea.'); // Muestra una alerta si el input está vacío
        return;
    }
    await postTareas(input.value); // Llama a la función para agregar la tarea a la API
    input.value = ""; // Limpia el input
    showTask(); // Muestra las tareas actualizadas desde la API
}

// Event listener para el botón que llama a la función asignar
boton.addEventListener('click', asignar);

// Event listener para el input, para que cuando se presione Enter también llame a la función asignar
input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        asignar();
    }
});

// Función para verificar si hay tareas en el div
function revisarTareas() {
    if (div.children.length === 0) {
        men.style.display = "block"; // Muestra el mensaje si no hay tareas
    } else {
        men.style.display = "none"; // Oculta el mensaje si hay tareas
    }
}

// Función para mostrar las tareas llamando a elementos
async function showTask() {
    men.style.display = "none"; // Oculta el mensaje al cargar las tareas
    elementos(); // Llama a elementos para mostrar las tareas
}
