import { useState } from "react";
import EndScreenFlag from "./finishFlag";
import FlagGame from "./game";
import SelectDifficultyFlag from "./startFlag";

export default function Flag() {
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <>
      {finished && (
        <EndScreenFlag
          score={score}
          setFinished={setFinished}
          setDifficultySelected={setDifficultySelected}
          setScore={setScore}
        />
      )}
      {!finished && difficultySelected && (
        <FlagGame
          score={score}
          setScore={setScore}
          difficulty={difficulty}
          setFinished={setFinished}
        />
      )}
      {!finished && !difficultySelected && (
        <SelectDifficultyFlag
          setDifficultySelected={setDifficultySelected}
          setDifficulty={setDifficulty}
        />
      )}
    </>
  );
}
