
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
  // const ordersMsg = document.getElementById('header-text');  
  const usersDiv= document.getElementById('userContainer');
 let userIdStored = JSON.parse(localStorage.getItem('user')).userId;
 console.log(userIdStored)

   const  fetchingUser = ( () => {
    fetch( `http://localhost:3000/api/v1/user/${userIdStored}/`)
    .then((res) => res.json())
    .then(user => renderUser(user)
       )    
 });
    
   
 function renderUser(user){
   console.log(user);
  let UserContent = user.User;
  let userCont = document.createElement('div');
  userCont.classList.add('userDetails');
  const userHeader = document.querySelector('.header-text');
  userHeader.textContent= `Hello, ${UserContent.firstname}`
  userCont.innerHTML = 
   `<p id="phone"><strong>name:</strong> ${UserContent.firstname}</p>
    <p id="address"><strong>email:</strong>${UserContent.email}</p>
    <p id="owner"><strong>User ID:</strong> ${UserContent._id}</p>`;  
  
  usersDiv.appendChild(userCont);
  
   // implementing logOut
   const logOutBtn = document.querySelector('.log-out');
   logOutBtn.addEventListener('click', ()=>{
     console.log('plz I am out')
   localStorage.clear();
   window.location.href = '../pages/login.html';
})

      }
  
fetchingUser();
});

               