
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=> { 
  
    let urlPro = 'http://localhost:3000/api/v1/property';
              
    // for accessing only my form to create a property 
    const owner = document.querySelector('#owner');
    const price = document.querySelector('#price');
    const state = document.querySelector('#state');
    const city = document.querySelector('#city');
    const phone = document.querySelector('#phone');
    const adress = document.querySelector('#address');
    const image = document.querySelector('#fileUpload');
    const button = document.querySelector('#create_pro');
  
    
    button.addEventListener('click', (e) => { 
      // e.preventDefault();
        fetch(`${urlPro}`, {
         method: 'POST',
         headers:{
           'Content-Type':'application/json'
          },
         body: JSON.stringify({         
           owner:owner.value,
           price:price.value,
           state:state.value,
           city:city.value,
           adress:adress.value,
           phone: phone.value,
           image:image.file,
           dateCreated: Date.now()
         })
       })
       .then(response =>response.json())
       .then(createdProperty =>{
        let storedData = localStorage.setItem('properties', JSON.stringify(createdProperty))
        window.location.href = '../pages/property.html'
       })
       .catch(err =>console.log(err));
      })
    })
  
  
  