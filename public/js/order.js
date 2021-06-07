         
// function displayOrder(){
//         if (typeof window !== 'undefined') {
//             if (localStorage.getItem('cart')) {                  
//                 let order = [...JSON.parse(localStorage.getItem('order')) ];  
//                 if(order.length == 0){
//                     checkoutDisplay.innerHTML= "Ops Nothing to show !!"
//                     console.log("Ops Nothing to show !!");
//                     }
//                 for ( var i= 0; i < order.length; i++ ) {            
//                     let orderDisplay = document.createElement('DIV');
//                     orderDisplay.classList.add("items_to_order");                 
//                     let {_id, name, price, count, datecreated } = order[i];                                   
                    
//                     orderDisplay.innerHTML= `
//                             <div class="product_in_cart_container" data-id="${_id}">
//                                 <div class="product_in_cart_image">
//                                     <span>${name}</span>
//                                 </div>
//                                 <div class="product_in_cart_name">
//                                     <span>${count}</span>
//                                 </div>
//                                 <div class="product_in_cart_price">
//                                     <span>${price}</span>
//                                 </div> 
//                                 <div class="product_in_cart_price">
//                                     <span>${datecreated}</span>
//                                 </div>                                                         
//                             </div>
//                         `
//                     checkoutDisplay.appendChild(orderDisplay);                                    
//                 }                        
                                              
//             getTotalPrice(cartStored);              
                 
//                }
//         };       
//     }

// payBtn.addEventListener("click",()=>{
//         console.log("yes pay your bill")
//     })
    
//      //for total price frommthe local storage
// function getTotalPrice(order){       
//         let tempTotal = 0 ;
//         let itemsTotal = 0;
//         order.map(item => {
//             console.item
//             tempTotal += parseInt(item.price * item.count) ;
//             itemsTotal += parseInt(item.count);           
//         });        
//         totalDisplay.textContent = parseFloat(tempTotal.toFixed(2))
//         return tempTotal
//      }
//     displayOrder();