import { useState } from "react";
import EndScreenPopulation from "./finishPopulation";
import PopulationGame from "./game";
import StartPopulation from "./startPopulation";

export default function Population() {
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [xpWon, setXpWon] = useState(0);

  return (
    <div>
      {!finished && !difficultySelected && (
        <StartPopulation
          setDifficulty={setDifficulty}
          setDifficultySelected={setDifficultySelected}
        />
      )}
      {!finished && difficultySelected && <PopulationGame />}
      {finished && <EndScreenPopulation />};
    </div>
  );
}
