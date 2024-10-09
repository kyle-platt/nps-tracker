import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx8zZMAJAHeVX_sj5x1xhJzxP5rPNQ1_k",
  authDomain: "nps-bucketlist-28cae.firebaseapp.com",
  projectId: "nps-bucketlist-28cae",
  storageBucket: "nps-bucketlist-28cae.appspot.com",
  messagingSenderId: "1098318478784",
  appId: "1:1098318478784:web:954bd771cab0e9bb815c25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
