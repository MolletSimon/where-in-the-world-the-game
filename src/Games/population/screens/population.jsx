import { useState } from "react";
import SelectDifficultyScreen from "../../components/SelectDifficulty";
import EndScreenFlag from "../../flag/screens/finishFlag";
import EndScreenPopulation from "./finishPopulation";
import PopulationGame from "./game";

export default function Population() {
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [xpWon, setXpWon] = useState(0);

  return (
    <div>
      {!finished && !difficultySelected && (
        <SelectDifficultyScreen
          setDifficulty={setDifficulty}
          setDifficultySelected={setDifficultySelected}
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
          xpWon={xpWon}
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
