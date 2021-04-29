
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=> { 
  
  let urlPro = 'http://localhost:3000/api/v1/property/';
            
  // for accessing only my form to be updated 
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


  // for storage purpose 
  let property_to_update = JSON.parse(localStorage.getItem('id_to_update'));
  let properties = JSON.parse(localStorage.getItem('properties'));
  let data = properties.properties;
  
// console.log(property_to_update.user_id);
  const { prop_id,user_id,token } = property_to_update
  console.log(prop_id);
  console.log(user_id);
  console.log(token);

  // console.log(data)

  let proData = data.find(item => item._id == prop_id);
  console.log(proData);

  
///get categories

function getCategories(){

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

  // setting values 
  name.value = proData.name;  
  price.value = proData.price;
  description.value = proData.description;
  quantity.value = proData.quantity;
  sold.value = proData.sold;
  
  
  

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
      fetch(`http://localhost:3000/api/v1/property/${prop_id}/${user_id}`, {
        method: 'PUT',
        headers: {
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
    //  let storedData = localStorage.setItem('property', JSON.stringify(data))  
     hideForm(data.message);
  } 
  if(data.status == false){
    console.log(data.error)
  }         
})
.catch((err) =>{
  console.log(err)
});

  };

  });


  function hideForm(message){
    const sub_main = document.querySelector('.login-screen');
    const main = document.querySelector('.login');
    sub_main.classList.add('hide');
    console.log(message);
    const successfulMessage = document.createElement('div');
    successfulMessage.classList.add('successful_message');
    successfulMessage.innerHTML= `
    <p>${message}</p>
    `

    main.append(successfulMessage);

  }

})


