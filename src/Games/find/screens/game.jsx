import { useState } from "react";
import { useEffect } from "react";
import { Button } from "../../../components/Utils/Button";
import Loader from "../../../components/Utils/Loader";
import ToastContainerTopRight from "../../../components/Utils/ToastContainerTopRight";
import getCountriesFromLetter from "../services/getCountriesFromLetter";
import { toast } from "react-toastify";
import { useInterval } from "../../../utils/hooks/useInterval";
import { updateLevel } from "../../../services/levels/updateLevel";
import { serverTimestamp } from "firebase/firestore";
import { saveGame } from "../../../services/user/saveGame";
import { HeaderTitle } from "../components/HeaderTitle";
import { AnswerCardFind } from "../components/AnswerCardFind";
import { FooterFind } from "../components/FooterFind";

export default function Game({ setScore, score, setFinished, setXpWon }) {
  const [countriesInGame, setCountriesInGame] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guess, setGuess] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [renderState, setRenderState] = useState(false);

  // Get countries and init game
  useEffect(() => {
    setLoading(true);
    getCountriesFromLetter().then((countries) => {
      setSeconds(countries.length * 6);
      setSecondsLeft(countries.length * 6);
      setCountriesInGame(countries);
      setLoading(false);
    });
  }, []);

  // Timer
  useInterval(() => {
    if (secondsLeft > 0) setSecondsLeft(secondsLeft - 1);
    else if (!endGame) finish(score);
  }, 1000);

  const finish = () => {
    countriesInGame.forEach((c) => {
      c.found = true;
    });
    setEndGame(true);
    // force rerender
    setRenderState(!renderState);
    setXpWon((state) => {
      state = score;
      updateLevel(state);
      const game = {
        game: "Find",
        score: score,
        difficulty: 1,
        time: seconds - secondsLeft,
        xpWon: state,
        date: serverTimestamp(),
      };
      saveGame(game);
      return state;
    });
  };

  const search = () => {
    const country = countriesInGame.find(
      (c) => c.name.common.toLowerCase() == guess.toLowerCase()
    );
    const points =
      countriesInGame.findIndex(
        (c) => c.name.common.toLowerCase() == guess.toLowerCase()
      ) + 1;
    if (country && !country.found) {
      country.found = true;
      toast.success(`Yay ! You won ${points}pts !`);
      setScore(score + points);
    } else {
      toast.error("Aoutch ! Wrong answer 😔");
    }

    setGuess("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") search();
  };

  const finishGame = () => {
    setScore(0);
    setFinished(true);
    setEndGame(false);
  };

  return (
    <div className="min-h-[100vh] bg-lightBackground dark:bg-darkBackground ">
      <div className="h-4"></div>
      <ToastContainerTopRight />
      {loading && <Loader />}
      {countriesInGame && countriesInGame.length > 0 && (
        <div className="sm:mt-12">
          <HeaderTitle
            countriesInGame={countriesInGame}
            guess={guess}
            handleKeyDown={handleKeyDown}
            search={search}
            setGuess={setGuess}
          />

          <div className="flex justify-center items-center gap-4 sm:w-4/5 ml-auto mr-auto mt-10 flex-wrap">
            {countriesInGame.map((country, index) => (
              <AnswerCardFind country={country} index={index} />
            ))}
          </div>

          {!endGame ? (
            <FooterFind score={score} secondsLeft={secondsLeft} />
          ) : (
            <div className="flex justify-center w-2/5 ml-auto mr-auto mt-20 items-center dark:text-lightBackground">
              <Button text={"Finish game !"} method={finishGame} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
