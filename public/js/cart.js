/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', () => {
   
    console.log('Welcome to the cart logic')
    var addToCartButton = document.getElementsByClassName(".btn_addCart");


    document.body.addEventListener( 'click', function ( event ) {
        if( event.target.classname == 'btn_addCart' ) {
          console.log("yes")
        };
      } );
})
