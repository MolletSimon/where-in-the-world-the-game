import {
  collection,
  doc,
  getDoc,
  setDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export async function updateLevel(xpWon) {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const uid = auth.currentUser.uid;

  await getDoc(doc(db, "levels", uid)).then((res) => {
    let level = res.data();
    let data = {};

    if (xpWon >= level.xpToNextLevel - level.xp) {
      // update level
      data.xpToNextLevel = level.xpToNextLevel * 2 * 1.2;
      data.xp = level.xp + xpWon;
      data.level = level.level + 1;
    } else {
      data.xp = level.xp + xpWon;
    }

    const levelRef = doc(db, "levels", uid);
    updateDoc(levelRef, data);
  });
}
