
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


// const usernameErr = document.querySelector('div#usernameErr');
const emailErr = document.querySelector('div#emailErr');
const passwordErr = document.querySelector('div#passwordErr');
const errorDisplay = document.querySelector('div#error');


/**
 * isValidPassword method
 * @param {string} password
 * @returns {string} true or error messages
 */
// Adapted from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
function isValidPassword(value) {
  if (!/[a-z]/.test(value)) {
    return 'Your password must contain at least one lowercase letter';
  } if (!/[A-Z]/.test(value)) {
    return 'Your password must contain at least one uppercase letter';
  } if (!/\d/.test(value)) {
    return 'Your password must contain at least one number';
  } if (!/[@$!%*?&]/.test(value)) {
    return 'Your password must contain at least one of these special characters: @, $, !, %, *, ?, &';
  } if (value.length < 6) {
    return 'Your password must be composed of at least 6 characters';
  }
  return 'true';
}

// name.onchange = () => {
//   password2Err.innerHTML = '';
// };

email.onchange = () => {
  emailErr.innerHTML = /\S+@\S+\.\S+/.test(email.value) ? '' : 'Please enter a valid email';  
//   usernameErr.innerHTML = '';
  password2Err.innerHTML = '';
};

password.onchange = () => {
  passwordErr.innerHTML = isValidPassword(password.value) === 'true' ? '' : isValidPassword(password.value);
  password2Err.innerHTML = password2.value === password.value ? '' : 'Passwords don\'t match';
};
password2.oninput = () => {
  password2Err.innerHTML = password2.value === password.value ? '' : 'Passwords don\'t match';
};

signupBtn.onmouseover = () => {
  if (emailErr.innerHTML !== '' || passwordErr.innerHTML !== '' || password2Err.innerHTML !== '') {
    signupBtn.style.opacity = 0.6;
  } else {
    signupBtn.style.opacity = 1;
    signupBtn.style.cursor = 'pointer';
  }
};

signupBtn.onclick = (e) => {
  e.preventDefault();
  if (emailErr.innerHTML !== '' || passwordErr.innerHTML !== '' || password2Err.innerHTML !== '') {
    emailErr.innerHTML = 'Please correct the errors in red below';
  }  else if (password.value === ''|| email.value === '' ){

    emailErr.innerHTML = 'plz enter the required field ';
  }
  else {   
  fetch('http://localhost:3000/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name:  name.value,
        email: email.value, 
        password: password.value,     
       }),
    })
        .then(res => res.json())
        .then((data) => {  
              console.log(data)    
              if (data.status === 400) {
                return errorDisplay.innerHTML = data.message;
              }else if (data.status === true ) {
                let userLogged =  localStorage.setItem('user',JSON.stringify(data));
                password2Err.innerHTML = `<span style='color: greenyellow'>${data.message}</span>`;
                window.location.href = '../pages/property.html';        
              }
         }).catch((err) => {
                errorDisplay.innerHTML = err.message;
         })
            .catch(((fetchErr) => {
                  emailErr.innerHTML = `Error: ${fetchErr}... Offline?`;
      }));
  }
};
