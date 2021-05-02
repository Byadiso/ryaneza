
/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', ()=>{ 
            
  // const ordersMsg = document.getElementById('header-text');  
  const mainSingleDiv = document.getElementById('singleProperty'); 
  let proId = localStorage.getItem('id');
  let propertiesItem = {...JSON.parse(localStorage.getItem('properties'))};

  // console.log(properties);
  
  console.log(proId);
  let pro =[];
  pro = [...pro, propertiesItem];
  
  let Mypro = pro.find(item => ()=>{
     item.Property.id[0]=== proId }
  )

  let newPro = Mypro.properties 
  console.log(newPro);
  let findedOne = newPro.find(item=> item._id === proId)
    
  console.log(findedOne);
  let {description,shipping,reviews,comments,_id} = findedOne

  //for acessing my comments reviews and description
  const descriptionCont = document.querySelector('.description_details');
  const ShippingCont = document.querySelector('.shipping_details');
  const reviewsCont = document.querySelector('.reviews_details');
  const commentsCont = document.querySelector('.comment_details');
  

  // set all content 
  descriptionCont.textContent= description;
  ShippingCont.textContent= shipping == true ? "Please remember to update your address in order to deliver you product at your door" : "Sorry this is not delivable product";
  reviewsCont.textContent=reviews.length == 0 ? "No Reviews found!" : reviews.map((review)=>{
    const reviewsContainer = document.createElement('div');
    reviewsContainer.innerHTML =
    ` <p>${review}</p>
    <p>${review.postedBy.name}</p>
    `
  });
  commentsCont.textContent= comments.length == 0 ? "No comments found for this product. Be the first to comment!" : comments.map((coment)=>{
    const comentContainer = document.createElement('div');
    comentContainer.innerHTML =
    ` <p>${coment}</p>
    <p>${coment.postedBy.name}</p>
    `
  });
         
 const renderPro = ()=>{  
   const singlePro = findedOne;
   const propertyContainer= document.createElement('DIV');
   propertyContainer.classList.add('property_container');
   propertyContainer.setAttribute('data-id',_id);
  

          //for add to the cart
          const addCartBtn= document.createElement('BUTTON');
          addCartBtn.classList.add('btn_addCart');
          addCartBtn.classList.add('bag-btn');
          addCartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Add to cart`;
          addCartBtn.style.margin = "5px 2px 5px 2px";
          addCartBtn.addEventListener('click', ()=>{
                console.log('yes this one is already added');
                location.href='#';

          });
          

          


    //for image
    let photoUrl = `http://localhost:3000/api/v1/property/photo/${proId}`
        const img = document.createElement("img");  
        img.src = photoUrl; 
        img.style.width= "350px";
        img.style.height= "400px";
        img.classList.add('imgCreated');
        propertyContainer.append(img);
      //   propertyContainer.append(deleteBtn);
      //   propertyContainer.append(modifyBtn);
        propertyContainer.append(addCartBtn);
        //appending the main container
        mainSingleDiv.appendChild(propertyContainer);
        
        
              
 }

//  fetchingSingle();



renderPro();


// ----------------------------------------------------------------------------------



//fetching related 
const  fetchingRelated = ( () => {
      fetch( `http://localhost:3000/api/v1/properties/related/${proId}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
       
        },
      }
        )
      .then((res) => res.json())
      .then(data => renderRelated(data)
         )    
   }); 

function renderRelated(data){
      console.log(data);
      
      let properties = data;
      console.log(properties);
      const container_related = document.createElement('DIV');
      container_related.classList.add('property_container');
      let header_related = document.createElement('h1');
      header_related.classList.add('header_related');
      header_related.textContent= "Related Property";

      // create a header for related property
      container_related.append(header_related);




      for ( var i= 0; i < properties.length; i++ ){ 
    
            const {_id,name, category} = properties[i];
            let property_related = document.createElement('div');
            property_related.classList.add('related_properties');
      
        
            property_related.innerHTML = 
         `<img scr=http://localhost:3000/api/v1/property/photo/${_id} class="imgCreated" style="width: 100px; height: 50px;">
         <p id="phone"><strong>name:</strong> ${name}</p>        
          `
      
          container_related.append(property_related); 
          
          mainSingleDiv.appendChild(container_related); 

          



      }

     


}

   fetchingRelated();


})


