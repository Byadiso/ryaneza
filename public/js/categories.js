
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=> { 

              
    // for accessing only my form to create a property 
    const namecategory = document.querySelector('#name');    
    const submitButton = document.querySelector('.submitBtn');
    const form = document.querySelector('#create_category_form');
    const display_error = document.querySelector('.display_error_category');   
    const success_message = document.querySelector('.success_message');
    const categories_container = document.querySelector('.all_categories');










    
 // --------------------------------------------------------------------------------------
      const user= JSON.parse(localStorage.getItem('user'));
      const id = user.user._id;
      const token = user.token; 


 // ------------------------FETCH MY CATEGORIES--------------------------------------------------------------


//  const categories= JSON.parse(localStorage.getItem('categories'));
//  console.log(categories)


    // fetching of categories 
    function getAllCategories(){
      return  fetch(`http://localhost:3000/api/v1/categories`, {
        method: 'GET',
        headers:{
          'Content-Type':'application/json'
               }

  })
.then(response =>response.json())
.then(categories =>{ 
 let storedCategories = localStorage.setItem('categories', JSON.stringify(categories));
 renderAllCategories(categories);

})
.catch(err =>console.log(err));
    }
    
    getAllCategories();


    // ..............................render all catgories............................

function renderAllCategories (cat){

  for (var i = 0; i <cat.length ; i++){
    const {name, _id} = cat[i]

    const category = document.createElement('div');
    category.classList.add('category_item');    
    category.innerHTML= `
    <h3 data-id=${_id}>${name}</h3>
    <button class="btn-delete">delete</button>
    
   
    `;

    categories_container.append(category);
  }
 
}

    








 
 // ------------------------------CREATE CATEGORY--------------------------------------------------------

    submitButton.addEventListener('click',  (e) => {
    e.preventDefault();     
    if (!namecategory.value.trim()) {
      display_error.textContent = '* Please fill the name of category';        
    } else{
      
      let name = namecategory.value
       return fetch(`http://localhost:3000/api/v1/category/create/${id}`, {
        method: 'POST',
        headers: { 
          Accept: 'application/json',         
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
           },
        body: JSON.stringify({ name }) 
})
.then(response => {
    return  response.json()
})
.then(data => {
  // console.log(data)
  if(data.status == true){
    console.log(data.message);
     let storedData = localStorage.setItem('categorycreated', JSON.stringify(data));  
     success_message.innerHTML = `<h3>Your category has been successfully created</h3>`
     getAllCategories();
    
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


  
  
  