import { postTareas } from "./index.js";
import { deleteTask } from "./index.js";
import { getTask } from "./index.js";
import { div } from "./form.js";

export {elementos}


async function elementos() {
    let count = 0
    try { 
        let tareas = await getTask()
        tareas.forEach(async (tareas) => {
            let parrafo = document.createElement('p')
            parrafo.innerHTML = tareas.task; 
            console.log(tareas, "tarea1");
            let task = document.createElement('div');
            task.className = 'task';
            task.id= tareas.id

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.title = "Marcar";
            checkbox.className = 'checkbox';
            console.log(tareas, "tareas2");


            // function updateCounter() {
            //     contador.innerText = checkCount;
            // }
            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    count++;
                } else {
                    count = Math.max(0, count - 1); // Evitar que baje de 0
                }
                // updateCounter();
                // return task
            });

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
            deleteTask(task.id);// se llama la funcion de borrar datos de la API
            console.log(tareas,"tareas3");
            
            });
            task.appendChild(parrafo)   
            div.appendChild(task)
            task.appendChild(checkbox);
            task.appendChild(deleteIcon);
           

        });
        
    } catch (error) {
        
    }
    


}
