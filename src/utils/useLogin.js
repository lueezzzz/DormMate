import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/auth";

async function logIn(email, password) {
  let user;
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  return user;
}

export default logIn;
