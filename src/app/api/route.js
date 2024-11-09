import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";

export async function GET(request) {
  try {
    const itemsCollection = collection(db, "parks");
    const itemsSnapshot = await getDocs(itemsCollection);
    const items = itemsSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return new Response(JSON.stringify(items), { status: 200 });
  } catch (error) {
    return new Response("Error fetching data", { status: 500 });
  }
}
