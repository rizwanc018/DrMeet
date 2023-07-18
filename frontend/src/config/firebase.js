// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDgx_hRdivhrQNV7WvI2zW0nmUnNzM9BhU",
    authDomain: "lifeline-7be58.firebaseapp.com",
    projectId: "lifeline-7be58",
    storageBucket: "lifeline-7be58.appspot.com",
    messagingSenderId: "255377642467",
    appId: "1:255377642467:web:8dba80a6b746f80ceb06d6",
    measurementId: "G-ERQ59RH846"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)