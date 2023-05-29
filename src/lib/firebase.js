/* eslint-disable no-unused-vars */
// TODO FIREBASE
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth, signInWithPopup, GoogleAuthProvider,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore, collection, addDoc, Timestamp,
  query, orderBy,
  doc, deleteDoc,
  updateDoc,
} from 'firebase/firestore';

// import { firestore } from "../lib/firebase.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBEmwpcnkOcSM4Ps-QYggXH2ZM-1JS6v4c',
  authDomain: 'social-network-8f6b4.firebaseapp.com',
  projectId: 'social-network-8f6b4',
  storageBucket: 'social-network-8f6b4.appspot.com',
  messagingSenderId: '156745465292',
  appId: '1:156745465292:web:88a863c8d2913377793169',
  measurementId: 'G-1KEPWLS7ND',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const entrarConGoogle = async () => {
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential1 = GoogleAuthProvider.credentialFromError(error);
  }
};

export const crearUsuario = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
};

export const entrarConEmail = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return errorCode;
  }
};

// wall
export const guardarPost = async (text) => {
  const docRef = await addDoc(collection(db, 'posts'), {
    text,
    timestamp: Timestamp.now(), // fecha de creacion
  });
  // console.log('Document written with ID: ', docRef.id);
};

export function verPosts() {
  const postsRef = collection(db, 'posts'); // post
  const queryPost = query(postsRef, orderBy('timestamp', 'desc'));
  return queryPost;
}

export function deletePost(id) {
  return deleteDoc(doc(db, 'posts', id));
}

export function editPost(id, newText) {
  const postRef = doc(db, 'posts', id);
  return updateDoc(postRef, { text: newText });
}
