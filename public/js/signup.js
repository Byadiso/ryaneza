// CONSUME SIGNUP ENDPOINT
const signupBtn = document.getElementById('signupBtn');
const firstname = document.getElementById('firstname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const phone= document.getElementById('phone');
const address= document.getElementById('address');

// const usernameErr = document.querySelector('div#usernameErr');
const emailErr = document.querySelector('div#emailErr');
const passwordErr = document.querySelector('div#passwordErr');
const password2Err = document.querySelector('div#password2Err');
// const phoneErr = document.querySelector('div#phoneError');

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
  }  else if (password.value === ''|| email.value === ''|| phone.value === '' ){

    emailErr.innerHTML = 'plz enter the required field ';
  }
  else {   
  fetch('http://localhost:3000/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        firstname:firstname.value,
        lastname:firstname.value,
        email: email.value, 
        password: password.value,
        phone: phone.value,
        address:address.value
       }),
    }).then(resp => resp.json().then((res) => {      
      if (res.status === 401) {
        return password2Err.innerHTML = res.message;
      }
      if (res.success === true ) {
        let userLogged =  localStorage.setItem('user',JSON.stringify(res));
        password2Err.innerHTML = `<span style='color: greenyellow'>${res.message}</span>`;
        window.location.href = '../pages/property.html';
        if (res.user.role === 'admin') {
          setTimeout(() => {
            localStorage.setItem(res.user.username, 'any');
            window.location.href = '../pages/property.html';
          }, 100);
          return;
        }
        setTimeout(() => {
          window.location.href = '../pages/property.html';
        }, 100);
      }
    }).catch((err) => {
      password2Err.innerHTML = err.message;
    }))
      .catch(((fetchErr) => {
        emailErr.innerHTML = `Error: ${fetchErr}... Offline?`;
      }));
  }
};
