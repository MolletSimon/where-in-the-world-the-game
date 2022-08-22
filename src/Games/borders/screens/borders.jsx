import { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import EndScreen from "../../common/screens/endScreen";
import BorderGame from "./game";

export default function Borders() {
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [xpWon, setXpWon] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {finished && (
        <EndScreen
          score={score}
          setFinished={setFinished}
          setScore={setScore}
          setXpWon={setXpWon}
          xpWon={xpWon}
        />
      )}

      {!finished && (
        <BorderGame
          score={score}
          setScore={setScore}
          setFinished={setFinished}
          setXpWon={setXpWon}
        />
      )}
    </>
  );
}
