import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default async function signUpDormer(email, password) {
  let dormer;
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "dormmate-611b6.firebaseapp.com",
    projectId: "dormmate-611b6",
    storageBucket: "dormmate-611b6.appspot.com",
    messagingSenderId: "602831707549",
    appId: "1:602831707549:web:28b56255990ea799832374",
    measurementId: "G-TT82YHGK86",
  };

  const app = initializeApp(firebaseConfig, email);
  const auth = getAuth(app);
  await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
    // Signed up
    dormer = userCredential.user;
    const id = dormer.uid;
    console.log("created account: ", id);
    return;
  }).catch((error) => {
    // ..
  });
  deleteApp(app);



  return dormer;
}
