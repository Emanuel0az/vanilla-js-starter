// Importa las funciones que quieres probar
import { getTask, postTareas, deleteTask, updateTask } from './index.js';

// Mock de la función fetch para simular llamadas a la API
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}) // Puedes ajustar esto según la respuesta esperada
    })
);

describe('Pruebas para las funciones de la API', () => {
    test('getTask debería hacer una solicitud GET a la API', async () => {
        await getTask();
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/task/');
    });

    test('postTareas debería hacer una solicitud POST a la API', async () => {
        const tarea = { task: 'Nueva tarea' };
        await postTareas(tarea);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarea)
        });
    });

    test('deleteTask debería hacer una solicitud DELETE a la API', async () => {
        const id = 1; // Id de la tarea a borrar
        await deleteTask(id);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/api/task/${id}`, {
            method: 'DELETE'
        });
    });

    test('updateTask debería hacer una solicitud PUT a la API', async () => {
        const id = 1; // Id de la tarea a actualizar
        const updatedTask = { task: 'Tarea actualizada' };
        await updateTask(id, updatedTask);
        expect(fetch).toHaveBeenCalledWith(`http://localhost:3000/api/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });
    });
});
