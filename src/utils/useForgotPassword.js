import { auth } from "@/firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
export default async function changePassword() {
    const { email } = auth.currentUser

    sendPasswordResetEmail(auth, email).then(() => {
        console.log("email sent to user");
    }).catch((error) => {
        console.log("error: ", error);
    })
}