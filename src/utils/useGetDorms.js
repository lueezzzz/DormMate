import { db } from "../firebase/db"
import { collection, getDocs } from "firebase/firestore";


export default async function getDorms() {
    const dorms = []
    const dormsCollectionRef = collection(db, "dormitories");
    const querySnapshot = await getDocs(dormsCollectionRef);
    
    querySnapshot.forEach((doc) => {
        const dormData = doc.data();
        dormData.image = `/dorms/${dormData.name.replace(/\s+/g, '').toLowerCase()}.PNG`; // Convert name to lowercase and remove spaces
        dorms.push(dormData);
    });
    return dorms;
}