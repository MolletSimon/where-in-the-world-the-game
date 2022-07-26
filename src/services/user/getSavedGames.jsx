import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export async function getSavedGames() {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const uid = auth.currentUser.uid;

  const q = query(collection(db, "games"), where("userId", "==", uid));
  return await getDocs(q);
}
