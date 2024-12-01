import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/auth";

export default async function signUpDormer(email, password) {
  let dormer;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    dormer = userCredential.user;
    console.log(dormer.uid);
  } catch (error) {
    
    console.error("Error creating user:", error);
    throw error;
  }

  return dormer;
}
