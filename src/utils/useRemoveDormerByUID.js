import { db } from "../firebase/db";
import { doc, deleteDoc, query, getDocs, where, collection } from "firebase/firestore";

export default async function removeDormerByUID(dormerUID) {
    await deleteDoc(doc(db, "users", dormerUID));
    const q = query(collection(db, "permits"), where("dormerID", "==", dormerUID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (permit) => {
        await deleteDoc(doc(db, "permits", permit.id))
    });
}
