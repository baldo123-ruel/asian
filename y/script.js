import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue, query, orderByChild, equalTo, update, push } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDtZhNePKFNheo17JCIE-ugm9zITBqmuOA",
  authDomain: "asiantouristspot.firebaseapp.com",
  databaseURL: "https://asiantouristspot-default-rtdb.firebaseio.com",
  projectId: "asiantouristspot",
  storageBucket: "asiantouristspot.appspot.com",
  messagingSenderId: "926746849321",
  appId: "1:926746849321:web:73b2bf2d027d828e8aac38",
  measurementId: "G-PLN6KYPR2H"
};

  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
  // Reference to the Firebase Realtime Database
  const db = getDatabase(app);

  const userRef = ref(db,"users");
  const username01 = document.getElementById('username');
  const emailInput1 = document.getElementById('email');
const passwordInput1 = document.getElementById('password');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const signUpBtn = document.getElementById('signUpBtn');
const userNameError = document.getElementById('userNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Function to check if the email is valid
function isValidEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}
function SignupUser() {
  const name = username01.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;

  const validEmail = isValidEmail(emailValue);
  const validPassword = passwordValue.trim() !== '';
  if (name === '') {
    userNameError.textContent = 'Please enter your username';
} else {
    userNameError.textContent = '';
}
  if (!validEmail) {
      emailError.textContent = 'Please enter a valid email';
  } else {
      emailError.textContent = '';
  }

  if (!validPassword) {
      passwordError.textContent = 'Please enter a password';
  } else {
      passwordError.textContent = '';
  }

  
  if (validEmail && validPassword) {
      signUpBtn.disabled = false;
      signUpBtn.style.backgroundColor = '#4169E1'; // Royal blue
  } else {
      signUpBtn.disabled = true;
      signUpBtn.style.backgroundColor = '#ccc'; // Gray
  }
}
// Function to validate inputs and show error messages
function validateInputs() {
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    const validEmail = isValidEmail(emailValue);
    const validPassword = passwordValue.trim() !== '';

    if (!validEmail) {
        emailError.textContent = 'Please enter a valid email';
    } else {
        emailError.textContent = '';
    }

    if (!validPassword) {
        passwordError.textContent = 'Please enter a password';
    } else {
        passwordError.textContent = '';
    }

    
    if (validEmail && validPassword) {
        loginBtn.disabled = false;
        loginBtn.style.backgroundColor = '#4169E1'; // Royal blue
    } else {
        loginBtn.disabled = true;
        loginBtn.style.backgroundColor = '#ccc'; // Gray
    }
}

function checkUserExists(email) {
  const usersRef = ref(db, 'users');
  const EmailUser = emailInput.value;
  const pass = passwordInput.value;
  onValue(usersRef, (snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const checkUser = Object.values(userData).filter(user => user.email === email);
      if (checkUser.length === 0) {
        showMessage("User not found!", false);
      } else {
        let userFound = false;
  
        checkUser.forEach(user => {
          if (pass === user.password) {
            // Password matches
            userFound = true;
            showMessage("Success. Redirecting to dashboard..", true);
            setTimeout(() => {
              localStorage.setItem('userName', user.username);
              // Redirect to index.html after 5 seconds
              window.location.href = 'index.html';
            }, 5000);
          }
        });
  
        if (!userFound) {
          showMessage("Incorrect password. Please try again", false);
        }
      }
    
    }
  });
   
  }
  function checkUserAlreadyExist(email) {
    const usersRef = ref(db, 'users');
    const EmailUser = emailInput.value;
    const pass = passwordInput.value;
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const checkUser = Object.values(userData).filter(user => user.email === email);
        if (checkUser.length === 0) {
          showMessage("User not found!", false);
        } else {
           showMessage("User already exist. please Sign In.")
        }
      
      }
    });
     
    }

// Event listeners to validate inputs on input change
emailInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);
emailInput1.addEventListener('input', SignupUser);
passwordInput1.addEventListener('input', SignupUser);
username01.addEventListener('input', SignupUser);
signUpBtn.addEventListener('click', function(){
  const emailUser1 = emailInput1.value;
    checkUserAlreadyExist(emailUser1);
    alert("click")
});
loginBtn.addEventListener('click',function(){
  const emailUser = emailInput.value;
   checkUserExists(emailUser);
});

function showMessage(message, isSuccess) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
  
    // Clear previous classes
    messageDiv.classList.remove('success', 'error');
  
    if (isSuccess) {
      messageDiv.classList.add('success');
    } else {
      messageDiv.classList.add('error');
    }
  
    // Rest of your showMessage function
  }