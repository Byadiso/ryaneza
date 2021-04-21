

/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
  // const ordersMsg = document.getElementById('header-text');  
  const usersDiv= document.getElementById('userContainer');
 let userIdStored = JSON.parse(localStorage.getItem('user'));
 let id = userIdStored.user._id
 let token = userIdStored.token
 console.log(userIdStored);
 console.log(token);
 console.log(id);

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
  let userCont = document.createElement('div');
  userCont.classList.add('userDetails');
  const userHeader = document.querySelector('.header-text');
  userHeader.textContent= `Hello, ${user.name}`
  userCont.innerHTML = 
   `<p id="phone"><strong>name:</strong> ${user.name}</p>
    <p id="address"><strong>email:</strong>${user.email}</p>
    <p id="owner"><strong>User ID:</strong> ${user._id}</p>`;  
  
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

               