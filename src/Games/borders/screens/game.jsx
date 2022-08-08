// react
import { useEffect, useRef, useState } from "react";

// components
import Loader from "../../../components/Utils/Loader";
import { Question } from "../components/Question";
import { PopupBorders } from "../components/PopupBorders";
import { Propositions } from "../components/Propositions";
import { NumberTravel } from "../components/NumberTravel";

// services and utils
import { getCountries } from "../../../services/countries/getCountries";
import getDatasBorders from "../utils/getDatasBorders";
import addBorderNames from "../utils/addBorderNames";
import { useInterval } from "../../../utils/hooks/useInterval";
import { updateLevel } from "../../../services/levels/updateLevel";
import { saveGame } from "../../../services/user/saveGame";

// firebase
import { serverTimestamp } from "firebase/firestore";
import { Map } from "../components/Map";

export default function BorderGame({ score, setScore, setXpWon, setFinished }) {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [numberTurn, setNumberTurn] = useState(0);
  const [roundFinished, setRoundFinished] = useState(false);
  const [goodAnswer, setGoodAnswer] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [secondsRound, setSecondsRound] = useState(45);
  const [currentCountry, setCurrentCountry] = useState({});
  const [round, setRound] = useState(0);
  const mapChildRef = useRef();

  useEffect(() => {
    getDatasBorders().then((data) => {
      setPaths((state) => {
        state = data;
        setCurrentCountry(data[0].start);
        return state;
      });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  useInterval(() => {
    if (secondsLeft > 0) {
      setSecondsLeft(secondsLeft - 1);
    } else {
      if (!roundFinished) {
        setRoundFinished(true);
        setGoodAnswer(false);
        finish();
      }
    }
  }, 1000);

  const next = () => {
    setRound((state) => {
      if (state === 4) {
        finishGame();
      } else {
        state = round + 1;
        let newCountry = paths[state]?.start;
        setCurrentCountry(newCountry);
        mapChildRef.current.flyTo(newCountry.latlng[0], newCountry.latlng[1]);
        return state;
      }
    });
    setNumberTurn(0);
    setSecondsLeft(45);
    setRoundFinished(false);
  };

  const answer = (name) => {
    let newCountry = countries.find((c) => c.name.common === name);
    setNumberTurn(numberTurn + 1);
    newCountry = addBorderNames(newCountry, countries);
    setCurrentCountry(newCountry);
    console.log(newCountry);
    mapChildRef.current.flyTo(newCountry.latlng[0], newCountry.latlng[1]);

    if (newCountry.cca3 == paths[round].end.cca3) {
      setGoodAnswer(true);
      setScore(score + (20 - numberTurn));
      setSecondsRound(45 - secondsLeft);
      setRoundFinished(true);
      finish();
    }

    if (numberTurn >= 19) {
      setGoodAnswer(false);
      setRoundFinished(true);
      finish();
    }
  };

  const finishGame = () => {
    setXpWon((state) => {
      state = score;
      updateLevel(state);
      const game = {
        game: "Borders",
        score: score,
        difficulty: 1,
        time: "No Time",
        xpWon: state,
        date: serverTimestamp(),
      };
      saveGame(game);
      return state;
    });
    setFinished(true);
  };

  const finish = () => {
    document.getElementById("trigger-button")?.click();
  };

  return (
    <div className="min-h-[100vh] bg-lightBackground dark:bg-darkBackground">
      {loading && paths.length === 0 ? (
        <Loader />
      ) : (
        <div className="overflow-x-hidden">
          <Question
            currentCountry={currentCountry}
            paths={paths}
            round={round}
          />

          <PopupBorders
            numberTurn={numberTurn}
            goodAnswer={goodAnswer}
            secondsRound={secondsRound}
            next={next}
          ></PopupBorders>

          <Map
            mapChildRef={mapChildRef}
            paths={paths}
            round={round}
            secondsLeft={secondsLeft}
          />
          <NumberTravel numberTurn={numberTurn}></NumberTravel>
          <Propositions
            length={countries.length}
            currentCountry={currentCountry}
            answer={answer}
          ></Propositions>
        </div>
      )}
    </div>
  );
}
