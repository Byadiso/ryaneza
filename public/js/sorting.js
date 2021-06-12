
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 

    const Sell_and_arrival = document.getElementById('sell_and_arrival'); 
    const for_sell = document.getElementById('property_by_sell');
    const for_arrival = document.getElementById('property_by_arrival');
   
function fetchProperty (sortBy){
    return fetch( `http://localhost:3000/api/v1/properties?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",    
       }
      }).then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });     
}


// fetch proeprty BY Sell 
fetchProperty('sold').then((data)=>{
    if(data.error){
        console.log(data.error)
    } else{
        renderPropertyBySell(data)
    }
});

function renderPropertyBySell(data){
    console.log('Property by Sell');
    let headerSell = document.querySelector('.header_sell');
    headerSell.textContent="POPULAR CHOICE";
   
   


    

    console.log(data);
    let proSell = data.properties;


    for ( var i= 0; i < proSell.length; i++ ){            
        
        let content_by_sell= document.createElement("DIV");
        content_by_sell.classList.add('property_by_sell_content');
   
        

        const { _id,price,name,description,createdAt} = proSell[i];       
        let photoUrl = `http://localhost:3000/api/v1/property/photo/${_id}` 

        content_by_sell.innerHTML = 
       
         `<div class="image_fruit">
                 <img src=http://localhost:3000/api/v1/property/photo/${_id} class="imgCreated" style="width: 100px; height: 50px;">
         </div>
            
            <p class="name_fruit"><strong> ${name} </strong></p> 
            <p class="price_fruit"><strong> ${price} Frw</strong></p>       
        
         `

        //  content_by_sell.append(headerSell);
        //  content_by_sell.append(headerSell_sub);

          for_sell.append(content_by_sell); 
    }      
}
    
//  ..........................................................................................    

// fetch proeprty BY Arrival 
fetchProperty('createdAt').then((data)=>{
    if(data.error){
        console.log(data.error)
    } else{
        renderPropertyByArrival(data)
    }
});

function renderPropertyByArrival(data){
    let headerArrival = document.querySelector('.header_arrival');
    headerArrival.textContent="RECENTLY ADDED";
   
    
    console.log('Property by Arrival')

    console.log(data)

   

    let proArrival = data.properties;

    for ( var i= 0; i < proArrival.length; i++ ){            
        

        let content_by_arrival= document.createElement("DIV");
        content_by_arrival.classList.add('property_by_arrival_content');
    
        

        const { _id,price,name,description,createdAt} = proArrival[i];       
        let photoUrl = `http://localhost:3000/api/v1/property/photo/${_id}` 

        content_by_arrival.innerHTML = 
         `
         <div  class="image_fruit">
            <img src=http://localhost:3000/api/v1/property/photo/${_id} class="imgCreated" style="width: 100px; height: 50px;">
            
         </div>
            
            <p class="name_fruit"><strong> ${name} </strong></p> 
            <p class="price_fruit"><strong> ${price} Frw</strong></p>          
         
         `

        //  content_by_arrival.append(headerArrival);
        //  content_by_arrival.append(headerArrival_sub); 
 
           for_arrival.append(content_by_arrival);
          
        }  
        
    
  }
  
})
  
  
  