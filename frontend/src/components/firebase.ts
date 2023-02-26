// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDJU-FK36gozGzpElFhXba37pfOvCEtBCw",

  authDomain: "ucr-life.firebaseapp.com",

  projectId: "ucr-life",

  storageBucket: "ucr-life.appspot.com",

  messagingSenderId: "697175478741",

  appId: "1:697175478741:web:31bc778c5020eb9a07ad5c"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);