const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyCPWTdRb64Em4EsLCgg5hdSQDPql1Te8n8",
  authDomain: "chowdown-8bd8b.firebaseapp.com",
  projectId: "chowdown-8bd8b",
  storageBucket: "chowdown-8bd8b.appspot.com",
  messagingSenderId: "773957655085",
  appId: "1:773957655085:web:e43265bae4fc5f641af6a4"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase