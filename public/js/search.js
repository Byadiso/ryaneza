      
document.addEventListener('DOMContentLoaded', () => {            
  
    

    const searchBar = document.getElementById('searchBar'); 
    const submit_serch_btn = document.querySelector('.btnSearch');
    const search_container = document.querySelector('.search_container');

// fetching of categories 
function fetchCategories(){
    return  fetch(`http://localhost:3000/api/v1/categories`, {
             method: 'GET',
             headers:{
               'Content-Type':'application/json'
                    }

       })
     .then(response =>response.json())
     .then(categories =>{ 
      let storedCategories = localStorage.setItem('categories', JSON.stringify(categories))
   
     })
     .catch(err =>console.log(err));
   };

   fetchCategories();


//    get them from localStorage
    let CategoriesStored = JSON.parse(localStorage.getItem('categories'));
    console.log(CategoriesStored);
    // let categoryAny= "fresh vegetables"
    // let categoryAny = "6076d05f3d6773321c50cb9a"
    let categoryAny = ""
   ///handle search business 

    // const handleChange = name => event => {
    //  name = event.target.value;
    // };

    let input_search
    const input = document.getElementById('input_search');
    input.addEventListener('keyup',(e)=>{
     input_search = e.target.value;
        console.log(input_search)
    } )


    //for fetching data 

   

    const list = params => {
        // const query = queryString.stringify(params);
        const  query = new URLSearchParams(params)
                for (const oneQuerry of query) {
                     console.log(oneQuerry);
            }
        console.log("and I have reached to list function")
        console.log("query", query);
        return fetch(`http://localhost:3000/api/v1/properties/search?${query}`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };


// for search data 
    const searchData = () => {
        console.log('now it is going on to search data functon')
        let search = input_search;
        // console.log(search, category);
        if (search) {
            list({ search: input_search || undefined, category: categoryAny }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                       console.log(response);
                       renderSearch(response);
                    }
                }
            );
        }
    };
    


function renderSearch(searchedData){
    let Searched_title = document.querySelector('.search_title');
if(searchedData.length === 0 ){
    Searched_title.innerHTML = `No property found`
    } else {
       
        Searched_title.textContent =   `Found ${searchedData.length} `;
        let searchedContent = document.querySelector('.searched_content');
        searchedContent.innerHTML= '';
        


        for (var i = 0 ; i< searchedData.length ; i++){
            let searched =document.createElement('div');
            searched.innerHTML = `<div>       
            <p>${searchedData[i].name}</p>
            <p>${searchedData[i].description}</p>
            <p>${searchedData[i].price}</p>
            </div>`;            
            searchedContent.append(searched);
       }

      

}
      
      
   }

   
   submit_serch_btn.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log('I am serach something');
    searchData();
            
});

    })