// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6UIYeH2c-_Ookju1wRgl-qsb894RvMEI",
  authDomain: "mail-box-288ad.firebaseapp.com",
  databaseURL: "https://mail-box-288ad-default-rtdb.firebaseio.com",
  projectId: "mail-box-288ad",
  storageBucket: "mail-box-288ad.appspot.com",
  messagingSenderId: "894241937020",
  appId: "1:894241937020:web:bb3b94bd64a8f94ba39bf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storageDb = getStorage(app);
export default storageDb;