      
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
    let categoryAny= "fresh vegetables"
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
        const query = queryString.stringify(params);
        console.log("query", query);
        return fetch(`http://localhost:3000/api/v1/products/search?${query}`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };


// for search data 
    const searchData = () => {
        let search = input_search;
        // console.log(search, category);
        if (search) {
            list({ search: input_search || undefined, category: categoryAny }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                       console.log(response);
                    }
                }
            );
        }
    };


    
    
    function searchSubmit (e){
        e.preventDefault();
        searchData();
    };

    submit_serch_btn.addEventListener('submit', ()=>{
                      searchSubmit(e)
                }
    
                 )

    })