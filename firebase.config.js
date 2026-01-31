 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration



 export const firebaseConfig = {
    apiKey: "AIzaSyBDMI2jta8pksJbeXKV2eG_k0fsSaxoZ2U",
    authDomain: "hakhatoon-e55df.firebaseapp.com",
    projectId: "hakhatoon-e55df",
    storageBucket: "hakhatoon-e55df.firebasestorage.app",
    messagingSenderId: "436968846382",
    appId: "1:436968846382:web:92af912ca6d7e090069bbf",
    measurementId: "G-FB0BHBHSZ3"
  };








 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export them so other files can import
export { app, auth, db, storage };


