import { postTareas } from "./index.js";
import { getTask } from "./index.js";
import { div } from "./form.js";
import { deleteTask } from "./index.js";
import { men } from "./form.js";
export{elementos}



async function elementos() {
    let checkCount = localStorage.getItem('taskCount') ? parseInt(localStorage.getItem('taskCount')) : 0;
    let contador = document.getElementById('contador');
    contador.innerText = checkCount;

    function updateCounter() {
        contador.innerText = checkCount;
        localStorage.setItem('taskCount', checkCount);
    }

    // Guarda el estado del checkbox (marcado o no marcado) en el localStorage
    function saveCheckboxState(id, state) {
        let estadoCheck = JSON.parse(localStorage.getItem('estadoCheck')) || {};
        estadoCheck[id] = state;
        localStorage.setItem('estadoCheck', JSON.stringify(estadoCheck));
    }

    // Recupera el estado del checkbox desde el localStorage
    function getCheckboxState(id) {
        let estadoCheck = JSON.parse(localStorage.getItem('estadoCheck')) || {};
        return estadoCheck[id] || false;
    }

    try {
        // Obtiene las tareas desde una fuente externa (API)
        let tareas = await getTask();
        
            tareas.forEach(async (tarea) => {
                // Crea un párrafo para mostrar la descripción de la tarea
                let parrafo = document.createElement('p');
                parrafo.innerHTML = tarea.task;
                // console.log(tarea, "tarea1");
    
                // Crea un contenedor div para la tarea
                let task = document.createElement('div');
                task.className = 'task';
                task.id = tarea.id;
    
                // Crea un checkbox para marcar la tarea
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.title = "Marcar";
                checkbox.className = 'checkbox';
                checkbox.checked = getCheckboxState(tarea.id); // Restaura el estado del checkbox
                if (checkbox.checked) {
                    checkCount++;
                    updateCounter();
                }
                // console.log(tarea, "tarea2");
    
                // Evento para actualizar el contador y guardar el estado del checkbox al cambiar el estado del checkbox
                checkbox.addEventListener('change', function () {
                    if (checkbox.checked) {
                        checkCount++;
                    } else {
                        checkCount = Math.max(0, checkCount - 1);
                    }
                    saveCheckboxState(tarea.id, checkbox.checked);
                    updateCounter();
                });
    
                // Crea un icono de papelera para borrar la tarea
                let deleteIcon = document.createElement('span');
                deleteIcon.innerHTML = '♻️'; // Icono de papelera
                deleteIcon.title = "Borrar";
                deleteIcon.className = 'delete-icon';
    
                // Evento para borrar la tarea y actualizar el contador
                deleteIcon.addEventListener('click', function () {
                    if (checkbox.checked) {
                        checkCount = Math.max(0, checkCount - 1);
                        updateCounter();
                    }
                    div.removeChild(task);
                    deleteTask(tarea.id);
                    console.log(tarea, "tarea3");
                    localStorage.removeItem('estadoCheck')[tarea.id]; // Elimina el estado del checkbox del localStorage
                });
    
                // Añade los elementos creados al DOM
                task.appendChild(parrafo);
                task.appendChild(checkbox);
                task.appendChild(deleteIcon);
                div.appendChild(task);
            }
        
      
    )} catch (error) {
        console.error(error);
    }
}
