import {
  collection,
  doc,
  getDoc,
  setDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { getApp } from "firebase/app";

export async function setLevel(uid, xpWon) {
  const app = getApp();
  const db = getFirestore(app);

  await getDoc(doc(db, "levels", uid)).then((res) => {
    let level = res.data();
    let data = {};

    if (xpWon >= level.xpToNextLevel - level.xp) {
      // update level
      data.xpToNextLevel = level.xpToNextLevel * 2 * 1.3;
      data.xp = level.xp + xpWon;
      data.level = level.level + 1;
    } else {
      data.xp = level.xp + xpWon;
    }

    const levelRef = doc(db, "levels", uid);
    updateDoc(levelRef, data);
  });
}
