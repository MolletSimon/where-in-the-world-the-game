import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export async function updateLevel(xpWon) {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const uid = auth.currentUser.uid;

  if (auth.currentUser.isAnonymous) return;
  await getDoc(doc(db, "levels", uid)).then((res) => {
    let level = res.data();
    let data = {};

    if (xpWon >= level.xpToNextLevel - level.xp) {
      // update level
      data.xpToNextLevel = (level.xpToNextLevel + 150) * 1.2;
      data.xpToPreviousLevel = level.xpToNextLevel;

      data.xp = level.xp + xpWon;
      data.level = level.level + 1;

      data.newLevel = true;

      if (data.newLevel) {
        if ([4, 8, 11, 16, 21].includes(data.level)) {
          data.newRank = true;
          switch (true) {
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
          data.newRank = false;
        }
      }
    } else {
      data.xp = level.xp + xpWon;
      data.newLevel = false;
      data.newRank = false;
      data.xpToNextLevel = level.xpToNextLevel;
      data.xpToPreviousLevel = level.xpToPreviousLevel;
    }

    data.percentageLevel =
      ((data.xp - data.xpToPreviousLevel) /
        (data.xpToNextLevel - data.xpToPreviousLevel)) *
      100;

    const levelRef = doc(db, "levels", uid);
    updateDoc(levelRef, data);
  });
}
