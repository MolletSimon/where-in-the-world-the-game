import { useEffect, useState } from "react";
import EndScreen from "../../common/screens/endScreen";
import Game from "./game";

export default function Find() {
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [xpWon, setXpWon] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {finished && (
        <EndScreen
          setFinished={setFinished}
          setXpWon={setXpWon}
          xpWon={xpWon}
          score={score}
          setScore={setScore}
        />
      )}
      {!finished && (
        <Game
          setFinished={setFinished}
          setXpWon={setXpWon}
          xpWon={xpWon}
          score={score}
          setScore={setScore}
        />
      )}
    </div>
  );
}
