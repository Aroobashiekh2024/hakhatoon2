// 🔥 Firebase Imports
import { firebaseConfig } from "./firebase.config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// // ⚠️ APNA FIREBASE CONFIG YAHA PASTE KARO
// const firebaseConfig = {
//   apiKey: "PASTE_YOUR_API_KEY",
//   authDomain: "your-project.firebaseapp.com",
//   projectId: "your-project-id",
//   appId: "1:xxxx:web:xxxx"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// Elements



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const toggleBtn = document.getElementById("toggleBtn");
const title = document.getElementById("title");

let isSignup = true;

// Toggle Login / Signup
toggleBtn.addEventListener("click", () => {
  isSignup = !isSignup;

  title.innerText = isSignup ? "Sign Up" : "Login";
  submitBtn.innerText = isSignup ? "Create Account" : "Login";
  toggleBtn.innerText = isSignup ? "Login" : "Sign Up";
});

// Submit
submitBtn.addEventListener("click", () => {
  if (!email.value || !password.value) {
    alert("Email aur Password zaroori hai");
    return;
  }

  if (isSignup) {
    // Signup
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        alert("Account Successfully Created 🎉");
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    // Login
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        alert("Login Successful ✅");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

