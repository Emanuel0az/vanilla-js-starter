

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
       
        }catch{}
        }
      
       
   
      
      // tareas();


      export {postTareas}





