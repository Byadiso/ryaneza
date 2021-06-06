/* eslint-disable prettier/prettier */
document.addEventListener('DOMContentLoaded', () => {
   
    let checkoutDisplay = document.querySelector('.ckeckout_container');  
    let payBtn = document.querySelector('.pay_button'); 
    let payment_method = document.querySelector('#payment_method'); 
    let products = JSON.parse(localStorage.getItem('cart'));
    
    
    
    

    
// place order when clcik on checkout 
payBtn.addEventListener("click", ()=>{

    console.log("yes we are ready to go to checkout")
    buy()
//     let user = JSON.parse(localStorage.getItem('user'));   
//     let userId = user.user._id;
//     let token = user.token;
//     let deliveryAddress = user.user.address;

//     let order = JSON.parse(localStorage.getItem('cart'));
//    orderToCheckout(products, userId, token, deliveryAddress);
})




// //

// let deliveryAddress = data.address;

const buy = () => {
    let instance ={};
  
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce =instance
        .requestPaymentMethod()
        .then(data => {
            // console.log(data);
            nonce = data.nonce;
            // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
            // and also total to be charged
            // console.log(
            //     "send nonce and total to process: ",
            //     nonce,
            //     getTotal(products)
            // );
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal(products)                                                        
            };

            processPayment(userId, token, paymentData)
                .then(response => {
                    console.log(response);
                    // empty cart
                    // create order

                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };

                    createOrder(userId, token, createOrderData)
                        .then(response => {
                            emptyCart(() => {
                                setRun(!run); // run useEffect in parent Cart
                                console.log('payment success and empty cart');
                                setData({
                                    loading: false,
                                    success: true
                                });
                            });
                        })
                        .catch(error => {
                            console.log(error);
                            setData({ loading: false });
                        });
                })
                .catch(error => {
                    console.log(error);
                    setData({ loading: false });
                });
        })
        .catch(error => {
            // console.log("dropin error: ", error);
           console.log(error)
        });
};

// //order function
// function orderToCheckout(products ,userId, token, deliveryAddress ){
//     let totalTopay = calculatePrice(createOrderData)
    
//     // body to add when create order 
//     const createOrderData = {
//         products: products,
//         transaction_id: response.transaction.id,
//         amount: response.transaction.amount,
//         address: deliveryAddress
//     };

//     console.log(order);

//     fetch(`http://localhost:3000/api/order/create/${userId}`, {
//                 method: 'POST',
//                 headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 'Authorization': `Bearer ${token}`
//                 },
//                 body:  JSON.stringify({ order: createOrderData })
//              })
//         .then(response => {
//             return  response.json()
//         })
//         .then(data => {
//         if(data.status == true){
//             let storedData = localStorage.setItem('order', JSON.stringify(data))  
//             window.location.href = '../pages/checkout.html'
//         }         
//         if(data.status == false) console.log(data.error);        
//         })
//         .catch(err => console.log(err));
           
//             }


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
 
})
