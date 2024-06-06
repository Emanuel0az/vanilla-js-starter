export{postTareas}
export{deleteTask}
export{getTask}


async function getTask () {
  try {
    let response = await fetch('http://localhost:3000/api/task/');
    if (response.ok) {
      let data = await response.json();
      // console.log(data);
    } else {
      console.error('Error al obtener datos:', response.status);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
}






async function postTareas (tarea) {
  try {
    const response = await fetch("http://localhost:3000/api/task", {
      method: "POST",
      header: {'Content-type':'application/Json'},
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
       
          task: tarea,
          })
            
    });
    const data = await response.json();
    // console.log(data)

    return data
  } catch (error) { //si promesa no se resuelve, https status 400-499 y 500-599
    console.error(error);
  }
}





async function deleteTask (id) {
  try {
    const response = await fetch("http://localhost:3000/api/task/"+id, {
      method: "DELETE",   

    });
       
    
  } catch (error) { //si promesa no se resuelve, https status 400-499 y 500-599
    console.error(error);
  }
}









