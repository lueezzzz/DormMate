import { db } from "../firebase/db"
import { collection, getDocs } from "firebase/firestore";


export default async function getDorms() {
    const dorms = []
    const dormsCollectionRef = collection(db, "dormitories");
    const querySnapshot = await getDocs(dormsCollectionRef);
    querySnapshot.forEach((doc) => {
        dorms.push(doc.data())
    });
    return dorms;
}