import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'tagchat-bca37.firebaseapp.com',
  databaseURL: 'https://tagchat-bca37.firebaseio.com',
  projectId: 'tagchat-bca37',
  storageBucket: 'tagchat-bca37.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const auth = firebase.auth();

const db = firebase.firestore();

const dbTimestamp = firebase.firestore.Timestamp;

const storage = firebase.storage();

// To ensure ensure firestore timestamp objects supported in future
const settings = { timestampsInSnapshots: true };
db.settings(settings);

export { auth, db, dbTimestamp, storage };
