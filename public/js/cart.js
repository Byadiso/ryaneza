/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', () => {
   
    console.log('Welcome to the cart logic')
     

    document.body.addEventListener( 'click', function ( event ) {           
            if( event.target && event.target.matches(".btn_addCart")) {            
                let item_id = event.target.parentNode.dataset.id;
                let buttonAddToCart =  event.target;                     
                addToCart(item_id, buttonAddToCart ); 
                // checkIfInCart(item_id) 
                     
            };
          } );


    function addToCart(item_id, buttonContent){ 
          let cart=[];         
        

          let propertiesItem = { ...JSON.parse(localStorage.getItem('properties')) } ;          
            let itemTobeAdded =  propertiesItem.properties.find((item) => () => {
            item.Property.id[0] === item_id
        });
            
            console.log("let add to the cart")
            cart =[...cart, itemTobeAdded];    
            localStorage.setItem('cart', JSON.stringify(cart));             
            buttonContent.innerHTML=`<i class="fas fa-shopping-cart"></i> Added to cart`
            console.log(cart)
            
        }
        
  
    //   function checkIfInCart(id){
          
    // let propertiesItem = { ...JSON.parse(localStorage.getItem('properties')) } ;          
    // let itemTobeAdded =  propertiesItem.properties.find((item) => () => {
    //         item.Property.id[0] === id
    //     });

    // let cartStored = [...JSON.parse(localStorage.getItem('cart')) ]  
    // console.log(cartStored)      
    // let isInCart = cartStored.find((item) => () => {
    //     item._id === itemTobeAdded._id
    // }); 

    // if(isInCart){
    //     return "it is in cart"
    // }
    // else{
    //     return "it is not in cart"
    // }

    //   }

    function displayCart(){
        let cartContiner = document.getElementsByClassName('cart-content');

        let cartStored = [...JSON.parse(localStorage.getItem('cart')) ] 
        cartStored.forEach(item =>{
            console.log(item)
        })    
    }

    displayCart();
})
