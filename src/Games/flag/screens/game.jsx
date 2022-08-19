import { useEffect, useState } from "react";
import { useInterval } from "../../../utils/hooks/useInterval";
import { toast } from "react-toastify";
import { Button } from "../../../components/Utils/Button";
import Loader from "../../../components/Utils/Loader";
import ToastContainerTopRight from "../../../components/Utils/ToastContainerTopRight";
import { updateLevel } from "../../../services/levels/updateLevel";
import getDataByDifficulty from "../../common/utils/getDataByDifficulty";
import prepareCountriesArray from "../../common/utils/prepareCountriesArray";
import { getCountries } from "../../../services/countries/getCountries";
import { Answers } from "../components/game/Answers";
import { Question } from "../components/game/Question";
import { saveGame } from "../../../services/user/saveGame";
import { serverTimestamp } from "firebase/firestore";

export default function FlagGame({
  setFinished,
  difficulty,
  score,
  setScore,
  xpWon,
  setXpWon,
}) {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [countriesInGame, setCountriesInGame] = useState([]);
  const [round, setRound] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [numberRound, setNumberRound] = useState(10);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [seconds, setSeconds] = useState(0);
  const [numberPropositions, setNumberPropositions] = useState(4);

  const initGame = (data) => {
    data = getDataByDifficulty(data, difficulty);

    switch (difficulty) {
      case 2:
        setSecondsLeft(60);
        setSeconds(60);
        break;
      case 3:
        setSecondsLeft(50);
        setSeconds(50);
        break;
      default:
        setSecondsLeft(60);
        setSeconds(60);
        break;
    }
    let countriesArray = prepareCountriesArray(
      data,
      numberRound,
      numberPropositions,
      "flag"
    );
    setCountriesInGame(countriesArray);
  };

  const submit = (index) => {
    setSubmitted(true);
    if (
      countriesInGame[round].propositions.findIndex((p) => p.right) === index
    ) {
      toast.success("Good answer !");
      setScore((state) => {
        state = score + 1;
        if (round >= numberRound - 1) {
          finish(state);
        }
        return state;
      });
    } else {
      toast.error("Wrong answer 😔");
      if (round >= numberRound - 1) {
        finish(score);
      }
    }
  };

  const next = () => {
    setSubmitted(false);
    if (round < numberRound - 1) setRound(round + 1);
  };

  const finish = (_score) => {
    setXpWon((state) => {
      state = _score * (difficulty * 2);
      updateLevel(state);
      const game = {
        game: "Flag",
        score: _score,
        difficulty: difficulty,
        time: seconds - secondsLeft,
        xpWon: state,
        date: serverTimestamp(),
      };
      saveGame(game);
      return state;
    });
    setFinished(true);
  };

  useEffect(() => {
    getCountries()
      .then((data) => {
        console.log(data);
        initGame(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useInterval(() => {
    if (secondsLeft > 0) setSecondsLeft(secondsLeft - 1);
    else finish(score);
  }, 1000);

  return (
    <div className="min-h-[100vh] dark:bg-darkBackground">
      <div className="max-h-[95%]">
        {loading ? (
          <Loader label="The game is loading.." />
        ) : (
          <div>
            {countriesInGame.length > 0 && (
              <div className="flex justify-center flex-col items-center pt-16">
                <Question
                  secondsLeft={secondsLeft}
                  seconds={seconds}
                  countriesInGame={countriesInGame}
                  numberRound={numberRound}
                  round={round}
                />

                <Answers
                  countriesInGame={countriesInGame}
                  round={round}
                  select={submit}
                  selected={selected}
                  submitted={submitted}
                />
                <div className="w-1/3 flex">
                  <Button
                    background="#0E94D7"
                    color="white"
                    method={next}
                    text={"Next"}
                  />
                </div>
                <div className="xl:hidden mt-6 w-full flex justify-center items-center">
                  <p className="font-bold text-2xl text-primary dark:text-cyan-800">
                    {round + 1}/{numberRound}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        <ToastContainerTopRight />
      </div>
    </div>
  );
}
