// elementos.js
import { getTask, deleteTask, updateTask } from './index.js';
import { actuaConunter, revisarTareas } from './form.js';

export async function elementos() {
    let tareas = await getTask(); // Obtiene las tareas desde la API
    let div = document.getElementById('vacioCont');
    let men = document.getElementById("mensajeTarea");

    div.innerHTML = ""; // Limpia el contenedor de tareas antes de meterle algo

    // Restablece el contador a cero antes de contar los checkboxes marcados
    let checkCount = 0;

    if (await getTask() == '') {
        men.style.display = "block"; // Muestra el mensaje si no hay tareas
    } else {
        men.style.display = "none"; // Oculta el mensaje si hay tareas

        // Obtiene el estado de los checkboxes desde localStorage
        let estadoCheck = JSON.parse(localStorage.getItem('estadoCheck')) || {};

        // Itera sobre cada tarea obtenida
        tareas.forEach(tarea => {
            let parrafo = document.createElement('p'); // Crea un elemento de párrafo
            parrafo.innerHTML = tarea.task;
            parrafo.className = 'task-text';

            let task = document.createElement('div'); // Crea un contenedor div para la tarea
            task.className = 'task';
            task.id = tarea.id;

            let checkbox = document.createElement('input'); // Crea un checkbox
            checkbox.type = 'checkbox';
            checkbox.title = "Marcar";
            checkbox.className = 'checkbox';
            checkbox.checked = estadoCheck[tarea.id] || false; // Restaura el estado del checkbox

            // Si el checkbox está marcado al cargar la página, incrementa el contador
            if (checkbox.checked) {
                checkCount++;
            }

            // Evento de cambio para el checkbox
            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    checkCount++; // Incrementa el contador si el checkbox está marcado
                    estadoCheck[tarea.id] = true; // Guarda el estado del checkbox en localStorage
                } else {
                    checkCount = Math.max(0, checkCount - 1); // Decrementa el contador pero evita que baje de 0
                    estadoCheck[tarea.id] = false; // Actualiza el estado del checkbox en localStorage
                }
                localStorage.setItem('estadoCheck', JSON.stringify(estadoCheck)); // Guarda los estados de los checkboxes
                actuaConunter(checkCount); // Actualiza el contador en el DOM
            });

            let deleteIcon = document.createElement('span'); // Crea un icono de papelera para borrar la tarea
            deleteIcon.innerHTML = '♻️';
            deleteIcon.title = "Borrar";
            deleteIcon.className = 'delete-icon';

            // Evento para borrar la tarea
            deleteIcon.addEventListener('click', function () {
                if (checkbox.checked) {
                    checkCount = Math.max(0, checkCount - 1); // Decrementa el contador si estaba marcado
                    delete estadoCheck[tarea.id]; // Elimina el estado del checkbox del localStorage
                    localStorage.setItem('estadoCheck', JSON.stringify(estadoCheck)); // Actualiza los estados de los checkboxes
                    actuaConunter(checkCount); // Actualiza el contador en el DOM
                }
                div.removeChild(task); // Elimina la tarea del DOM
                deleteTask(tarea.id); // Llama a la función para borrar la tarea de la API
                revisarTareas(); // Verifica si hay tareas después de eliminar una
            });

            let editButton = document.createElement('span'); // Crea un botón de edición
            editButton.innerHTML = '✏️'; // Icono de lápiz
            editButton.title = "Editar";
            editButton.className = 'edit-button';

            // Evento para editar la tarea
            editButton.addEventListener('click', function () {
                let editInput = document.createElement('input'); // Crea un input para editar la tarea
                editInput.type = 'text';
                editInput.value = tarea.task;
                editInput.className = 'edit-input';

                let saveButton = document.createElement('button'); // Crea un botón para guardar la edición
                saveButton.innerHTML = 'Guardar';
                saveButton.className = 'save-button';

                // Reemplaza el texto de la tarea con el input y el botón de guardar
                task.replaceChild(editInput, parrafo);// parrafo es una p donde se mete la tarea y task es el contenedor donde va todo ambos son creados 
                task.replaceChild(saveButton, editButton);

                saveButton.addEventListener('click', async function () {
                    if (editInput.value.trim() === '') {
                        alert('Por favor, ingrese una tarea.');
                        return;
                    }

                    await updateTask(tarea.id, { task: editInput.value }); // Llama a la función para actualizar la tarea en la API

                    tarea.task = editInput.value; // Actualiza la tarea localmente
                    parrafo.innerHTML = tarea.task;
                    task.replaceChild(parrafo, editInput);
                    task.replaceChild(editButton, saveButton);
                });
                editInput.addEventListener('keydown', async function (event) {
                    if (event.key === 'Enter') {
                        if (editInput.value.trim() === '') {
                            alert('Por favor, ingrese una tarea.');
                            return;
                        }
            
                        await updateTask(tarea.id, { task: editInput.value }); // Llama a la función para actualizar la tarea en la API
            
                        tarea.task = editInput.value; // Actualiza la tarea localmente
                        parrafo.innerHTML = tarea.task;
                        task.replaceChild(parrafo, editInput);
                        task.replaceChild(editButton, saveButton);
                    }
                });
            });

            // Añade los elementos creados al contenedor de la tarea
            task.appendChild(parrafo);
            task.appendChild(checkbox);
            task.appendChild(editButton);
            task.appendChild(deleteIcon);
            div.appendChild(task);
        });
    }

    actuaConunter(checkCount); // Actualiza el contador al terminar de cargar las tareas
    revisarTareas(); // Verifica si hay tareas después de cargarlas
}

