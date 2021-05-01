
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=> { 

              
    // for accessing only my form to create a property 
    const name = document.querySelector('#name');
    const price = document.querySelector('#price');
    const quantity = document.querySelector('#quantity');
    const description = document.querySelector('#description');
    const shipping = document.querySelector('#shipping');
    const sold = document.querySelector('#sold');
    const category = document.querySelector('.category');
    const photo = document.querySelector('#fileUpload');
    const submitButton = document.querySelector('#create_pro');
    const selectionCategory = document.querySelector('.category');
    const form = document.querySelector('#create_property_form');
    const display_error = document.querySelector('.display_error');
    

    let categoryVar
    let shippingVar
    let photoVar

    let categoriesItem  = JSON.parse(localStorage.getItem('categories'));

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

     //for quantity change event 

     quantity.addEventListener('change',(e)=>{
       quantity.textContent = e.target.value
     })
//for sold thing change 

sold.addEventListener('change',(e)=>{
    sold.textContent = e.target.value
})

     ///get categories

     function getCategories(){
      fetchCategories();

      // let categoriesItem  = JSON.parse(localStorage.getItem('categories'));

      for ( var i= 0; i < categoriesItem.length; i++ ){ 
       
        let { name, _id} = categoriesItem[i];
        console.log(name);
        const optionCategorie = document.createElement('option');
        optionCategorie.innerHTML= `<option class="option_tag login-field" data-id=${_id}>${name}</option>`;

        selectionCategory.appendChild(optionCategorie);
       
        }

        
     }

     getCategories();
     
    

    

//for selection event 
selectionCategory.addEventListener('change',(e)=>{
  const myCategorie = e.target.value;
  // category.textContent= myCategorie; 
  // myCategorie === String ? "_id ": 'name'; 
  let datCategorie = categoriesItem.find(item => item.name === myCategorie);

  // categoryVar = myCategorie
  categoryVar = datCategorie._id;
  console.log(datCategorie._id)

});

//for shipping change event
shipping.addEventListener('change',(e)=>{
  const myShipping = e.target.value;
  // shipping.textContent= myShipping;
  shippingVar = myShipping

})

// for image change event 

// photo.addEventListener('change', (event) => {
//   // const fileList = event.target.files[0];
//   const fileList = URL.createObjectURL(event.target.files[0])
//   photoVar = fileList;
// });

  // --------------------------------------------------------------------------------------
      const user= JSON.parse(localStorage.getItem('user'));
      const id = user.user._id;
      const token = user.token;
    

  submitButton.addEventListener('click',  (e) => {
    e.preventDefault();     
    if (!name.value.trim() ) {
      display_error.textContent = '* Please fill in all fields';        
    } else{

      const formData = new FormData();
      const fileField = document.querySelector('input[type="file"]');

    formData.append('name', name.value);
    formData.append('photo', fileField.files[0]);
    formData.append('price', price.value);
    formData.append('description', description.value);
    formData.append('category', categoryVar);
    formData.append('quantity', quantity.value);
    formData.append('sold', sold.value);
    formData.append('shipping', shippingVar);

      fetch(`http://localhost:3000/api/v1/property/create/${id}`, {
        method: 'POST',
        headers: {
          // 'Content-Type':'text/plain',
          // 'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${token}`
           },
           body: formData
  //       body: JSON.stringify({         
  //           name:name.value,
  //           price:price.value,
  //           description:description.value,
  //           category:categoryVar,
  //           quantity: quantity.value,
  //           photo: photoVar,
  //           sold:sold.value,
  //           shipping: shippingVar              
  // })
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



  
  
  