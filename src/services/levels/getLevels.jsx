import {
  collection,
  doc,
  getDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { getApp } from "firebase/app";

export async function getLevels(uid) {
  const app = getApp();
  const db = getFirestore(app);
  if ((await getDoc(doc(db, "levels", uid))).exists()) {
    return await getDoc(doc(db, "levels", uid));
  } else {
    const levelRef = collection(db, "levels");
    await setDoc(doc(levelRef, uid), {
      level: 1,
      userId: uid,
      xp: 1,
      xpToNextLevel: 100,
    });
    return await getDoc(doc(db, "levels", uid));
  }
}
