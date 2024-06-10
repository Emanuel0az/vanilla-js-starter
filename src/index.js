export { getTask, postTareas, deleteTask, updateTask };

async function getTask() {
    try {
        let response = await fetch('http://localhost:3000/api/task/');
        if (response.ok) {
            let data = await response.json();
            return data; // Retorna los datos de las tareas obtenidas
        } else {
            console.error('Error al obtener datos:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

async function postTareas(tarea) {
    try {
        const response = await fetch("http://localhost:3000/api/task", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Indica que los datos se envían en formato JSON
            },
            body: JSON.stringify({
                task: tarea, // La tarea que se va a agregar
            })
        });
        const data = await response.json(); // Obtiene la respuesta de la API en formato JSON
        return data; // Retorna los datos de la tarea agregada
    } catch (error) {
        console.error(error);
    }
}

async function deleteTask(id) {
    try {
        await fetch("http://localhost:3000/api/task/" + id, {
            method: "DELETE", // Especifica el método DELETE
        });
    } catch (error) {
        console.error(error);
    }
}

async function updateTask(id, updatedTask) {
    try {
        const response = await fetch(`http://localhost:3000/api/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error al actualizar la tarea:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}
