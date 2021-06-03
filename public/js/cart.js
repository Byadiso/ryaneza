/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', () => {
   
    let totalDisplay = document.querySelector('.cart-total');  
    let cartContainer = document.querySelector('.cart-content');  
    let numberHeaderToBuy = document.querySelector('.total_to_buy');    
          
    function displayCart(){
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {     
                
                let cartStored = [...JSON.parse(localStorage.getItem('cart')) ];              
                numberHeaderToBuy.textContent = cartStored.length;

                for ( var i= 0; i < cartStored.length; i++ ) {   
                    let elements = document.createElement('DIV');
                    elements.classList.add("items_to_buy");                 
                    let {_id, name, price, count } = cartStored[i];
                    console.log(cartStored[i]);                    

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
                    calculatePrice(cartStored);
                }
              
            }
        };
        
       
    }

    displayCart();


     //for calculation
     function calculatePrice(cart){
        console.log(cart)
        let tempTotal = 0 ;
        let itemsTotal = 0;
        cart.map(item => {
            console.item
            tempTotal += parseInt(item.price * item.count) ;
            itemsTotal += parseInt(item.count);           
        });

        
        totalDisplay.textContent = parseFloat(tempTotal.toFixed(2))
     

         
        // let total 
        // let product = parseInt(quantity*price);
        // total += product        
        // totalDisplay.textContent = total
    }
})
