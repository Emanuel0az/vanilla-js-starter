export {postTareas}
export{deleteTask}



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
    console.log(data)

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









