import { useEffect, useState } from "react";
import SelectDifficultyScreen from "../../common/screens/SelectDifficulty";
import EndScreenFlag from "../../common/screens/endScreen";
import FlagGame from "../../flag/screens/game";

export default function Capital() {
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [xpWon, setXpWon] = useState(0);
  const [endlessMode, setEndlessMode] = useState(false);
  const [hardcore, setHardcore] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {finished && (
        <EndScreenFlag
          score={score}
          setFinished={setFinished}
          setDifficultySelected={setDifficultySelected}
          setScore={setScore}
          setXpWon={setXpWon}
          xpWon={xpWon}
        />
      )}
      {!finished && difficultySelected && (
        <FlagGame
          score={score}
          setScore={setScore}
          difficulty={difficulty}
          setFinished={setFinished}
          setXpWon={setXpWon}
          xpWon={xpWon}
          hardcore={hardcore}
          endless={endlessMode}
          capitalMode={true}
        />
      )}
      {!finished && !difficultySelected && (
        <SelectDifficultyScreen
          alt="flag"
          hardcore={hardcore}
          setHardcore={setHardcore}
          image="eiffel-tower"
          setEndlessMode={setEndlessMode}
          endlessMode={endlessMode}
          title="Welcome to the capital game !"
          setDifficulty={setDifficulty}
          setDifficultySelected={setDifficultySelected}
          subtitle="You will have to guess which country correspond to the capital that will be presented to you"
        />
      )}
    </>
  );
}
