

// CONSUME LOGIN ENDPOINT
const loginBtn = document.getElementById('loginBtn');
const userField = document.getElementById('email');
const firstname = document.getElementById('firstname');
const passwordField = document.getElementById('password');
const incorrect =  document.getElementById('incorrect');

const usernameErr = document.querySelector('div#usernameErr');
const emailErr = document.querySelector('div#emailErr');
const passwordErr = document.querySelector('div#passwordErr');
const password2Err = document.querySelector('div#password2Err');


loginBtn.onmouseover = () => {
  if (!userField.value || !passwordField.value || emailErr.innerHTML !== '' || passwordErr.innerHTML !== '' || password2Err.innerHTML !== '') {
   return loginBtn.style.opacity = 0.6;
  } else {
    loginBtn.style.opacity = 1;
  }
};

loginBtn.onclick = (e) => {
  e.preventDefault(); 
  const email = userField.value;
  const password = passwordField.value;
  if (!email.trim() || !password.trim()) {
    password2Err.innerHTML = '* Please fill in all fields';
    
  } else {  
      fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email, password: password }),
      }).then(resp => resp.json().then((user) => {      
    if (user.status === 'fail') {       
    console.log(user.message)
    return password2Err.innerHTML = user.message;
    } else {
    if (user.status === 'success') {
        window.location.href = '../pages/user.html';
        let userLogged =  localStorage.setItem('user',JSON.stringify(user));
        // console.log(userLogged);
        // console.log('wow')
        password2Err.innerHTML = `<span style='color: green yellow'>${user.message}</span>`;
        }
    }
    }).catch((err) => {
      password2Err.innerHTML = err.message
      return;
    }))
    .catch(((fetchErr) => {
      usernameErr.innerHTML = fetchErr;
    }));
    }      
  };




