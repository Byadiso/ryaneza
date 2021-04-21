

/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
  // const ordersMsg = document.getElementById('header-text');  
  const userDiv= document.querySelector('.dashboard_user');
  const dashboard_mananger_side = document.querySelector('.dashboard_manage');

 
 let userIdStored = JSON.parse(localStorage.getItem('user'));
 let id = userIdStored.user._id
 let token = userIdStored.token
 console.log(userIdStored);
 console.log(token);
 console.log(id);

  // for fetching user detail
   const  fetchingUser = ( () => {
    fetch( `http://localhost:3000/api/v1/user/${id}/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
      )
    .then((res) => res.json())
    .then(user => renderUser(user)
       )    
 }); 
   
 function renderUser(user){
   console.log(user);
  // let UserContent = user;
  //fro user details 
  let user_container_details = document.createElement('div');
  user_container_details.classList.add('dashboard_user_details');
  const userHeader = document.querySelector('.header-text');
  userHeader.textContent= `Hello, ${user.name}`
  user_container_details.innerHTML = 
   `<p id="phone"><strong>name:</strong> ${user.name}</p>
    <p id="address"><strong>email:</strong>${user.email}</p>
    <p id="owner"><strong>User ID:</strong> ${user._id}</p>`; 
    
     //fro user dashnoard manager property
     let user_container_manager = document.createElement('div');
     user_container_manager.classList.add('dashboard_manage_details');
  
     user_container_manager.innerHTML = 
   `<p id="phone"><strong>name:</strong> ${user.name}</p>
    <p id="address"><strong>email:</strong>${user.email}</p>
    <p id="owner"><strong>User ID:</strong> ${user._id}</p>`; 
     
  userDiv.appendChild(user_container_details);
  // userDiv.appendChild(user_container_manager);
  
   // implementing logOut
   const logOutBtn = document.querySelector('.log-out');
   logOutBtn.addEventListener('click', ()=>{
     console.log('plz I am out')
   localStorage.clear();
   window.location.href = '../pages/login.html';
})

      }
  
fetchingUser();


// -------------------------------------------------------------------------

// for fetching user all created property
const  propertyCreatedByUser = ( () => {
  fetch( `http://localhost:3000/api/v1/properties/${id}/`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }
    )
  .then((res) => res.json())
  .then(data => renderPropertyByUser(data)
     )    
});


function renderPropertyByUser(data){
 let properties = data.properties;
//  console.log(properties)
  for ( var i= 0; i < properties.length; i++ ){ 
    
    const {_id,name} = properties[i];

    let user_container_manager = document.createElement('div');
     user_container_manager.classList.add('dashboard_manager');
     let photoUrl = `http://localhost:3000/api/v1/property/photo/${_id}`
  
     user_container_manager.innerHTML =   
  `<div class="manager"> 
       <img src=${photoUrl} class="imgCreated" style="width: 100px; height: 50px;"> 
       <p id="phone"><strong>Name:</strong> ${name} </p>       
       <button class="btn-modify">update</button>
       <button class="btn-delete">detele</button>
       
       
     
     
    </div>
    <hr>
    `
    console.log(user_container_manager)
    
    dashboard_mananger_side.appendChild(user_container_manager);
    
}
}

propertyCreatedByUser();


});

               