/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', () => {
   
    let checkoutDisplay = document.querySelector('.ckeckout_container');  
    let payBtn = document.querySelector('.pay_button'); 
    let total_to_pay = document.querySelector('.total_to_pay'); 
    let cartIn = document.querySelector('.cart-items');
    
    let products = JSON.parse(localStorage.getItem('cart'));
    let address = document.querySelector('#address_delivery'); 
    let payment_message = document.querySelector('.payment_message');   
    let paymentform = document.querySelector('.wrapper') ;

    let deliveryAddress
    

    

    let API = "http://localhost:3000/api";
    let user = JSON.parse(localStorage.getItem('user'));   
    let userId = user.user._id;
    let token = user.token;

    
   
    function displayDropIn(){
        getBraintreeClientToken(userId,token);

        var button = document.querySelector('#submit-button');
        let branintreeToken = JSON.parse(localStorage.getItem('brainTreeToken'));

        braintree.dropin.create({
        authorization: branintreeToken.clientToken,
        selector: '#dropin-container'
        }, function (err, instance) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            instance.requestPaymentMethod(function (err, payload) {
            // Submit payload.nonce to your server
            if (err) {
                  console.log("Error",err)
                return;
                  }
            document.querySelector("#nonce").value= payload.nonce;
            // button.submit();
            console.log(payload.nonce)
            payBill(payload.nonce);
         
            });
        })
        });
    }


// funtion to get the addres
address.addEventListener('keyup', (event)=>{
    deliveryAddress = event.target.value
})



const payBill = (nonce) => {    
     
    const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)                                                        
            };
            processPayment(userId, token, paymentData)
                .then(response => {
                    console.log(response);                

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };

                    createOrder(userId, token, createOrderData)
                        .then(response => {
                            console.log(response);
                            // payment_sucess
                            payment_message.classList.remove('hide'); 
                            paymentform.classList.add('hide');
                            resetCart();
                        })
                        .catch(error => {
                            console.log(error);                         
                        });
                })
                .catch(error => {
                    console.log(error);                   
                })     
       
};


const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.count * nextValue.price;
    }, 0);
};


 //show total to pay at the top to the client 
total_to_pay.textContent= getTotal(products);



const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {            
            return response.json();
        })
        .then(data =>{            
            localStorage.setItem('brainTreeToken', JSON.stringify(data));
        })
        .catch(err => console.log(err));
};

displayDropIn();

function resetCart(){

    // cart logic
    let emptyCart = 0 
  
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) { 

        //remove thing in cart after buying them 
            localStorage.removeItem('cart');
            if( localStorage.removeItem('cart')){
                cartIn.textContent = emptyCart;

            }
            
           


        }
    }
}

 
})
