
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
  
         
 const renderPro = ()=>{  
   const singlePro = findedOne;
   
   //for delete button

    const deleteBtn= document.createElement('BUTTON');
    deleteBtn.classList.add('btn-delete');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.style.margin = "5px 2px 5px 2px";
    deleteBtn.addEventListener('click', ()=>{
            console.log('yes delete something');                         
            fetch( `http://localhost:3000/api/v1/property/${proId}`, {
              method: 'DELETE',
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // Authorization: `Bearer `
             }
            }).then(()=> location.reload()); 
     
});

    //for modify button
    const modifyBtn= document.createElement('BUTTON');
          modifyBtn.classList.add('btn-modify');
          modifyBtn.innerHTML = "Modify";
          modifyBtn.style.margin = "5px 2px 5px 2px";
          modifyBtn.addEventListener('click', ()=>{
                console.log('yes updates')

                location.href='../pages/updated.html';

          });

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
        img.style.width= "570px";
        img.style.height= "670px";
        img.classList.add('imgCreated');
        mainSingleDiv.append(img);
        mainSingleDiv.append(deleteBtn);
        mainSingleDiv.append(modifyBtn);
        mainSingleDiv.append(addCartBtn);
        
        
              
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
      for ( var i= 0; i < properties.length; i++ ){ 
    
            const {_id,name, category} = properties[i];

            let property_related = document.createElement('div');
            property_related.classList.add('dashboard_user_details');
      
        
            property_related.innerHTML = 
         `<p id="phone"><strong>name:</strong> ${name}</p>
         <p id="owner"><strong>categry:</strong> ${category.name}</p> 
          <p id="owner"><strong>User ID:</strong> ${_id}</p>`
      
          mainSingleDiv.appendChild(property_related)



      }

     


}

   fetchingRelated();


})


