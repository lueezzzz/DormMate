import { auth } from "../firebase/auth";
import { db } from "../firebase/db";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import getDormers from "./getDormers";

export default async function getDormerPermits() {
    const { uid } = auth.currentUser;
    const dormManagerDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(dormManagerDocRef)
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let adminDorm = docSnap.data().userDorm
    } else {
        console.log("Dorm manager account does not exist!");
    }
    const dormersID = await getDormers("balayLampirong")
    console.log("dormers id are: ", dormersID);

    const getPermitsQuery = query(
        collection(db, "permits"),
        where("dormerID", "in", dormersID)
    );
    const dormerPermits = []
    const querySnapshot = await getDocs(getPermitsQuery);
    querySnapshot.forEach((doc) => {
        dormerPermits.push(doc.data())
    });
    return dormerPermits;
}
