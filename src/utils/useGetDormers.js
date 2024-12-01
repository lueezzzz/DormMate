import { db } from "../firebase/db";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default async function getDormers(setDormers, adminDorm) {
  const dormerQuery = query(
    collection(db, "users"),
    where("isAdmin", "==", false),
    where("userDorm", "==", adminDorm)
  );

  const unsubscribe = onSnapshot(dormerQuery, (querySnapshot) => {
    const dormers = [];
    querySnapshot.forEach((doc) => {
      dormers.push({
        uID: doc.id,
        ...doc.data(),
      });
    });

    setDormers(dormers);
  });

  return unsubscribe;
}
