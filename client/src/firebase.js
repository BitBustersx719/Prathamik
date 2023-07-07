import { initializeApp } from "firebase/app";
import{getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtvKOqCkDkGww3-1sH7pbLi2a60GXyEug",
  authDomain: "prathamik-81b8a.firebaseapp.com",
  projectId: "prathamik-81b8a",
  storageBucket: "prathamik-81b8a.appspot.com",
  messagingSenderId: "1053502669186",
  appId: "1:1053502669186:web:c663712bf3290051744f9b",
  measurementId: "G-5N7YX6WQ1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app)