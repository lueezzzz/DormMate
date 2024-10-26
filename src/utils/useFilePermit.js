import { auth } from "../firebase/auth";
import { db } from "../firebase/db"
import { doc, setDoc, collection, query, where, getDocs, addDoc, getDoc } from "firebase/firestore";

export async function filePermit(permitData) {

    const { uid } = auth.currentUser;

    const permitCollectionRef = collection(db, "permits");
    const newPermitDocRef = await addDoc(permitCollectionRef, permitData) //add the new permit to the db

    const currUserDocRef = doc(db, "users", uid);
    const currUserDocSnap = await getDoc(currUserDocRef);
    const currUserDoc = currUserDocSnap.data() //get current user data
    currUserDoc.permits = [...currUserDoc.permits, newPermitDocRef.id] //modify the permits data to append the new permit id
    await setDoc(currUserDocRef, currUserDoc, { merge: true }) //set the new data on the doc
    console.log("successfully added permit");
}