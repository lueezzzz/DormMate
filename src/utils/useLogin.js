import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/auth";
import { db } from "@/firebase/db";
import { collection, query, where, getDocs } from "firebase/firestore";

async function logIn(email, password) {
  let route;
  await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = userCredential.user;
      const userEmail = user.email;

      //check if user is admin or student
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("email", "==", userEmail))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        route = doc.data().isAdmin ? "/manage" : "/dormer";
      });
    })
    .catch((error) => {
      console.log("Error detected");
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  return route;
}

export default logIn;
