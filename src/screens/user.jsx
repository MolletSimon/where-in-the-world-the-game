import { useEffect, useState } from "react";
import Title from "../components/Utils/Title";
import { getSavedGames } from "../services/user/getSavedGames";
import { GamesSaved } from "../components/User/GamesSaved";
import { PlayerCard } from "../components/Home/playerCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { getLevels } from "../services/levels/getLevels";
import ProgressBar from "@ramonak/react-progress-bar";
import Subtitle from "../components/Utils/Subtitle";

export default function User({ auth }) {
  const [games, setGames] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [level, setLevel] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) navigate("/login");
      else {
        getLevels().then((res) => {
          setLevel(res.data());
        });
        navigate(location.pathname === "/" ? "select-game" : location.pathname);
      }
    }
  }, [user, loading]);

  useEffect(() => {
    let gamesFromDb = [];
    getSavedGames().then((res) => {
      res.forEach((doc) => {
        gamesFromDb.push(doc.data());
      });
      setGames(gamesFromDb);
    });
  }, []);
  return (
    <div className="flex flex-col items-center">
      <Title text="User info" />
      <GamesSaved games={games}></GamesSaved>
      {user && level && (
        <div className="flex mt-20 justify-center items-center mr-8 md:flex-col w-4/5">
          <p className="mb-6 text-end flex">
            <span className="font-semibold">{user.displayName}</span>
            <span className="font-normal"> - Level {level.level}</span>
          </p>
          <ProgressBar
            completed={(level.xp / level.xpToNextLevel) * 100}
            bgColor="#0E94D7"
            className="w-full"
            height="40px"
            customLabel={Math.floor(level.xp) + "xp"}
          />
          <p className="italic text-primary font-normal text-xs mt-6">
            {Math.floor(level.xpToNextLevel - level.xp)}xp until next level
          </p>
          <div className="mt-10 w-full justify-end items-center flex ">
            <div className="p-4 border-2 rounded-2xl w-auto flex items-center">
              <p className="italic font-regular mr-4">Rank: </p>
              <h2 className="font-bold text-3xl first-letter:uppercase">
                {level.rank} -{" "}
              </h2>
              <img
                src={`images/icons/ranks/${level.rank}.png`}
                alt={level.rank}
                width={100}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
