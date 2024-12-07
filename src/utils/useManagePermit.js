import { db } from "../firebase/db";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default async function managePermit(permitID, permitStatus) {
  const permitDocRef = doc(db, "permits", permitID);
  const newNotifDocRef = doc(db, "notifications", permitID)

  try {
    const docSnap = await getDoc(permitDocRef);

    if (docSnap.exists()) {
      const managedPermit = {
        ...docSnap.data(),
        permitStatus,
      }
      await setDoc(permitDocRef, managedPermit);
      console.log(`Permit ${permitID} updated to status: ${permitStatus}`);
      await setDoc(newNotifDocRef, managedPermit)
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error managing permit:", error);
  }
}
