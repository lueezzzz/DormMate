import { auth } from "../firebase/auth";
import { signOut } from "firebase/auth";

function logOut() {
    signOut(auth).then(() => {
        //do stuff here if needed 
        console.log("user logged out");

        //route to home
    }).catch((error) => {
        //do stuff when error happens
        console.log(error);

    })
}

export default logOut;