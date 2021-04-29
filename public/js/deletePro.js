

/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
    // const ordersMsg = document.getElementById('header-text');  
    const allMyProperty= document.querySelector('.manager_property');
    const admin= document.querySelector('.admin_details');  
    const button = document.querySelectorAll('button');    
    const deleteBtns = document.querySelectorAll('.btn-delete');
    
    let numberDel = 0
    console.log(numberDel)
    
  
   
   let userIdStored = JSON.parse(localStorage.getItem('user'));
   let id = userIdStored.user._id
   let token = userIdStored.token

     
     
  
//   ...........................................................................................

if(button.classList =='btn-delete'){
    button.addEventListener('click', (e)=>{
        console.log('this is a delte button')
    })
}


if(button.classList =='btn-modify'){
    button.addEventListener('click', (e)=>{
        console.log('this is a update button')
    })
}


         deleteBtns.forEach(Btn => {
                  Btn.addEventListener('click',deleteMyPro())  
                });

                function deleteMyPro(){
                 console.log('yes ')  
                }


//  const deleteProduct = (prodId) => {
//     return fetch(`http://localhost:3000/api/v1/property/${prodId}/${_id}`, {
//         method: 'DELETE',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         }
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
//         };
  
  });
  
                 