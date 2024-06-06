import e from "cors";
import { postTareas } from "./index.js";
import { deleteTask } from "./index.js";
import { getTask } from "./index.js";


let input = document.getElementById('texto');
let boton = document.getElementById('addTarea');
let div = document.getElementById('vacioCont');
let contador = document.getElementById('contador');
let checkCount = 0; // Variable para contar los checks
getTask()
// Función para actualizar el contador
function updateCounter() {
    contador.innerText = checkCount;
}

// input.addEventListener()



boton.addEventListener('click', function () {
    if (input.value.trim() === '') { // el metodo trim elimina los espacios y los transforma en nada
        // No hacer nada si el input está vacío
        alert('Por favor, ingrese una tarea.');
        return;
    }
    
    asignar();

    async function asignar() {

        

        let valores = await postTareas(input.value);
        

        valores.forEach(function (e){
            console.log(e.id);
            

        })

        let task = document.createElement('div');
        task.className = 'task';
        task.id = valores[valores.length-1].id;
        console.log(valores);

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.title = "Marcar";
        checkbox.className = 'checkbox';


        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                checkCount++;
            } else {
                checkCount = Math.max(0, checkCount - 1); // Evitar que baje de 0
            }
            updateCounter();
        });

        let taskText = document.createElement('span');
        taskText.innerText = input.value;

        let deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '♻️'; // Icono de papelera
        deleteIcon.title = "Borrar";
        deleteIcon.className = 'delete-icon';

        deleteIcon.addEventListener('click', function() { // evento de click para borrar el div
            if (checkbox.checked) {
                checkCount = Math.max(0, checkCount - 1); // Decrementar el contador si estaba marcado
                updateCounter();
            }
            div.removeChild(task);
            deleteTask(task.id); // se llama la funcion de borrar datos de la API
        });

        task.appendChild(checkbox);
        task.appendChild(taskText);
        task.appendChild(deleteIcon);
        div.appendChild(task);

        if (boton != false && input != "") {
            console.log(task);
        }
        input.value = "";
        
    }
});

// Inicializa el contador en el DOM
updateCounter();
