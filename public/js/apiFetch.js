
  export const listAll = () =>{
    return fetch('http://localhost:3000/api/v1/property')
      .then((resp) => { resp.json() })
      .catch((err) => console.log(err))
  }

  export const listSingle = (proId)=>{           
    fetch( `http://localhost:3000/api/v1/property/${proId}`, {
      method: 'GET', 
    }).then((res) =>{
      console.log(res);
      res.json()
    })
    .catch(err => console.log(err));
  }


    // fetch delete function
     export   const deletePro = (id)=> {                         
          fetch( `http://localhost:3000/api/v1/property/${id}`, {
            method: 'DELETE',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // Authorization: `Bearer `
           }
          }).then((resp )=> resp.json())
          .catch(err => console.log(err)); 
       
        }

       // for modfying action

        export const updatePro =(proId, property) => {
          fetch( `http://localhost:3000/api/v1/property/${proId}`, {
            method: 'PUT',
            body: JSON.stringify({ property
            })
          }).then(response => {response.json()})
          .catch(err =>console.log(err))
        };
       
      
           
         
   