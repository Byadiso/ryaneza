      
document.addEventListener('DOMContentLoaded', () => {            
  
    const searchBar = document.getElementById('searchBar'); 
    const submit_serch_btn = document.querySelector('.btnSearch');

// fetching of categories 
// function fetchCategories(){
//     return  fetch(`http://localhost:3000/api/v1/categories`, {
//              method: 'GET',
//              headers:{
//                'Content-Type':'application/json'
//                     }

//        })
//      .then(response =>response.json())
//      .then(categories =>{ 
//       let storedCategories = localStorage.setItem('categories', JSON.stringify(categories))
   
//      })
//      .catch(err =>console.log(err));
//    };

//    fetchCategories();

   ///handle search business 

    const handleChange = name => event => {
     name = event.target.value;
    };

    const input = document.getElementById('input_search');
    input.addEventListener('keyup',(e)=>{
        let input_search = e.target.value;
        console.log(input_search)
    } )

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

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
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

    submit_serch_btn.addEventListener('submit',searchSubmit())

    })