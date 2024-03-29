import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";

export function PlayerCard({ user, level }) {
  return (
    <>
      {user && level && (
        <>
          {user.isAnonymous ? (
            <h1 className="italic font-semibold text-primary">
              You are not logged in
            </h1>
          ) : (
            <Link to="/user" className="md:ml-6 flex justify-end items-center">
              <img
                src={user.photoURL ? user.photoURL : "images/avatar.png"}
                alt="avatar"
                className="rounded-full lg:mr-8 dark:shadow-white min-w-[30px] dark:shadow-sm"
                width="50"
                referrerPolicy="no-referrer"
              />

              <div className="lg:flex hidden justify-center items-center mr-8 md:flex-col">
                <p className=" text-end">
                  <span className="font-semibold dark:text-lightBackground">
                    {user.displayName}
                  </span>
                  <span className="font-normal dark:text-lightBackground">
                    {" "}
                    - Level {level.level}
                  </span>
                </p>
                <ProgressBar
                  completed={level.percentageLevel}
                  bgColor="#0E94D7"
                  className="w-full"
                  height="3px"
                  customLabel=" "
                />
                <p className="italic text-primary font-normal text-xs mt-2">
                  {Math.floor(level.xpToNextLevel - level.xp)}xp until next
                  level
                </p>
              </div>
              <img
                src={`icons/Ranks/${level.rank}.png`}
                className="lg:block hidden "
                alt={level.rank}
                width={40}
                title={level.rank}
              />
            </Link>
          )}
        </>
      )}
    </>
  );
}
