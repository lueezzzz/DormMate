import { auth } from "../firebase/auth";
import { db } from "../firebase/db";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function getUserPermits(onPermitsChange) {
  const { uid } = auth.currentUser;
  const getPermitsQuery = query(
    collection(db, "permits"),
    where("dormerID", "==", uid)
  );

  // Using onSnapshot to listen for real-time updates
  const unsubscribe = onSnapshot(getPermitsQuery, (querySnapshot) => {
    const userPermits = [];
    querySnapshot.forEach((doc) => {
      userPermits.push(doc.data());
    });

    onPermitsChange(userPermits);
  });

  return unsubscribe;
}
