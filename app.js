// 🔥 Firebase Imports
import { firebaseConfig } from "./firebase.config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const toggleBtn = document.getElementById("toggleBtn");
const title = document.getElementById("title");

const authContainer = document.getElementById("auth-container");
const dashboardContainer = document.getElementById("dashboard-container");

let isSignup = true;

// Show dashboard after login
function showDashboard() {
  authContainer.style.display = "none";
  dashboardContainer.style.display = "block";
}

// Hide dashboard (logout)
function hideDashboard() {
  authContainer.style.display = "block";
  dashboardContainer.style.display = "none";
}

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
        showDashboard();
        email.value = "";
        password.value = "";
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    // Login
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        alert("Login Successful ✅");
        showDashboard();
        email.value = "";
        password.value = "";
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});




import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// const auth = getAuth();
const db = getFirestore();

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => location.reload());
});




// ES6 Vanilla JS

// Input elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const summaryInput = document.getElementById('summary');
const skillsInput = document.getElementById('skills');
const projectsInput = document.getElementById('projects');


// Preview elements
const previewName = document.getElementById('previewName');
const previewContact = document.getElementById('previewContact');
const previewSummary = document.getElementById('previewSummary');
const previewSkills = document.getElementById('previewSkills');
const previewProjects = document.getElementById('previewProjects');

// Update preview function
const updatePreview = () => {
 previewName.textContent = nameInput.value || "Your Name";
 previewContact.textContent = `${emailInput.value || "Email"} | ${phoneInput.value || "Phone"} | ${addressInput.value || "Address"}`;
 previewSummary.textContent = summaryInput.value || "Summary will appear here.";
 previewSkills.textContent = skillsInput.value || "Skills will appear here.";
 previewProjects.textContent = projectsInput.value || "Projects will appear here.";
}

// Add event listeners
[nameInput, emailInput, phoneInput, addressInput, summaryInput, skillsInput, projectsInput]
.forEach(input => input.addEventListener('input', updatePreview));


// Download PDF using jsPDF
document.getElementById('downloadBtn').addEventListener('click', () => {
 const { jsPDF } = window.jspdf;
 const doc = new jsPDF();

 doc.setFontSize(22);
 doc.text(previewName.textContent, 20, 20);

 doc.setFontSize(12);
 doc.text(previewContact.textContent, 20, 30);

 doc.setFontSize(16);
 doc.text("Profile:", 20, 40);
 doc.setFontSize(12);
 doc.text(previewSummary.textContent, 20, 47);

 doc.setFontSize(16);
 doc.text("Skills:", 20, 57);
 doc.setFontSize(12);
 doc.text(previewSkills.textContent, 20, 64);

 doc.setFontSize(16);
 doc.text("Projects:", 20, 74);
 doc.setFontSize(12);
 doc.text(previewProjects.textContent, 20, 81);

 doc.save('resume.pdf');
});





// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firestore save button
const saveResumeFirestoreBtn = document.getElementById("saveResumeFirestoreBtn");

if (saveResumeFirestoreBtn) {
  saveResumeFirestoreBtn.addEventListener("click", async () => {

    // Construct resume data object
    const resumeData = {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      address: addressInput.value,
      summary: summaryInput.value,
      skills: skillsInput.value,
      projects: projectsInput.value,
      userId: auth.currentUser.uid,  // Link resume to logged-in user
      createdAt: new Date().toISOString()
    };

    // Basic validation
    if (!resumeData.name || !resumeData.email) {
      alert("Name and Email are required to save the resume!");
      return;
    }

    try {
      await addDoc(collection(db, "resumes"), resumeData);
      alert("Resume successfully saved to Firestore! ✅");
    } catch (err) {
      console.error(err);
      alert("Error saving resume: " + err.message);
    }
  });
}



// js dhah board


document.getElementById('dashboardBtn').addEventListener('click', () => {
  window.open('dashboard.html', '_blank');
});



