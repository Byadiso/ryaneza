

/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', () => {
   
    const mainSingleDiv = document.getElementById('singleProperty')
    let proId = localStorage.getItem('id');
    const success_message = document.querySelector('.success_message');
    const display_error = document.querySelector('.display_error_comment');
    let propertiesItem = { ...JSON.parse(localStorage.getItem('properties')) };



    console.log(proId)
    let pro = []
    pro = [...pro, propertiesItem]

    let Mypro = pro.find((item) => () => {
        item.Property.id[0] === proId
    })

    let newPro = Mypro.properties;
    console.log(newPro);
    let findedOne = newPro.find((item) => item._id === proId);    
 console.log(findedOne);
 let { description, shipping, reviews, comments, _id } = findedOne;

 

// ..................................render property ................................................

    const renderPro = () => {       
        const propertyContainer = document.createElement('DIV');       
        let photoUrl = `http://localhost:3000/api/v1/property/photo/${proId}`     

        propertyContainer.innerHTML =`
                <div class="property_container" data-toadd="${_id}">
                    <img src=${photoUrl} class="imgCreated" style="width: 350px; height: 400px;">
                    <button class="btn_addCart"> <i class="fas fa-shopping-cart"></i> Add to cart </button>
                </div>
                 `       
        
        //appending the main container
        mainSingleDiv.appendChild(propertyContainer);

        //  trying to addToCart butto a even listenenre
         const btns = document.querySelectorAll('.btn_addCart');
         btns.forEach((btn)=>{
             btn.addEventListener('click', (event)=>{  
                let item_id = event.target.parentNode.dataset.toadd;
                let buttonAddToCart =  event.target;               
                addToCart(item_id, buttonAddToCart );                      
             });
         });
      
        


    function addToCart(item_id, buttonContent){
                //  console.log(item_id);
                // console.log(buttonContent); 

            let cart=[];     
            let propertiesItem = {...JSON.parse(localStorage.getItem('properties'))};  
            
        


            let newPro = propertiesItem.properties;            
            let itemTobeAdded = newPro.find((item) => item._id === proId);            
                        
            console.log("let add to the cart");            
            cart=[...cart,{itemTobeAdded,
                count: 1}]
             
             
            localStorage.setItem('cart', JSON.stringify(cart));             
            buttonContent.innerHTML=`<i class="fas fa-shopping-cart"></i>In cart`
            console.log(cart);  
            
        }



    }

    //  fetchingSingle();

    renderPro()
            


 //for acessing my comments reviews and description
 const descriptionCont = document.querySelector('.description_details')
 const ShippingCont = document.querySelector('.shipping_details')
 const reviewsCont = document.querySelector('.reviews_details')
 const commentsCont = document.querySelector('#comment_details_container')

 // set all content
 descriptionCont.textContent = description
 ShippingCont.textContent =
     shipping == true
         ? 'Please remember to update your address in order to deliver you product at your door'
         : 'Sorry this is not delivable product'
 reviewsCont.textContent =
     reviews.length == 0
         ? 'No Reviews found!'
         : reviews.map((review) => {
               const reviewsContainer = document.createElement('div')
               reviewsContainer.innerHTML = ` <p>${review}</p>
 <p>${review.postedBy.name}</p>
 `
           })

 // ...........................comment section......................................................
 const comment_details_header = document.querySelector(
     '.comment_details_header'
 )
 comment_details_header.textContent = comments.length

 // condition to for rendering a text if no comments and if there are comments show them

 if (comments.length == 0) {
     return 'No comments to dislay'
 } else {
     renderComments()
 }

 // render my comments
 function renderComments() {
     for (var i = 0; i < comments.length; i++) {
         let user_loggin  = { ...JSON.parse(localStorage.getItem('user')) }        
         const { text, _id, createdBy, created } = comments[i]
         const comentContainer = document.createElement('div')
         comentContainer.innerHTML = `        
        <div class="comment_details" data-comment="${text}">
             <p class="comment" >${text}</p>
             <p class="posted_by">Posted by ${ createdBy.name }</p>   
             <p class="date_posted">Comented on ${ created }</p>
        </div>
        
         ${user_loggin.user._id == createdBy._id ? `<button class="btn-delete">delete</button>` : ''}
        <hr />`
        commentsCont.append(comentContainer)
     }

     
   // access user and token
    const user= JSON.parse(localStorage.getItem('user'));
    const userId = user.user._id;
    const token = user.token; 
    let propertyId =_id
             


     //uncomment 
     const deleteComment_btn = document.querySelectorAll('.btn-delete');

     deleteComment_btn.forEach(Btn => {    
            Btn.addEventListener('click', (e)=>{
                        // const comments = document.querySelector('.comment')[0];
                        let comment_created = e.target.parentNode.children[0].dataset.comment
                        console.log(comment_created)
                        return fetch(`http://localhost:3000/api/v1/property/uncomment/`, {
                            method: "PUT",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`
                            },
                            body: JSON.stringify( { userId , propertyId, comment: {text: comment_created} })
                        })
                .then(data => {
                    // console.log(data)
                    if(data.status == true){
                                          
                       success_message.innerHTML = `<h3>Your comment has been successfully removed</h3>`
                      //  location.reload();
                      
                    } 
                    if(data.status == false){
                      console.log(data.error)
                      display_error.innerHTML = data.error
                    }         
                  })
                .catch(err => console.log(err));  
               
                 })
 
               });

    }
    

    // ----------------------------------------------------------------------------------

    //fetching related
    const fetchingRelated = () => {
        fetch(`http://localhost:3000/api/v1/properties/related/${proId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => renderRelated(data))
    }

    function renderRelated(data) {
        console.log(data)
        let properties = data
        console.log(properties)
        const container_related = document.createElement('DIV')
        container_related.classList.add('property_container');
        let header_related = document.createElement('h1');
        header_related.classList.add('header_related');
        header_related.textContent = 'Related Property';

        // create a header for related property
        container_related.append(header_related)

        for (var i = 0; i < properties.length; i++) {
            const { _id, name, category } = properties[i]
            let property_related = document.createElement('div')
            property_related.classList.add('related_properties')

            property_related.innerHTML = `<img scr=http://localhost:3000/api/v1/property/photo/${_id} class="imgCreated" style="width: 100px; height: 50px;">
         <p id="phone"><strong>name:</strong> ${name}</p>       
          `
            container_related.append(property_related)
            mainSingleDiv.appendChild(container_related)
            
        }
    }
    fetchingRelated();




// add properties in cart 
document.body.addEventListener( 'click', function ( event ) { 

    if( event.target && event.target.matches(".btn_addCart")) {            
        let item_id = event.target.parentNode.dataset.id;
        let buttonAddToCart =  event.target;                     
        addToCart(item_id, buttonAddToCart ); 
       console.log("clicked to be added ")
             
    };
  } );


function addToCart(item_id, buttonContent){ 
    let cart=[];     
    let propertiesItem = { ...JSON.parse(localStorage.getItem('properties')) } ;          
        let itemTobeAdded =  propertiesItem.properties.find((item) => () => {
        item.Property.id === item_id
    });            
    console.log("let add to the cart");            
    cart.push({
        ...itemTobeAdded,
        count: 1
    });   
    localStorage.setItem('cart', JSON.stringify(cart));             
    buttonContent.innerHTML=`<i class="fas fa-shopping-cart"></i>In cart`
    console.log(cart);  
    
}



//  //check property in cart
//  function checkIfInCart (id){
//     let storedInCarrt = JSON.parse(localStorage.getItem('cart'))
//     let cart = document.querySelectorAll(".cart-items")[0];
//     if(){

//     }
//     cart.textContent = storedInCarrt.length;

//     let isInCart= storedInCarrt.find(item =>item._id == id);
//     if(isInCart){
        
//         let button = document.querySelector('.btn_addCart');
//         button.innerHTML=`<i class="fas fa-shopping-cart"></i> In cart`;
//         button.setAttribute('disabled',true);
//  }
// }


})
