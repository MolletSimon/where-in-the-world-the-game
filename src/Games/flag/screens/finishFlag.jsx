import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Utils/Button";
import Subtitle from "../../../components/Utils/Subtitle";
import Title from "../../../components/Utils/Title";
import { getLevels } from "../../../services/levels/getLevels";

export default function EndScreenFlag({
  score,
  setFinished,
  setDifficultySelected,
  setScore,
}) {
  const [level, setLevel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getLevels("ith5eKBws9U93nVOmzUsl0I1viM2").then((res) => {
      setLevel(res.data());
    });
  }, []);

  const newGame = () => {
    setFinished(false);
    setDifficultySelected(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] justify-around">
      <Title text="Game over !" />
      <div className="w-1/2">
        <Subtitle text={`Your score is ${score}/10`} />
        <div className="">
          {level && (
            <>
              {" "}
              <Subtitle text={`Level ${level.level}`} />{" "}
              <ProgressBar
                completed={(level.xp / level.xpToNextLevel) * 100}
                bgColor="#0E94D7"
                className="w-full mt-2"
                height="25px"
                customLabel={`${Math.floor(level.xp)}xp`}
                animateOnRender={true}
              />
              <h3 className="text-center text-primary mt-2">
                {Math.floor(level.xpToNextLevel - level.xp)}xp until next level
              </h3>{" "}
            </>
          )}
        </div>
      </div>
      <div className="mt-24 w-1/3 h-full justify-end">
        <Button
          background="#0E94D7"
          color="white"
          text="Play new game"
          method={newGame}
        />
        <Button
          background="white"
          color="black"
          text="Return to home page"
          method={() => navigate("/select-game")}
        />
      </div>
    </div>
  );
}
