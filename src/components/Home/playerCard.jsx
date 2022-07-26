import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";

export function PlayerCard({ user, level }) {
  return (
    <>
      {user && level && (
        <Link to="/user" className="ml-6 flex justify-end items-center">
          <img
            src={user.photoURL ? user.photoURL : "images/avatar.png"}
            alt="avatar"
            className="rounded-full mr-8"
            width="50"
          />

          <div className="flex justify-center items-center mr-8 md:flex-col">
            <p className=" text-end">
              <span className="font-semibold">{user.displayName}</span>
              <span className="font-normal"> - Level {level.level}</span>
            </p>
            <ProgressBar
              completed={level.percentageLevel}
              bgColor="#0E94D7"
              className="w-full"
              height="3px"
              customLabel=" "
            />
            <p className="italic text-primary font-normal text-xs mt-2">
              {Math.floor(level.xpToNextLevel - level.xp)}xp until next level
            </p>
          </div>
          <img
            src={`icons/ranks/${level.rank}.png`}
            alt={level.rank}
            width={40}
            title={level.rank}
          />
        </Link>
      )}
    </>
  );
}
