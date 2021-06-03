/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', () => {
   
    let totalDisplay = document.querySelector('.cart-total');  
    let cartContainer = document.querySelector('.cart-content');     
          
    function displayCart(){
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {     
                
                let cartStored = [...JSON.parse(localStorage.getItem('cart')) ];
                let elements = document.createElement('DIV');
                for ( var i= 0; i < cartStored.length; i++ ){                    
                    let {_id, name, price, count } = cartStored[i];
                    console.log(cartStored[i])
                    
                    let photoUrl = `http://localhost:3000/api/v1/property/photo/${_id}` ;
                    
                    elements.innerHTML= `
                            <div class="product_in_cart_container" data-id="${_id}">
                                <div class="product_in_cart_image">
                                    <img src=${photoUrl} class="imgCreated" style="width: 50px; height: 50px;">
                                </div>
                                <div class="product_in_cart_name">
                                    <span>${name}</span>
                                </div>
                                <div class="product_in_cart_price">
                                    <span>${price}</span>
                                </div>                            
                            </div>
                        `
                    cartContainer.appendChild(elements);    
                    calculatePrice(price,count);
                }
              
            }
        };
        
       
    }

    displayCart();


     //for calculation
     function calculatePrice(price,quantity){
        let total = 0
        let product= parseInt(quantity*price);
        total += product        
        totalDisplay.textContent = total
    }
})
