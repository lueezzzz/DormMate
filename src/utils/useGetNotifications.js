import { auth } from "../firebase/auth";
import { db } from "../firebase/db";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function getNotifications(onNotificationsChange) {
    const { uid } = auth.currentUser;
    console.log(auth.currentUser);

    const getNotificationssQuery = query(
        collection(db, "notifications"),
        where("dormerID", "==", uid)
    );

    // Using onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(getNotificationssQuery, (querySnapshot) => {
        const notifications = [];
        querySnapshot.forEach((doc) => {
            notifications.push({ ...doc.data(), ...{ id: doc.id } });
        });
        onNotificationsChange(notifications);
    });

    return unsubscribe;
}
