import { useEffect, useState } from "react";
import SelectDifficultyScreen from "../../common/screens/SelectDifficulty";
import EndScreenFlag from "../../common/screens/endScreen";
import PopulationGame from "./game";

export default function Population() {
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [xpWon, setXpWon] = useState(0);
  const [hardcore, setHardcore] = useState(false);
  const [endlessMode, setEndlessMode] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {!finished && !difficultySelected && (
        <SelectDifficultyScreen
          setDifficulty={setDifficulty}
          setDifficultySelected={setDifficultySelected}
          setEndlessMode={setEndlessMode}
          endlessMode={endlessMode}
          hardcore={hardcore}
          setHardcore={setHardcore}
          alt="population"
          image="people"
          title="Welcome to the population game !"
          subtitle="You will have to guess which of the two countries has the largest population"
        />
      )}
      {!finished && difficultySelected && (
        <PopulationGame
          score={score}
          setScore={setScore}
          setFinished={setFinished}
          difficulty={difficulty}
          endless={endlessMode}
          hardcore={hardcore}
          setXpWon={setXpWon}
        />
      )}
      {finished && (
        <EndScreenFlag
          setDifficultySelected={setDifficultySelected}
          setFinished={setFinished}
          setScore={setScore}
          setXpWon={setXpWon}
          xpWon={xpWon}
          score={score}
        />
      )}
    </div>
  );
}
