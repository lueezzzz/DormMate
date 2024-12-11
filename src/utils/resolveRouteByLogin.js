import logIn from "@/utils/useLogin";
import { db } from "@/firebase/db";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function resolveRouteByLogin(email, password) {
    let isAdmin;

    //log in user
    const user = await logIn(email, password);
    const userEmail = user.email;

    //check if user is admin or student
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("email", "==", userEmail))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => { isAdmin = doc.data().isAdmin; });

    return isAdmin ? "/manage" : "/file-permit";
}