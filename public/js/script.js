      
          
document.addEventListener('DOMContentLoaded', () => {     
          
          const ordersMsg = document.getElementById('header-text');  
          const mainDiv = document.getElementById('myProperties'); 
          const searchBar = document.getElementById('searchBar'); 
          let properties = [] ;                   
          
         
          //function to fetch all dat from backend

          const listAll = () => {
           return  fetch('http://localhost:3000/api/v1/properties')
            .then((resp) =>resp.json())
            .then((data) =>  {
            renderProperty(data);
            localStorage.setItem('properties', JSON.stringify(data));
          });
            
          }

          // function to render my property
          function  renderProperty(dataPro) {          
              console.log(dataPro);             

               ordersMsg.className = 'err';
              ordersMsg.innerHTML = dataPro.message;
                properties= dataPro.properties;                  
              for ( var i= 0; i < properties.length; i++ ){            
                let  divprop= document.createElement("DIV"); 
                const { _id,price,name,description,createdAt} = properties[i];        
                 

            

             let photoUrl = `http://localhost:3000/api/v1/property/photo/${_id}`

               // for short  notation is the best
               var timestamp= timeDifference(new Date(), new Date(createdAt));
                divprop.innerHTML =`
                <div class="main_container_fruits" data-id="${_id}">
                    <div  class="image_fruit">                     
                            <img src=${photoUrl} class="imgCreated" style="width: 270px; height: 170px;">        
                    </div>  
                    <div class="details_fruits">
                      <p class="name_fruit">${name}</p>
                      <p class="price_fruit">${price} FRW</p>                  
                    </div>
                  <button class="btn-view">View</button>
                </div>`
                
                


          // adding a class to my divprop 
        divprop.setAttribute("class",'column-grid-Property')

          // to append my whole create section    
          mainDiv.append(divprop);   
               
              }   
              
                   
         const viewBtns = document.querySelectorAll('.btn-view');
         viewBtns.forEach(Btn => {
                  Btn.addEventListener('click', (e)=>{
                    // Storage()
                    let propId = e.target.parentElement.dataset.id;
                    localStorage.setItem('id', propId)
                    console.log(propId);
                    location.href='../pages/singleProperty.html';
                  })
  
                });
              }            
                   
              
              // implementing logOut
                const logOutBtn = document.querySelector('.log-out');
                  logOutBtn.addEventListener('click', ()=>{
                    console.log('plz I am out')
                  localStorage.clear();
                  window.location.href = '../pages/login.html';
              })
              
               listAll();

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


      
          })
          
          
          
          
          
          
          
          
          
              
     

 