import { db } from "../firebase/db";
import { doc, deleteDoc } from "firebase/firestore";

export default async function removeDormerByUID(dormerUID) {
    await deleteDoc(doc(db, "users", dormerUID));
}
