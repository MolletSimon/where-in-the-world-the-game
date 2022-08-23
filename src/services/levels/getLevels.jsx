import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export async function getLevels() {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const uid = auth.currentUser.uid;
  const displayName = auth.currentUser.displayName;
  const photoUrl = auth.currentUser.photoURL;

  if ((await getDoc(doc(db, "levels", uid))).exists()) {
    var levels = await getDoc(doc(db, "levels", uid));
    var data = levels.data();
    if (!data.displayName || !data.photoURL) {
      await updateDoc(levels.ref, {
        displayName: displayName,
        photoUrl: photoUrl,
      });
    }
    return await getDoc(doc(db, "levels", uid));
  } else {
    const levelRef = collection(db, "levels");
    await setDoc(doc(levelRef, uid), {
      level: 1,
      userId: uid,
      xp: 1,
      displayName: displayName,
      photoUrl: photoUrl,
      xpToNextLevel: 100,
      xpToPreviousLevel: 1,
      percentageLevel: 1,
      rank: "newbie",
    });
    return await getDoc(doc(db, "levels", uid));
  }
}
