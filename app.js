// 🔥 Firebase Imports
import { firebaseConfig } from "./firebase.config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



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


const authContainer = document.getElementById("auth-container");
const dashboardContainer = document.getElementById("dashboard-container");

const blogName = document.getElementById("blog-name");
const blogDesc = document.getElementById("blog-desc");
const blogPost = document.getElementById("blog-post");
const submitBlogBtn = document.getElementById("submit-blog-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const blogsUl = document.getElementById("blogs");

let blogs = [];
let editIndex = null;

// After signup/login, show dashboard
function showDashboard() {
  authContainer.style.display = "none";
  dashboardContainer.style.display = "block";
}

// Submit Auth
submitBtn.addEventListener("click", () => {
  if (!email.value || !password.value) {
    alert("Email aur Password zaroori hai");
    return;
  }

  if (isSignup) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        alert("Account Successfully Created 🎉");
        showDashboard();
      })
      .catch((error) => alert(error.message));
  } else {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        alert("Login Successful ✅");
        showDashboard();
      })
      .catch((error) => alert(error.message));
  }
});

// Blog CRUD
function renderBlogs() {
  blogsUl.innerHTML = "";
  blogs.forEach((blog, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${blog.name}</strong>
        <p>${blog.desc}</p>
        <p>${blog.post}</p>
      </div>
      <div>
        <button class="edit-btn" onclick="editBlog(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteBlog(${index})">Delete</button>
      </div>
    `;
    blogsUl.appendChild(li);
  });
}

function addBlog() {
  const name = blogName.value.trim();
  const desc = blogDesc.value.trim();
  const post = blogPost.value.trim();

  if (!name || !desc || !post) return alert("Fill all fields!");

  if (editIndex !== null) {
    blogs[editIndex] = { name, desc, post };
    editIndex = null;
    submitBlogBtn.innerText = "Add Blog";
    cancelEditBtn.style.display = "none";
  } else {
    blogs.push({ name, desc, post });
  }

  blogName.value = "";
  blogDesc.value = "";
  blogPost.value = "";
  renderBlogs();
}

function editBlog(index) {
  blogName.value = blogs[index].name;
  blogDesc.value = blogs[index].desc;
  blogPost.value = blogs[index].post;
  editIndex = index;
  submitBlogBtn.innerText = "Update Blog";
  cancelEditBtn.style.display = "inline-block";
}

function cancelEdit() {
  blogName.value = "";
  blogDesc.value = "";
  blogPost.value = "";
  editIndex = null;
  submitBlogBtn.innerText = "Add Blog";
  cancelEditBtn.style.display = "none";
}

function deleteBlog(index) {
  if (confirm("Are you sure you want to delete this blog?")) {
    blogs.splice(index, 1);
    renderBlogs();
  }
}

submitBlogBtn.addEventListener("click", addBlog);
cancelEditBtn.addEventListener("click", cancelEdit);


