      
// document.addEventListener('DOMContentLoaded', () => {            
  
    
    
// //     const filters = document.querySelector('.filterCheck'); 
// //     const main_properties = document.querySelector('.main_properties');

// // // fetching of categories 
// // function fetchCategories(){
// //     return  fetch(`http://localhost:3000/api/v1/categories`, {
// //              method: 'GET',
// //              headers:{
// //                'Content-Type':'application/json'
// //                     }
// //        })
// //      .then(response =>response.json())
// //      .then(categories =>{ 
// //       let storedCategories = localStorage.setItem('categories', JSON.stringify(categories))
   
// //      })
// //      .catch(err =>console.log(err));
// //    };

// //    fetchCategories();


// // //    get them from localStorage
// //     let CategoriesStored = JSON.parse(localStorage.getItem('categories'));
// //     console.log(CategoriesStored);


// //    function renderCategory(){      
// //        CategoriesStored.forEach(category => {
// //         const listOfCategories = document.createElement('div');
// //         listOfCategories.classList.add('check_item');
// //         listOfCategories.innerHTML = `                 
// //                 <input type="checkbox" name="${category.name}" id="all_property" value="${category.name}">
// //                 <label for="all"><strong>${category.name}</strong></label>                
// //        `;

// //         filters.appendChild(listOfCategories);
// //         });         
// //    }


// //    renderCategory();
    

// //     // let handle change on checking event 
   
// //     filters.addEventListener('change',(e)=>{
// //      let filter = e.target.value;
// //         console.log(filter);
// //         // find the id of the category 
// //         let filtredCat = CategoriesStored.find(cat => cat.name === filter);
// //         console.log(filtredCat)
// //     })


//     //for fetching data 

   

//     // const list = params => {
//     //     // const query = queryString.stringify(params);
//     //     const  query = new URLSearchParams(params)
//     //             for (const oneQuerry of query) {
//     //                  console.log(oneQuerry);
//     //         }
//     //     console.log("and I have reached to list function")
//     //     console.log("query", query);
//     //     return fetch(`http://localhost:3000/api/v1/properties/search?${query}`, {
//     //         method: "GET"
//     //     })
//     //         .then(response => {
//     //             return response.json();
//     //         })
//     //         .catch(err => console.log(err));
//     // };


// // // for search data 
// //     const searchData = () => {
// //         console.log('now it is going on to search data functon')
// //         let search = input_search;
// //         // console.log(search, category);
// //         if (search) {
// //             list({ search: input_search || undefined, category: categoryAny }).then(
// //                 response => {
// //                     if (response.error) {
// //                         console.log(response.error);
// //                     } else {
// //                        console.log(response);
// //                        renderSearch(response);
// //                     }
// //                 }
// //             );
// //         }
// //     };
    


// // function renderSearch(searchedData){
// //     let Searched_title = document.querySelector('.search_title');
// //     searchedContent.classList.add('border_bottom');


// //     // i want to hide all other content let add a class hide to it 
// //     main_properties.classList.add('hide');

// // if(searchedData.length === 0 ){
// //     searchedContent.innerHTML= '';
// //     Searched_title.innerHTML = `No property found`;
    
// //     } else {
       
// //         Searched_title.textContent =   `Found ${searchedData.length} Property`;       
// //         searchedContent.innerHTML= '';       


// //         for (var i = 0 ; i< searchedData.length ; i++){
// //             let searched =document.createElement('div');
// //             searched.classList.add('searched_content_item');
// //             searched.innerHTML = `      
// //             <p>${searchedData[i].name}</p>
// //             <p>${searchedData[i].description}</p>
// //             <p>${searchedData[i].price}</p>
// //           `;            
// //             searchedContent.append(searched);
// //        }

      

// // }
      
      
// //    }

   
// //    submit_serch_btn.addEventListener('click', (e)=>{
// //     e.preventDefault();
// //     console.log('I am serach something');
// //     searchData();
            
// // });

//     })