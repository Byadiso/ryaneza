/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', () => {
   
    let totalDisplay = document.querySelector('.cart-total');    

    document.body.addEventListener( 'click', function ( event ) {           
            if( event.target && event.target.matches(".btn_addCart")) {            
                let item_id = event.target.parentNode.dataset.id;
                let buttonAddToCart =  event.target;                     
                addToCart(item_id, buttonAddToCart ); 
                console.log("yes it works")
                     
            };
          } );


    // function addToCart(item_id, buttonContent){ 
    //         let cart=[];     
    //         let propertiesItem = { ...JSON.parse(localStorage.getItem('properties')) } ;          
    //             let itemTobeAdded =  propertiesItem.properties.find((item) => () => {
    //             item.Property.id === item_id
    //         });            
    //         console.log("let add to the cart");            
    //         cart.push({
    //             ...itemTobeAdded,
    //             count: 1
    //         });   
    //         localStorage.setItem('cart', JSON.stringify(cart));             
    //         buttonContent.innerHTML=`<i class="fas fa-shopping-cart"></i>In cart`
    //         console.log(cart);  
            
    //     }
        
          
    function displayCart(){
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {            
               
                let cartContiner = document.querySelector('.cart-content');
                let cartStored = [...JSON.parse(localStorage.getItem('cart')) ];
                let productInCart = document.createElement('DIV');
                cartStored.forEach(item =>{
                    let {_id, name, price, count } = item
                    let photoUrl = `http://localhost:3000/api/v1/property/photo/${_id}` ;
                    
                    productInCart.innerHTML=`
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
                cartContiner.appendChild(productInCart);
                calculatePrice(price,count);
                })
            }
        };
        
        //for calculation
        function calculatePrice(price,quantity){
            let total = 0
            let product= parseInt(quantity*price);
            total += product
            console.log(total)
            totalDisplay.textContent = total
        }
    }

    displayCart();
})
