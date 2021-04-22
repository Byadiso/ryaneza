
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=> { 

              
    // for accessing only my form to create a property 
    const owner = document.querySelector('#owner');
    const price = document.querySelector('#price');
    const state = document.querySelector('#state');
    const city = document.querySelector('#city');
    const phone = document.querySelector('#phone');
    const adress = document.querySelector('#address');
    const category = document.querySelector('.category');
    const image = document.querySelector('#fileUpload');
    const button = document.querySelector('#create_pro');
    const selectionCategory = document.querySelector('.category');


    // ...................................................................................


    // fetching of categories 
    function fetchCategories(){
      return  fetch(`http://localhost:3000/api/v1/categories`, {
               method: 'GET',
               headers:{
                 'Content-Type':'application/json'
                      }
  
         })
       .then(response =>response.json())
       .then(categories =>{ 
        let storedCategories = localStorage.setItem('categories', JSON.stringify(categories))
     
       })
       .catch(err =>console.log(err));
     };

     

     ///get categories

     function getCategories(){

      fetchCategories();

      let categoriesItem  = JSON.parse(localStorage.getItem('categories'));

      for ( var i= 0; i < categoriesItem.length; i++ ){ 
        console.log(categoriesItem[i].name)
        const optionCategorie = document.createElement('option');
        optionCategorie.innerHTML= `<option data-id=${categoriesItem[i]._id}>${categoriesItem[i].name}</option>`;

        selectionCategory.appendChild(optionCategorie);
        }

        
     }

     getCategories();
     
    

     const id= selectionCategory.getAttribute('data-id');
     console.log(id)



  // --------------------------------------------------------------------------------------
    
    button.addEventListener('click', (e) => { 
      e.preventDefault();
      function postProperty(){
       return  fetch(`http://localhost:3000/api/v1/property/create/${id}`, {
                method: 'POST',
                headers:{
                  'Content-Type':'application/json'
                       },
                body: JSON.stringify({         
                    name:name.value,
                    price:price.value,
                    description:description.value,
                    category:category.value,
                    quantity: quantity.value,
                    photo:photo.file,
                    sold:sold.file,
              
          })
        })
        .then(response =>response.json())
        .then(createdProperty =>{
          if(createdProperty.status == true){
             let storedData = localStorage.setItem('properties', JSON.stringify(createdProperty))
             window.location.href = '../pages/property.html'
          } 
          if(createdProperty.status == false){
            console.log(createdProperty.error)
          }         
        })
        .catch(err =>console.log(err));
        }
      
      postProperty();

    })       
});



  
  
  