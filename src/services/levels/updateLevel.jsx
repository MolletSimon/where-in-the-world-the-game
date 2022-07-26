import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
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

      switch (data.level) {
        case data.level <= 3:
          data.rank = "newbie";
          break;
        case data.level <= 7 && data.level > 3:
          data.rank = "rookie";
          break;
        case data.level <= 10 && data.level > 7:
          data.rank = "geostudent";
          break;
        case data.level <= 15 && data.level > 10:
          data.rank = "teacher";
          break;
        case data.level <= 20 && data.level > 15:
          data.rank = "globetrotter";
          break;
        case data.level > 20:
          data.rank = "master";
          break;
        default:
          data.rank = "newbie";
          break;
      }
    } else {
      data.xp = level.xp + xpWon;
    }

    const levelRef = doc(db, "levels", uid);
    updateDoc(levelRef, data);
  });
}
