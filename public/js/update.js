
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=> { 
  
  let urlPro = 'http://localhost:3000/api/v1/property';
            
  // for accessing only my form to be updated 
  const owner = document.querySelector('#owner');
  const price = document.querySelector('#price');
  const state = document.querySelector('#state');
  const city = document.querySelector('#city');
  const phone = document.querySelector('#phone');
  const adress = document.querySelector('#address');
  const url = document.querySelector('#url');
  const submitBtn = document.querySelector('#submitUpdates');


  // for storage purpose 
  let proId = localStorage.getItem('id');
  let propertiesItem = {...JSON.parse(localStorage.getItem('properties'))};

  // console.log(properties);  
  // console.log(proId);
  let pro =[];
  pro = [...pro, propertiesItem];  
  let Mypro = pro.find(item => ()=>{
     item.Property.id[0]=== proId }
  )

  let newPro = Mypro.Property 
  console.log(newPro);
  let findedOne = newPro.find(item=> item._id === proId);
    
  // setting values 
  owner.value = findedOne.owner;  
  price.value = findedOne.price;
  state.value = findedOne.state;
  city.value = findedOne.city;
  phone.value = findedOne.phone;
  adress.value = findedOne.address;
  url.value = findedOne.url;  
  
  submitBtn.addEventListener('click', (e) => { 
    e.preventDefault();
      fetch(`${urlPro}/${proId}`, {
       method: 'PUT',
       headers:{
         'Content-Type':'application/json'
        },
       body: JSON.stringify({
         _id: proId,
         owner:owner.value,
         price:price.value,
         state:state.value,
         city:city.value,
         phone: phone.value,
         url:url.value,
         dateCreated: Date.now()
       })
     })
     .then(response =>response.json())
     .then(dataUpdated =>{
      let storedData = localStorage.setItem('properties', JSON.stringify(dataUpdated))
      window.location.href = '../pages/property.html'
     })
     .catch(err =>console.log(err));
    })
  })


