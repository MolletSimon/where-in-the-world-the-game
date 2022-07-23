import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Subtitle from "../../../components/Utils/Subtitle";
import Title from "../../../components/Utils/Title";
import { getLevels } from "../../../services/levels/getLevels";
import ActualLevel from "../components/finish/actualLevel";
import { Buttons } from "../components/finish/Buttons";

export default function EndScreen({
  score,
  setFinished,
  setDifficultySelected,
  setScore,
  xpWon,
  setXpWon,
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
    setXpWon(0);
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] justify-around">
      <Title text="Game over !" />
      <div className="lg:w-1/2">
        <Subtitle text={`Your score is ${score}/10`} />
        <ActualLevel level={level}></ActualLevel>
        <Subtitle
          text={`Congratulations : You have won ${Math.floor(xpWon)}xp`}
        />
      </div>
      <Buttons navigate={navigate} newGame={newGame}></Buttons>
    </div>
  );
}
