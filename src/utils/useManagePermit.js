import { db } from "../firebase/db";
import { doc, setDoc, getDoc } from "firebase/firestore";


export default async function managePermit(permitID, newPermitStatus) {
    const permitDocRef = doc(db, "permits", permitID);
    const docSnap = await getDoc(permitDocRef);

    if (docSnap.exists()) {
        await setDoc(permitID, {
            ...docSnap.data(), ...{ newPermitStatus: newPermitStatus }
        });
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

}
