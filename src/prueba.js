export{elementos}

async function elementos() {
    let checkCount = localStorage.getItem('taskCount') ? parseInt(localStorage.getItem('taskCount')) : 0;
    let contador = document.getElementById('contador');
    contador.innerText =  checkCount;

    function updateCounter() {
        contador.innerText = checkCount;
        localStorage.setItem('taskCount', checkCount);
    }

    try {
        let tareas = await getTask();
        tareas.forEach(async (tarea) => {
            let parrafo = document.createElement('p');
            parrafo.innerHTML = tarea.task;
            console.log(tarea, "tarea1");

            let task = document.createElement('div');
            task.className = 'task';
            task.id = tarea.id;

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.title = "Marcar";
            checkbox.className = 'checkbox';
            console.log(tarea, "tarea2");

            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    checkCount++;
                } else {
                    checkCount = Math.max(0, checkCount - 1); // Evitar que baje de 0
                }
                updateCounter();
            });

            let deleteIcon = document.createElement('span');
            deleteIcon.innerHTML = '♻️'; // Icono de papelera
            deleteIcon.title = "Borrar";
            deleteIcon.className = 'delete-icon';

            deleteIcon.addEventListener('click', function () { // evento de click para borrar el div
                if (checkbox.checked) {
                    checkCount = Math.max(0, checkCount - 1); // Decrementa el contador si estaba marcado
                    updateCounter();
                }
                div.removeChild(task);
                deleteTask(task.id); // se llama la función de borrar datos de la API
                console.log(tarea, "tarea3");
            });

            task.appendChild(parrafo);
            div.appendChild(task);
            task.appendChild(checkbox);
            task.appendChild(deleteIcon);
        });
    } catch (error) {
        console.error(error);
    }
}

