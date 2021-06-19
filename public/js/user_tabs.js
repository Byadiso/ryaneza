


/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
    // const ordersMsg = document.getElementById('header-text');  
    const allMyProperty= document.querySelector('.manager_property');
    const admin= document.querySelector('.admin_details');
    const allUser = document.querySelector('.all_user');
    const purchaseHistory = document.querySelector('.manager_purchase_history');
    
    let userIdStored = JSON.parse(localStorage.getItem('user'));
    let id = userIdStored.user._id
    let token = userIdStored.token
    

    const for_admin_only = document.querySelector('.for_admin_only');  

    //For history purchase for admin or seller purpose he has to get all purchase products

    const purchase_history_button = document.querySelector('#purchase_history_button');
    let user = userIdStored.user
  
    let isAdmin;  
    let url;

   //check if is admin   
    isAdmin = user.role && user.role ==1  

    //show button according to the user viewing them 
    isAdmin ? purchase_history_button.textContent= "All purchase history" : purchase_history_button.textContent="My purchase history"
    
  
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
    `<div class="manager" data-id=${_id}> 
         <img src=${photoUrl} class="imgCreated" style="width: 100px; height: 50px;"> 
         <p id="phone"><strong>Name:</strong> ${name} </p>          
         <button class="btn-modify">update</button>  
         <button class="btn-delete">delete</button>    
        
      </div>     
      `

      allMyProperty.appendChild(user_container_manager);


      // // accesing button for delete and update
      const delBtns =document.querySelectorAll('.btn-delete') ;
      const updateBtns =document.querySelectorAll('.btn-modify') 
 

      // .........................................................for updating property..........................
   
      delBtns.forEach(btn => {
        btn.addEventListener('click',(e)=>{
          let propId = e.target.parentElement.dataset.id;
          console.log('soon i am going to delete you friend ' + propId);

          // checking for deletion later

          // alert('do you want do delete this property?')

                             
           return fetch( `http://localhost:3000/api/v1/property/${propId}/${id}`, {
              method: 'DELETE',
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
             }
            }).then((res)=>res.json()).then(data => {              
              if(data.status== true){
                // show a successful message to the user by creating a div 
                // after put a button to go to market or shop or rental space
                location.reload();
                // propertyCreatedByUser();

              } else {
                console.log(data.error);
              }
              
            });    
        })        
      });
      

      // .........................................................for updating property..........................
      updateBtns.forEach(btn => {
        btn.addEventListener('click',(e)=>{
          let propId = e.target.parentElement.dataset.id;
          console.log('soon i am going to udpate you friend ' + propId);

          let data_to_be_updated = {
            prop_id: propId,
            user_id: id,
            token : token
          }
          localStorage.setItem('id_to_update', JSON.stringify(data_to_be_updated));

          let stored = JSON.parse(localStorage.getItem('id_to_update'));         
       
             stored ? location.href='../pages/updated.html' : console.log('no stored id to update');   

        })        
      });
      



             };

  

  }
  
  propertyCreatedByUser();



//   ............................................................................................

// fetching all users

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
      
      let {_id,name,role,createdAt } = users[i];
  
      let user_container_manager = document.createElement('div');
       user_container_manager.classList.add('dashboard_manager');
       var timestamp= timeDifference(new Date(), new Date(createdAt));
    //    let photoUrl = `http://localhost:3000/api/v1/user/photo/${_id}`
    
       user_container_manager.innerHTML = 
         
    `    
    <div data-id="${_id}">
         <p id="name"><strong>Name:</strong> ${name + " "} </p>
         <p id="role"><strong>${" "} Role:</strong> ${role == 1 ? role ="Admin" : role ="Normal"}</p>            
        <p id="time_joined"><strong>Joined:</strong> ${timestamp}</p> 
    </div>
        
      `
      
      
      allUser.appendChild(user_container_manager);
      
             }
  }
  
  fetchAllUsers();


  
//   .....................................show user purchase history.......................................................

// show user purchase history

const  fetchAllUsersPurchaseHistory = ( () => {
  let userId= id;
  
  // fetch all order  if regular user show purchase history

  if(isAdmin){
    url =`http://localhost:3000/api/order/list/${userId}`;
   } else {
    url= `http://localhost:3000/api/v1/orders/by/user/${userId}`;
  }
  

  fetch(url ,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }
    )
  .then((res) => res.json())
  .then(data => renderUsersPurchaseHistory(data)
     )    
});

function renderUsersPurchaseHistory(data){
  if (data == null) return purchaseHistory.innerHTML = `<div> <h2>Nothing to show</h2></div>` ;
  
  const headerUser =document.querySelector('.purchase_history_header');
  headerUser.textContent = data.length;
 
   for ( var i= 0; i < data.length; i++ ){ 

   
     
     let {_id,address,amount,products,status,transaction_id,user,createdAt} = data[i];
 
     let user_container_purchase_history = document.createElement('div');
     user_container_purchase_history.classList.add('manager_purchase_history_item');
      var timestamp= timeDifference(new Date(), new Date(createdAt));
  

   
  
   user_container_purchase_history.innerHTML =         
   `    
   <div>
        <h3 id="order_title">Order ${_id} </h3>
        <p id="amount"><strong>Paid amount:</strong> ${amount} RWF </p>
        <p id="name"><strong>Client name:</strong> ${user.name + " "} </p>
        <p id="products"><strong>Items:</strong> ${products.length}</p>
        <p id="products"><strong>Product bought:</strong> ${listProducts(products)}</p>
        
        <p id="address"><strong>Deliverying address:</strong> ${address} </p>
        <p id="status"><strong>status:</strong> ${status} </p>
        <p id="transaction_id"><strong>transaction id:</strong> ${transaction_id} </p>
                   
       <p id="time_joined"><strong>Purchased:</strong> ${timestamp}</p> 
   </div>     
     `
  
  
     purchaseHistory.appendChild(user_container_purchase_history);

         
     }
 }

// return function products ater fetching them 
function listProducts(products){
  let prodList=[] ;
  
  products.forEach(product =>prodList.push(product.name )) ;
  
  return prodList
}



 fetchAllUsersPurchaseHistory();



//   .....................................changing time.......................................................



  function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
        if(elapsed/1000 <30) return "Just now";
        return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
      }
  }  
  });

  
                 