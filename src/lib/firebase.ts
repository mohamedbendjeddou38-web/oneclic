import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {

    apiKey: "AIzaSyB23m_JPYmxxtmjOEFyBKNemXAUfMSitns",
    authDomain: "oneclic-3ede8.firebaseapp.com",
    databaseURL: "https://oneclic-3ede8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "oneclic-3ede8",
    storageBucket: "oneclic-3ede8.firebasestorage.app",
    messagingSenderId: "307225203379",
    appId: "1:307225203379:web:0466246bc19fb42efd96c6"
};


const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, signInWithPopup };

