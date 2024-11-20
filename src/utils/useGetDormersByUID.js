import { db } from "../firebase/db";
import { collection, query, where, getDocs } from "firebase/firestore";

export default async function getDormersByUID(dorm) {
    const dormersID = []
    const getDormersQuery = query(
        collection(db, "users"),
        where("userDorm", "==", dorm)
    );

    const querySnapshot = await getDocs(getDormersQuery);
    querySnapshot.forEach((doc) => {
        dormersID.push(doc.id)
    });
    return dormersID
}
