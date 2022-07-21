import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Subtitle from "../../../components/Utils/Subtitle";
import Title from "../../../components/Utils/Title";
import { getLevels } from "../../../services/levels/getLevels";
import ActualLevel from "../components/finishFlag/actualLevel";
import { Buttons } from "../components/finishFlag/Buttons";

export default function EndScreenFlag({
  score,
  setFinished,
  setDifficultySelected,
  setScore,
}) {
  const [level, setLevel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getLevels().then((res) => {
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
        <ActualLevel level={level}></ActualLevel>
      </div>
      <Buttons navigate={navigate} newGame={newGame}></Buttons>
    </div>
  );
}
