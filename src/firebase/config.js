
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy5DSGO9QnhHORR0zgISynEVGygXznp1Y",
  authDomain: "nnn-web.firebaseapp.com",
  projectId: "nnn-web",
  storageBucket: "nnn-web.appspot.com",
  messagingSenderId: "132655324472",
  appId: "1:132655324472:web:8d0398e88d3e475e6875cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
