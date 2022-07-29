import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getApp } from "firebase/app";

export async function getSavedGames(uid) {
  const app = getApp();
  const db = getFirestore(app);

  const q = query(
    collection(db, "games"),
    where("userId", "==", uid),
    orderBy("date", "desc"),
    limit(5)
  );
  return await getDocs(q);
}
