
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const SignupForm = document.getElementById('signUpForm');
const header_signUp = document.getElementById('header_signUp');
const signupBtn = document.getElementById('signupBtn');






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
// function isValidPassword(value) {
//   if (!/[a-z]/.test(value)) {
//     return 'Your password must contain at least one lowercase letter';
//   } if (!/[A-Z]/.test(value)) {
//     return 'Your password must contain at least one uppercase letter';
//   } if (!/\d/.test(value)) {
//     return 'Your password must contain at least one number';
//   } if (!/[@$!%*?&]/.test(value)) {
//     return 'Your password must contain at least one of these special characters: @, $, !, %, *, ?, &';
//   } if (value.length < 6) {
//     return 'Your password must be composed of at least 6 characters';
//   }
//   return 'true';
// }


function isValidPassword(value) {
  if (!/[a-z]/.test(value)) {
    return 'Your password must contain at least one lowercase letter';
  } if (!/[A-Z]/.test(value)) {
    return 'Your password must contain at least one uppercase letter';
  } if (!/\d/.test(value)) {
    return 'Your password must contain at least one number';
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
passwordErr.innerHTML = '';
};

password.onchange = () => {
  passwordErr.innerHTML = isValidPassword(password.value) === 'true' ? '' : isValidPassword(password.value);
  passwordErr.innerHTML = password2.value === password.value ? '' : 'Passwords don\'t match';
};
password2.oninput = () => {
  passwordErr.innerHTML = password2.value === password.value ? '' : 'Passwords don\'t match';
};

signupBtn.onmouseover = () => {
  if (emailErr.innerHTML !== '' || passwordErr.innerHTML !== '' || passwordErr.innerHTML !== '') {
    signupBtn.style.opacity = 0.6;
  } else {
    signupBtn.style.opacity = 1;
    signupBtn.style.cursor = 'pointer';
  }
};

signupBtn.onclick = (e) => {
  e.preventDefault();
  if (emailErr.innerHTML !== '' || passwordErr.innerHTML !== '' || passwordErr.innerHTML !== '') {
    emailErr.innerHTML = '*Please correct errors in red below!!';
  }  else if (password.value === ''|| email.value === '' ){

    emailErr.innerHTML = '*Please enter all field!!';
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
        .then((user) => {  
              console.log(user);    
              if (user.status == true) {
               
                SignupForm.innerHTML = `<p>Hey, <span class="registered_name"><strong>${user.user.name}</strong></span> Your account has been created successfull!</p>
                <p><a href="./login.html">Please login !</a></p>`;
                header_signUp.innerHTML = "Account Created";
                header_signUp.classList.add('success');            
                } 
                if(user.status == false){
                  passwordErr.innerHTML = user.message          
                }  
         }).catch((err) => {
                errorDisplay.innerHTML = err.message;
         })
            .catch(((fetchErr) => {
                  emailErr.innerHTML = `Error: ${fetchErr}... Offline?`;
      }));
  }
};
