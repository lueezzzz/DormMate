import { db } from "../firebase/db";
import { doc, setDoc, getDoc } from "firebase/firestore";


export default async function assignDormerRoom(dormerUID, newRoomNumber) {
    const dormerDocRef = doc(db, "users", dormerUID);
    const docSnap = await getDoc(dormerDocRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        await setDoc(dormerDocRef, {
            ...docSnap.data(), ...{ roomNumber: newRoomNumber }
        });
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

}
