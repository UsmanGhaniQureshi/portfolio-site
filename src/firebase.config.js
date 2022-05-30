import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4U6j319VUBSUs0pbic395HuNDlntUZMo",
  authDomain: "portfolio-site-4799e.firebaseapp.com",
  databaseURL: "https://portfolio-site-4799e-default-rtdb.firebaseio.com",
  projectId: "portfolio-site-4799e",
  storageBucket: "portfolio-site-4799e.appspot.com",
  messagingSenderId: "836446688594",
  appId: "1:836446688594:web:c11c006e4a18d66e6c968b",
};

initializeApp(firebaseConfig);

export const db = getFirestore();

const storage = getStorage();
export default storage;
