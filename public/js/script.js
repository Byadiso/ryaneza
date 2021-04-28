      
          
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
                const { _id,photo,name,description,createdAt} = properties[i];        
                 

            

             let photoUrl = `http://localhost:3000/api/v1/property/photo/${_id}`

               // for short  notation is the best
                divprop.innerHTML =`
                <div class="flip-box" data-id= ${_id}>
                  <div class="flip-box-inner">
                     <div class="flip-box-front">
                           <img src=${photoUrl} class="imgCreated" style="width: 270px; height: 170px;">
                           
                      </div>
                      
                      <div class="flip-box-back">
                          <p id="phone"><strong>name:</strong> ${name}</p>
                          <p id="address"><strong>Description:</strong> ${description}</p>
                          <p id="dateCreated;"><strong>Date Create:</strong> ${createdAt.toLocaleString()}</p>
                      </div>
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
      
          })
          
          
          
          
          
          
          
          
          
              
     

 