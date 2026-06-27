import { auth } from "../firebase/auth";
import { db } from "../firebase/db";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import getDormersByUID from "./useGetDormersByUID";

export default async function getDormerPermits(onPermitsChange) {
  const { uid } = auth.currentUser;
  const dormManagerDocRef = doc(db, "users", uid);
  let adminDorm = "";
  const docSnap = await getDoc(dormManagerDocRef);
  if (docSnap.exists()) {
    adminDorm = docSnap.data().userDorm;
  } else {
  }
  //const dormersID = await getDormersByUID("balayLampirong")
  const dormersID = await getDormersByUID(adminDorm);

  const getPermitsQuery = query(
    collection(db, "permits"),
    where("dormerID", "in", dormersID),
  );
  const unsubscribe = onSnapshot(getPermitsQuery, (querySnapshot) => {
    const dormerPermits = [];
    querySnapshot.forEach((doc) => {
      dormerPermits.push({ ...doc.data(), ...{ permitID: doc.id } });
    });

    onPermitsChange(dormerPermits);
  });

  return unsubscribe;
}
