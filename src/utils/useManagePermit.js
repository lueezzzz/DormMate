import { db } from "../firebase/db";
import { doc, setDoc, getDoc } from "firebase/firestore";

/*
usage:
await managePermit([the permit ID], [the new permit status if approved or not])
*/

export default async function managePermit(permitID, newPermitStatus) {
    const permitDocRef = doc(db, "permits", permitID);
    const docSnap = await getDoc(permitDocRef);

    if (docSnap.exists()) {
        await setDoc(permitID, {
            ...docSnap.data(), ...{ newPermitStatus: newPermitStatus }
        });
    } else {
        console.log("No such document!");
    }

}
