// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-ecommerce-6039f.firebaseapp.com",
  projectId: "react-ecommerce-6039f",
  storageBucket: "react-ecommerce-6039f.firebasestorage.app",
  messagingSenderId: "471094175154",
  appId: "1:471094175154:web:c7b9fd4a96fbe92885f0ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
 