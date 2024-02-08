// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";

// const firebaseConfig = {
//   apiKey:import.meta.env.VITE_FIREBASE_KEY,
//   authDomain:import.meta.env.VITE_AUTH_DOMAIN,
//   projectId:import.meta.env.VITE_PROJECT_ID,
//   storageBucket:import.meta.env.VITE_STORAGE_BUCKET ,
//   messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId:import.meta.env.VITE_APP_ID,
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);


 
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey:  import.meta.env.VITE_FIREBASE_KEY,
//   authDomain:  import.meta.env.VITE_AUTH_DOMAIN,
//   projectId:  import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId:  import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId:  import.meta.env.VITE_APP_ID,
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app)




import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
// import { server } from "./redux/store";

const firebaseConfig = {
  apiKey: "AIzaSyBP81T6qLrdccsu0MhL6K3O5EFpsr8L4n8",
  authDomain: "ecommerce-c63ab.firebaseapp.com",
  projectId: "ecommerce-c63ab",
  storageBucket: "ecommerce-c63ab.appspot.com",
  messagingSenderId: "585153509225",
  appId: "1:585153509225:web:ff40615162aa1893adeff8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)