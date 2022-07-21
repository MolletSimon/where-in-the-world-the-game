import {
  collection,
  doc,
  getDoc,
  setDoc,
  getFirestore,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export async function getLevels() {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const uid = auth.currentUser.uid;

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
