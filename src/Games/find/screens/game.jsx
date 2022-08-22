import { useState } from "react";
import { useEffect } from "react";
import { Button } from "../../../components/Utils/Button";
import Loader from "../../../components/Utils/Loader";
import Subtitle from "../../../components/Utils/Subtitle";
import { getCountries } from "../../../services/countries/getCountries";
import Flip from "react-reveal/Flip";
import ToastContainerTopRight from "../../../components/Utils/ToastContainerTopRight";
import getCountriesFromLetter from "../services/getCountriesFromLetter";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useInterval } from "../../../utils/hooks/useInterval";
import { Timer } from "../../common/components/game/Timer";
import { Round } from "../../common/components/game/Round";
import { Buttons } from "../../common/components/finish/Buttons";
import { updateLevel } from "../../../services/levels/updateLevel";
import { serverTimestamp } from "firebase/firestore";
import { saveGame } from "../../../services/user/saveGame";

export default function Game({ setScore, score, setFinished, setXpWon }) {
  const [countriesInGame, setCountriesInGame] = useState([]);
  const [loading, setLoading] = useState(false);
  const [guess, setGuess] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [renderState, setRenderState] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCountriesFromLetter().then((countries) => {
      setSeconds(countries.length * 6);
      setSecondsLeft(countries.length * 6);
      setCountriesInGame(countries);
      setLoading(false);
    });
  }, []);

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
      (countriesInGame.findIndex(
        (c) => c.name.common.toLowerCase() == guess.toLowerCase()
      ) +
        1) *
      2;
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
          <Subtitle
            text={`Find all the countries that start with the letter 
            ${countriesInGame[0].name.common.substring(0, 1)}`}
          />
          <div className="w-full flex justify-center items-center mt-8">
            <input
              className="sm:w-3/5 w-4/5 p-2 sm:p-4 border-[1px] shadow-lg rounded-xl text-primary"
              type="text"
              onKeyDown={(e) => handleKeyDown(e)}
              value={guess}
              name=""
              id=""
              onChange={(e) => {
                setGuess(e.target.value);
              }}
            />
            <div
              onClick={search}
              className="sm:p-4 p-2 cursor-pointer bg-primary rounded-xl flex items-center sm:ml-6 ml-2 border"
            >
              <span className="material-symbols-outlined text-white">done</span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 sm:w-4/5 ml-auto mr-auto mt-10 flex-wrap">
            {countriesInGame.map((country, index) => (
              <div
                key={index}
                className="border-2 sm:min-w-52 sm:min-h-28 sm:p-6 p-3 flex items-center justify-center rounded-xl text-center"
              >
                {country.found ? (
                  <Flip>
                    <img
                      src={country.flags.png}
                      className="h-5 max-h-5 sm:max-h-10 sm:h-10 mr-4 object-cover rounded-md"
                      alt="flag"
                    />
                    <p className="sm:font-semibold text-md sm:text-lg">
                      {country.name.common}
                    </p>
                  </Flip>
                ) : (
                  <>
                    <span className="material-symbols-outlined">password</span>
                  </>
                )}
              </div>
            ))}
          </div>

          {!endGame ? (
            <div className="flex justify-evenly w-/5 ml-auto mr-auto mt-20 items-center">
              <div
                className="hidden xl:flex justify-center text-center 
              items-center border-2 shadow-md border-primary dark:border-white
            shadow-primary dark:shadow-white -skew-x-6 rounded-md h-20 min-w-28 p-8 
            text-primary dark:text-white font-bold"
              >
                <h2 className="font-bold text-primary dark:text-white lg:text-2xl">
                  Time left : {secondsLeft}sec
                </h2>
                <h1 className="m-3">/</h1>
                <h2 className="font-bold text-primary dark:text-white lg:text-2xl">
                  Score: {score}pts
                </h2>
              </div>
            </div>
          ) : (
            <div className="flex justify-center w-2/5 ml-auto mr-auto mt-20 items-center">
              <Button text={"Finish game !"} method={finishGame} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
