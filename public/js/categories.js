
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=> { 

              
    // for accessing only my form to create a property 
    const name = document.querySelector('#name');    
    const submitButton = document.querySelector('#create_pro');
    const form = document.querySelector('#create_property_form');
    const display_error = document.querySelector('.display_error');   

    // ...................................................................................

    

    
 // --------------------------------------------------------------------------------------
      const user= JSON.parse(localStorage.getItem('user'));
      const id = user.user._id;
      const token = user.token;
    

  submitButton.addEventListener('click',  (e) => {
    e.preventDefault();     
    if (!name.value.trim() ) {
      display_error.textContent = '* Please fill in all fields';        
    } else{

      fetch(`http://localhost:3000/api/v1/property/create/${id}`, {
        method: 'POST',
        headers: {          
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${token}`
           },
           body: formData
  
})
.then(response => {
    return  response.json()
})
.then(data => {
  // console.log(data)
  if(data.status == true){
     let storedData = localStorage.setItem('property', JSON.stringify(data))  
     window.location.href = '../pages/property.html'
  } 
  if(data.status == false){
    console.log(data.error)
  }         
})
.catch((err) =>{
  console.log(err)
});
    }
      
      })          
    
});


  
  
  