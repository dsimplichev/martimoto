import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider  } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAdpwinM8uk4ld-qUVKWHNRLjeSdLViN5I",
  authDomain: "martimoto.firebaseapp.com",
  projectId: "martimoto",
  storageBucket: "martimoto.firebasestorage.app",
  messagingSenderId: "535517732644",
  appId: "1:535517732644:web:495ec8a0fc0b8c742f1db1",
  measurementId: "G-N821HSMN44"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };