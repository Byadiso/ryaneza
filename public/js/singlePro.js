
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

  let newPro = Mypro.Property 
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
        const img = document.createElement("img");  
        img.src = singlePro.url; 
        img.style.width= "570px";
        img.style.height= "670px";
        img.classList.add('imgCreated');
        mainSingleDiv.append(img);
        mainSingleDiv.append(deleteBtn);
        mainSingleDiv.append(modifyBtn);
        mainSingleDiv.append(addCartBtn);
        
        
              
 }

//  fetchingSingle();

renderPro()

})


