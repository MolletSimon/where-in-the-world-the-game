import { doc, getDoc } from "firebase/firestore";
import ProgressBar from "@ramonak/react-progress-bar";

export function PlayerCard(props) {
  return (
    <>
      {props.user && props.level && (
        <div className="mt-28 mr-16 w-full flex justify-end items-center">
          <img
            src={
              props.user.photoURL ? props.user.photoURL : "images/avatar.png"
            }
            alt="photo"
            className="rounded-full mr-8"
            width="50"
          />

          <div className="flex justify-center items-center mr-8 flex-col">
            <p className="text-end">
              <span className="font-semibold">{props.user.displayName}</span>
              <span className="font-normal"> - Level {props.level.level}</span>
            </p>
            <ProgressBar
              completed={props.level.xp / props.level.xpToNextLevel}
              bgColor="#0E94D7"
              className="w-full"
              height="3px"
              customLabel=" "
            />
            <p className="italic text-primary font-normal text-xs mt-2">
              {props.level.xpToNextLevel}xp until next level
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export async function getLevels(db, uid) {
  return await getDoc(doc(db, "levels", uid));
}
