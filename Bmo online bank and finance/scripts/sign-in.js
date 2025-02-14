import { initializeApp} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";

import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js"; 

import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";  

const firebaseConfig = {
  apiKey: "AIzaSyDiPQB-_i4b7WlmGzlZTO5RUVNqdK0nbDU",
  authDomain: "online-bank-97eb2.firebaseapp.com",
  databaseURL: "https://online-bank-97eb2-default-rtdb.firebaseio.com",
  projectId: "online-bank-97eb2",
  storageBucket: "online-bank-97eb2.firebasestorage.app",
  messagingSenderId: "262153218762",
  appId: "1:262153218762:web:a405d5ceefa733a5fb2233"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

let users = {
  Ricard_Haernandez: {
    id: 'Ricard_Harnandez',
    name: 'Richard Hernandez',
    email: 'hr7070445@gmail.com',
    password: 'Ricardhar@5',
    checking: 760500/100,
    saving: 300000/100,
  },
  Bailey_Kay: {
    id: 'Bailey_Kay',
    name: 'Bailey Kay',
    email: 'baileykayx76@gmail.com',
    password: 'password456',
    checking: 50000/100,
    saving: 10000 / 100,
  },
  Karen_Noxy: {
    id: 'Karen_Noxy',
    name: 'Leo Grayson',
    email: 'leograyson1969@gmail.com',
    password: 'password00',
    checking: 30000/100,
    saving: 1000/100,
  },
};
export default users;

document.addEventListener('DOMContentLoaded', () => {
  const signInBtn = document.getElementById('sign-btn');
  const passwordInp = document.getElementById('password'); 
  signInBtn.addEventListener('click', () => {
    const password = passwordInp.value;
    signIn(password);
  })
});
function signIn(password){
  localStorage.setItem("userpassword", password);
  let emailInput = document.getElementById('email').value;
  // const password = document.getElementById('password').value; 

  for (let userid in users) {
    if (users[userid].email === emailInput) {
      if( users[userid].password === password){
        // alert('Sign in successful!');
        signInAnonymously(auth)
        .then(() => {
          console.log('Anonymous authentication successful.')
        })
        .catch((error) => {
          console.error('Anonymous authentication failed:', error);
        });
        const userRef = ref(database, 'users/' + userid);  

        onValue(userRef, (snapshot) => {
          snapshot.val();
          // const data = snapshot.val();
          // console.log(data);
        });
        push(userRef, users[userid])
        .then(() => {
          console.log("User saved successfully!");
        }).catch((error) => {
          console.error("Error saving user:", error);
        });
        document.querySelector('#sign-btn').innerHTML = 'Please wait...';
        sessionStorage.setItem('isLoggedIn', true);
        localStorage.setItem("userName", users[userid].name);
        localStorage.setItem("userId", users[userid].id);
        localStorage.setItem("userChackings", users[userid].checking);
        localStorage.setItem("userSavings", users[userid].saving);
        sendOTP();
        return true;
      }else{
        alert('Wrong password')
        return false;
      }
    }
  } 
  alert('Email not found');
}
function sendOTP() {
  // Reference  
  let emailInput = document.getElementById('email').value;
  sessionStorage.setItem("userEmail", emailInput);
  const otpverify = document.getElementsByClassName('otpverify')[0];
  const mainForm = document.querySelector('.main-form');
  let otpInp = document.getElementById('opt-input');
  const otpBtn = document.querySelector('.opt-btn');

  // Generate an OTP 
  let otp = Math.floor(Math.random() * 1000000);

  let emailBody = `
  <img src="images/bmo-blue.svg" width="100px"/>
  <h1> Welcome to BMO Online Banking and Finance</h2>
  <h2> Your OTP is </h2>
  <h3>${otp}</h3>
  `;
  Email.send({
    // 994501B42584E496588F63403A45BF3899DB
    SecureToken : "d2640e04-1651-4372-b5db-eeac16179d0a",
    To : emailInput,
    From : "leograyson1969@gmail.com",
    Subject : "This is from Bmo Online Bamking and Finance",
    Body : emailBody
  }).then(
    message => {
    if(message === 'OK'){
      otpverify.style.display = "block";
      mainForm.style.display = "none";
      console.log('sent')
      otpBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        // console.log('clicked')
        if(otpInp.value == otp){
          // alert('Email address verified...')
          window.location.href="/my_account.html";
          window.location.replace("/my_account.html")
        }
      })
    }
  })
}

// const fgtPwdLink =  document.querySelector('.fgt-pwd');

// fgtPwdLink.addEventListener('click', ()=> {
//   alert('Service Unavailable, try again later....');
// });
