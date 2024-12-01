import { db } from "../firebase/db"
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";


export default async function getDormers(setDormers, adminDorm) {

    const dormerQuery = query(
      collection(db, "users"),
      where("isAdmin", "==", false),
      where("userDorm", "==", adminDorm)
    );

    const unsubscribe = onSnapshot(dormerQuery, (querySnapshot) => {
        const dormers = [];
        querySnapshot.forEach((dormer)=>{
            dormers.push(dormer.data());
        });

        setDormers(dormers);
    });

    return unsubscribe;

}