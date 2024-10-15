import { auth, signOut } from "../firebase/auth";

function signOut() {
    signOut(auth).then(() => {
        //do stuff here if needed 
        //route to home
    }).catch((error) => {
        //do stuff when error happens
        console.log(error);

    })
}

export default signOut;