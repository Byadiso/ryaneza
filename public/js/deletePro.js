

/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
    // const ordersMsg = document.getElementById('header-text');  
    const allMyProperty= document.querySelector('.manager_property');
    const admin= document.querySelector('.admin_details');
    const allUser = document.querySelector('.all_user');
    const for_admin_only = document.querySelector('.for_admin_only');
    const deleteBtns = document.querySelectorAll('.btn-delete');
    const dashboard_manager =document.querySelectorAll('.dashboard_manager');
    
    
  
   
   let userIdStored = JSON.parse(localStorage.getItem('user'));
   let id = userIdStored.user._id
   let token = userIdStored.token
   console.log(userIdStored);
   console.log(token);
   console.log(id);
  
   
     
       
    
  
  
//   ...........................................................................................


// for (var i =0 ; i< deleteBns.length ; i++){
//     deleteBns[i].addEventListener('click', (e)=>{
//         // const prodToDelete= e.target
//         // console.log(prodToDelete);
//         console.log('yes i can delete something')
 
//      })
// }

deleteBtns.forEach(btn => {
    btn.addEventListener('click', (e)=>{
                const prodToDelete= e.target
                console.log(prodToDelete);
                console.log('yes i can delete something')
         
             })
})
dashboard_manager.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        console.log( e.target.parentElement.dataset.id)
    })
})
    

    
    


 const deleteProduct = (prodId) => {
    return fetch(`http://localhost:3000/api/v1/property/${prodId}/${_id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
        };
  
  });
  
                 