import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { app } from "./app";

export const auth = getAuth(app);
export const unsubscribeObserver = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // ...
  } else {
    // User is signed out
    // ...
  }
});
