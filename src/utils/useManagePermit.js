import { db } from "../firebase/db";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default async function managePermit(permitID, permitStatus) {
  const permitDocRef = doc(db, "permits", permitID);

  try {
    const docSnap = await getDoc(permitDocRef);

    if (docSnap.exists()) {
      await setDoc(permitDocRef, {
        ...docSnap.data(),
        permitStatus,
      });
      console.log(`Permit ${permitID} updated to status: ${permitStatus}`);
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error managing permit:", error);
  }
}
