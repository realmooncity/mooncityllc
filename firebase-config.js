import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXGTgjr1Dkpy9gGtXaVoFdlIOQ2_VmKkk",
  authDomain: "mooncity-eb09d.firebaseapp.com",
  projectId: "mooncity-eb09d",
  storageBucket: "mooncity-eb09d.firebasestorage.app",
  messagingSenderId: "757174968612",
  appId: "1:757174968612:web:92cdf98466aca9a61c53b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)