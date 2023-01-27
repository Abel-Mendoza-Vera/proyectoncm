import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDYDz9f0FYZPgYnflL4rCEoLjPxdr_ZuiE",
    authDomain: "test-firebase-react-19c01.firebaseapp.com",
    projectId: "test-firebase-react-19c01",
    storageBucket: "test-firebase-react-19c01.appspot.com",
    messagingSenderId: "807276572864",
    appId: "1:807276572864:web:3813aee94602018463fd25"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
