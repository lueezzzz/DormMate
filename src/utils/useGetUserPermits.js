import { auth } from "../firebase/auth";
import { db } from "../firebase/db"
import { collection, query, where, getDocs } from "firebase/firestore";


export default async function getUserPermits() {
    const { uid } = auth.currentUser;
    const userPermits = []
    const getPermitsQuery = query(collection(db, "permits"), where("dormerID", "==", uid));

    const querySnapshot = await getDocs(getPermitsQuery);
    querySnapshot.forEach((doc) => {
        userPermits.push(doc.data())
    });
    return userPermits;
}