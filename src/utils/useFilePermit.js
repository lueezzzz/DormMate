import { auth } from "../firebase/auth";
import { db } from "../firebase/db"
import { collection, addDoc } from "firebase/firestore";

export default async function filePermit(permitData) {
    
    const { uid } = auth.currentUser;

    // Object.defineProperty(permitData, "dormerID", { value: uid }) // attach dormer id property to the permit data
    permitData = { ...permitData, dormerID: uid }
    console.log(permitData);

    const permitCollectionRef = collection(db, "permits");
    await addDoc(permitCollectionRef, permitData) //add the new permit to the db

    // const userDocRef = doc(db, "users", uid);
    // const userDocSnap = await getDoc(currUserDocRef);
    // const userDoc = userDocSnap.data() //get current user data
    // userDoc.permits.push(newPermitDocRef.id) //append the new permit id to the array of user permits
    // await setDoc(userDocRef, userDoc, { merge: true }) //set the new data on the doc

}