import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBQH2fzY1x0KcLxDckcXz1_QaeL_M08eDg",
  authDomain: "desk-app-dbc1f.firebaseapp.com",
  projectId: "desk-app-dbc1f",
  storageBucket: "desk-app-dbc1f.appspot.com",
  messagingSenderId: "248839121139",
  appId: "1:248839121139:web:66e84d2b7c8b2bd2ccaf86"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider}

export default db