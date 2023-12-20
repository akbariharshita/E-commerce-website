import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDnQd7P5CylG1eELFCwgcLO8cn_WvdjZtk",
  authDomain: "shop-2e4a2.firebaseapp.com",
  projectId: "shop-2e4a2",
  storageBucket: "shop-2e4a2.appspot.com",
  messagingSenderId: "919683107096",
  appId: "1:919683107096:web:6432ab8089c9cd4116766d"
};

const app = initializeApp(firebaseConfig);

export default app