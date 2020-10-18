import firebase from 'firebase/app'
import 'firebase/storage'
// Initialize Firebase
const config = {
  apiKey: "AIzaSyBGoij2n3Nft-gT_jiPPBqOk9cz3c4U_YI",
  authDomain: "images-af2b4.firebaseapp.com",
  databaseURL: "https://images-af2b4.firebaseio.com",
  projectId: "images-af2b4",
  storageBucket: "images-af2b4.appspot.com",
  messagingSenderId: "448518943024",
  appId: "1:448518943024:web:811d8dbad8cc08fda818f5",
  measurementId: "G-PLV3293BR9"
};

// Initial Firebase
firebase.initializeApp(config);
const storage = firebase.storage();
//analytics is options 
 

export  {
  storage, firebase as default
}