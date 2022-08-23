import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { getApp } from "firebase/app";

export async function getAllLevels() {
  const app = getApp();
  const db = getFirestore(app);

  const q = query(collection(db, "levels"), orderBy("level", "desc"));
  var docsQuery = await getDocs(q);
  return docsQuery;
}
