import { useState } from "react";
import EndScreen from "../../common/screens/endScreen";
import SelectDifficultyScreen from "../../common/screens/SelectDifficulty";
import InvestigationGame from "./game";

export default function Investigation() {
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
          alt="investigation"
          image="search"
          title="Welcome to the investigation game !"
          subtitle="Guess the country from the clues given to you"
          easyText="Easy : guess from subregion, capital, languages and many other clues"
          mediumText="Medium : guess from currency, region, UTC, international ciruclation mark"
          hardText="Hard : guess from borders, area, top-level domain"
        />
      )}
      {!finished && difficultySelected && (
        <InvestigationGame
          difficulty={difficulty}
          score={score}
          setFinished={setFinished}
          setScore={setScore}
          setXpWon={setXpWon}
          xpWon={xpWon}
        />
      )}
      {finished && (
        <EndScreen
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
