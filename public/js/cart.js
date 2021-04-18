

// variables 
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const  productsDOM = document.querySelector(".products-center");

//cart

let cart = [];

// buttons

let buttonsDOM = [];


// display products
class UI {
//    
getBagButtons(){
    const buttons =[...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach(button => {
        let id = button.dataset.id;
        let inCart = cart.find(item => item._id === id);
        if (inCart){
            button.innerText = " In cart";
            button.disabled = true;
        } 

            button.addEventListener('click', event => {
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                //get product from localStorage
                let proIdCart = localStorage.getItem('id');
                let propertiesItem = {...JSON.parse(localStorage.getItem('properties'))};
                let pro =[];
                pro = [...pro, propertiesItem];
                
                let Mypro = pro.find(item => ()=>{
                   item.Property.id[0]=== proIdCart }
                )
                // let newPro = Mypro.Property 
                let addedPro = Mypro.Property.find(item=> item._id === proIdCart)
            
                

                let cartItem = {...addedPro, amount: 1 };
                //add product to the cart
                 cart = [...cart, cartItem];

                 
                // save cart in local storage 
                Storage.saveCart(cart);
                //set cart values
                this.setCartValues(cart);
                // display cart items
                this.addCartItem(cartItem);
                 //shown the cart
                  console.log(cart)
 

            });

    
       
    })
}

setCartValues(cart){
    let tempTotal = 0 ;
    let itemsTotal = 0;
    cart.map(item => {
        tempTotal += item.price * item.amount ;
        itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
}
addCartItem(cartItem){
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML= `
    <img src=${cartItem.url} alt="product"/> 
    <div>
        <h4>${cartItem.state}</h4>
        <h5>${cartItem.price}frw </h5>
        <span class="remove-item" data-id=${cartItem._id}>remove</span>
    </div>
    <div>
        <i class="fas fa-chevron-up" data-id=${cartItem._id}></i>
        <p class="item-amount">${cartItem.amount}</p>
        <i class="fas fa-chevron-down" data-id=${cartItem._id}></i>
    </div>
    `;
    cartContent.appendChild(div);
}

showCart(){
    cartOverlay.classList.add("transparentBcg");
    cartDOM.classList.add("showCart");
}

setupApp (){
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartBtn.addEventListener('click',this.showCart);
    closeCartBtn.addEventListener('click',this.hideCart);
}

populateCart(cart){
    cart.forEach(item => this.addCartItem(item))
}
hideCart(){
    cartOverlay.classList.remove("transparentBcg");
    cartDOM.classList.remove("showCart");
   
}

CartLogic(){
    // cart clear button 
    clearCartBtn.addEventListener('click', ()=>{
        this.clearCart();
    });
    // cart functionality
    cartContent.addEventListener('click',event =>{
        if(event.target.classList.contains('remove-item')) {
    let removeItem = event.target;
    let id = removeItem.dataset.id;
    cartContent.removeChild(removeItem.parentElement.parentElement);
    this.removeItem(id);
        } else if(event.target.classList.contains('fa-chevron-up')){
            let addAmount = event.target;
            let id = addAmount.dataset.id;
            let tempItem = cart.find(item => item._id === id);
            console.log(tempItem);
            tempItem.amount = tempItem.amount + 1;
            Storage.saveCart(cart);
            this.setCartValues(cart);
            addAmount.nextElementSibling.innerText = tempItem.amount;
        } else if (event.target.classList.contains("fa-chevron-down")){
            let lowerAmount = event.target;
            let id = lowerAmount.dataset.id;
            let tempItem = cart.find(item => item._id ===id);
            tempItem.amount = tempItem.amount - 1;
            if(tempItem.amount > 0 ){

                Storage.saveCart(cart);
                this.setCartValues(cart);
                lowerAmount.previousElementSibling.innerText = tempItem.amount;
            } else {
                cartContent.removeChild(lowerAmount.parentElement.parentElement); 
                this.removeItem(id)
            }
        }
    })
}

clearCart(){
    let cartItems = cart.map(item => item._id);
    cartItems.forEach(id => this.removeItem(id));
    while(cartContent.children.lenght> 0){
        cartContent.removeChild(cartContent.children[0])
    }

    this.hideCart();

}

removeItem(id){
cart = cart.filter(item => item._id !== id);
this.setCartValues(cart);
Storage.saveCart(cart);
let button = this.getSingleButton(id);
button.disabled = false;
button.innerHTML = `<i class="fas fa-shopping-cart"></i> Add to cart`
}
getSingleButton(id){
    return buttonsDOM.find(button => button.dataset.id === id);
}

}

// local storage
class Storage {
       static saveCart(cart){
        localStorage.setItem("cart",JSON.stringify(cart)
        );
    }

    static getCart(){
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')):[];
    }
}

document.addEventListener("DOMContentLoaded", ()=>{

const ui = new UI();

ui.setupApp();

//getAll products 
        ui.getBagButtons();
        ui.CartLogic();
    
});