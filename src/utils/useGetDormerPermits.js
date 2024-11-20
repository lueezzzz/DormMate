import { auth } from "../firebase/auth";
import { db } from "../firebase/db";
import { collection, query, where, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
import getDormersByUID from "./useGetDormersByUID";

export default async function getDormerPermits(onPermitsChange) {
    const { uid } = auth.currentUser;
    const dormManagerDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(dormManagerDocRef)
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let adminDorm = docSnap.data().userDorm
    } else {
        console.log("Dorm manager account does not exist!");
    }
    const dormersID = await getDormersByUID("balayLampirong")
    console.log("dormers id are: ", dormersID);

    const getPermitsQuery = query(
        collection(db, "permits"),
        where("dormerID", "in", dormersID)
    );
    // const dormerPermits = []
    // const querySnapshot = await getDocs(getPermitsQuery);
    // querySnapshot.forEach((doc) => {
    //     dormerPermits.push(doc.data())
    // });
    // return dormerPermits;
    const unsubscribe = onSnapshot(getPermitsQuery, (querySnapshot) => {
        const dormerPermits = [];
        querySnapshot.forEach((doc) => {
            dormerPermits.push({ ...doc.data(), ...{ permitID: doc.id } });
        });
        console.log("user permits are: ", dormerPermits);

        onPermitsChange(dormerPermits);
    });

    return unsubscribe;
}
