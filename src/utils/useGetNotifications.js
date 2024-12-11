import { auth } from "../firebase/auth";
import { db } from "../firebase/db";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function getNotifications(onNotificationsChange) {
    const { uid } = auth.currentUser;
    console.log(auth.currentUser);

    const getNotificationsQuery = query(
        collection(db, "notifications"),
        where("dormerID", "==", uid)
    );

    // Using onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(getNotificationsQuery, (querySnapshot) => {
        const notifications = [];
        querySnapshot.forEach((doc) => {
            notifications.push({ ...doc.data(), ...{ id: doc.id } });
        });
        console.log("user notifs are: ", notifications);

        onNotificationsChange(notifications);
    });

    return unsubscribe;
}
