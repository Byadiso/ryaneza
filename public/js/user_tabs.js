

/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
    // const ordersMsg = document.getElementById('header-text');  
    const allMyProperty= document.querySelector('.manager_property');
    const admin= document.querySelector('.admin_details');
    const allUser = document.querySelector('.all_user');
    const for_admin_only = document.querySelector('.for_admin_only');


    
    
  
   
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

    //fro user details 
   const userHeader = document.querySelector('.all_admin_header');
   userHeader.textContent = ` ${user.role == 1 ? "Admin " + user.name : "User " + user.name}`; 

   //creating property here is for admin only so this menu for creating property will have hide class

  user.role == 0 ? for_admin_only.textContent ='You are not admin to post' : for_admin_only.textContent ='Plz admin you can post';
  // for_admin_only.textContent = 'yese'

   const userContainer = document.createElement('div');
   

   userContainer.innerHTML = 
     `<p id="phone"><strong>name:</strong> ${user.name}</p>
      <p id="address"><strong>email:</strong>${user.email}</p>
      <p id="owner"><strong>User ID:</strong> ${user._id}</p>
      <p id="accountType"><strong>Acount Type: </strong> ${user.role == 1 ? user.role =" Admin" : user.role =" Normal" }</p>
   `; 


admin.append(userContainer);
      
       //fro user dashnoard manager property
       
    
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
   const propertiesHeader =document.querySelector('.all_property_header');
   propertiesHeader.textContent = properties.length;
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
     
      `
      console.log(user_container_manager)
      
      allMyProperty.appendChild(user_container_manager);
      
             }
  }
  
  propertyCreatedByUser();

//   ............................................................................................

// fethcing all users

const  fetchAllUsers = ( () => {
    fetch( `http://localhost:3000/api/v1/users/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
      )
    .then((res) => res.json())
    .then(data => renderUsers(data)
       )    
  });
  
  
  function renderUsers(data){
   let users = data.users;
   const headerUser =document.querySelector('.all_user_header');
   headerUser.textContent = users.length;
  //  console.log(properties)
    for ( var i= 0; i < users.length; i++ ){ 
      
      let {_id,name,role,createdAt, following, followers} = users[i];
  
      let user_container_manager = document.createElement('div');
       user_container_manager.classList.add('dashboard_manager');
    //    let photoUrl = `http://localhost:3000/api/v1/user/photo/${_id}`
    
       user_container_manager.innerHTML = 
         
    `    
    <div>
         <p id="name"><strong>Name:</strong> ${name + " "} </p>
         <p id="role"><strong>${" "} Role:</strong> ${role == 1 ? role ="Admin" : role ="Normal"}</p>            
         <p id="time_joined"><strong>Followers:</strong> ${followers.length}</p>
         <p id="time_joined"><strong>Following:</strong> ${following.length}</p> 
         <p id="time_joined"><strong>Joined:</strong> ${createdAt}</p> 
    </div>
        
      `
      console.log(user_container_manager)
      
      allUser.appendChild(user_container_manager);
      
             }
  }
  
  fetchAllUsers();


  
  });
  
                 