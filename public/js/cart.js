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
                                <div class="removeToCart_container">
                                    <button class="removeToCart_btn">X</button>
                                </div>                           
                            </div>
                        `
                    cartContainer.appendChild(elements);    
                    calculatePrice(cartStored);


                    //add remove from cart functionality
                    const removeToCartBtns = document.querySelectorAll(".removeToCart_btn");
                    removeToCartBtns.forEach((btn)=>{
                        btn.addEventListener("click", ()=>{
                            removeFromCart(_id) 
                          })
                        
                     });
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
     }

      //remove form the cart
      function removeFromCart(propertyId){
        //   console.log("we are ready to remove form the car"+ propertyId)
        let cart = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }    
            cart.map((product, i) => {
                if (product._id === propertyId) {
                    cart.splice(i, 1);
                }
            });
            
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        return cart;
    }
})
