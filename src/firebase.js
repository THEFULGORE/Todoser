// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDMrtO-Fxv8aYvXXH6pXx3y97kVXrZTi8U',
	authDomain: 'todoser-1dc10.firebaseapp.com',
	projectId: 'todoser-1dc10',
	storageBucket: 'todoser-1dc10.appspot.com',
	messagingSenderId: '921613043882',
	appId: '1:921613043882:web:3c8ed87a17a3ed2bac28d3',
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
