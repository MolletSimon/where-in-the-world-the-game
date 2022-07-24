import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export async function saveGame(game) {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const uid = auth.currentUser.uid;

  game.userId = uid;

  await addDoc(collection(db, "games"), game);
}
