import { db } from "../firebase/db";
import { auth } from "../firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export default async function deleteNotifs() {
    const { uid } = auth.currentUser;
    const q = query(collection(db, "notifications"), where("dormerID", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (notif) => {
        await deleteDoc(doc(db, "notifications", notif.id))
    });
}
