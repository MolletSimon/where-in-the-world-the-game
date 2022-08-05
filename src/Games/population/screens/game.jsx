// react
import { useEffect, useState } from "react";

// services and utils
import { toast } from "react-toastify";
import { getCountries } from "../../../services/countries/getCountries";
import getDataByDifficulty from "../../common/utils/getDataByDifficulty";
import { prepareCountriesPopulationArray } from "../../common/utils/prepareCountriesArray";
import { updateLevel } from "../../../services/levels/updateLevel";
import { useInterval } from "../../../utils/hooks/useInterval";
import { saveGame } from "../../../services/user/saveGame";
import { serverTimestamp } from "firebase/firestore";

// components
import { Button } from "../../../components/Utils/Button";
import Loader from "../../../components/Utils/Loader";
import { Timer } from "../../common/components/game/Timer";
import ProgressBar from "@ramonak/react-progress-bar";
import { Round } from "../../common/components/game/Round";
import { AnswerCardPopulation } from "../components/game/AnswerCardPopulation";
import ToastContainerTopRight from "../../../components/Utils/ToastContainerTopRight";

export default function PopulationGame({
  score,
  setScore,
  setFinished,
  difficulty,
  setXpWon,
}) {
  // game
  const [countriesInGame, setCountriesInGame] = useState([]);
  const [round, setRound] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [seconds, setSeconds] = useState(60);
  const numberRound = 10;
  const numberPropositions = 4;

  // status
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    switch (difficulty) {
      case 2:
        setSecondsLeft(45);
        setSeconds(45);
        break;
      case 3:
        setSecondsLeft(30);
        setSeconds(30);
        break;
      default:
        setSecondsLeft(60);
        setSeconds(60);
        break;
    }

    getCountries()
      .then((data) => {
        let c = getDataByDifficulty(data, difficulty);
        setCountriesInGame(
          prepareCountriesPopulationArray(c, numberRound, numberPropositions)
        );
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  const submit = (i) => {
    if (!answered) {
      setAnswered(true);

      if (isTheRightAnswer(i)) {
        toast.success("Good answer !");
        setScore(score + 1);
      } else {
        toast.error("Bad answer");
      }
    }
  };

  const finish = () => {
    setXpWon((state) => {
      state = score * (difficulty * 2.6);
      const game = {
        game: "Population",
        score: score,
        difficulty: difficulty,
        time: seconds - secondsLeft,
        xpWon: state,
        date: serverTimestamp(),
      };
      saveGame(game);
      updateLevel(state);
      return state;
    });
    setFinished(true);
  };

  useInterval(() => {
    if (secondsLeft > 0) setSecondsLeft(secondsLeft - 1);
    else finish();
  }, 1000);

  const next = () => {
    if (answered) {
      if (round < numberRound - 1) {
        setRound(round + 1);
      } else {
        finish();
      }
    } else {
      toast.error("Please select an answer !");
    }

    setAnswered(false);
  };

  const isTheRightAnswer = (index) => {
    return (
      countriesInGame[round][index] ==
      countriesInGame[round].find(
        (c) =>
          c.population ===
          Math.max(...countriesInGame[round].map((o) => o.population))
      )
    );
  };

  return (
    <div className="min-h-[100vh] bg-lightBackground dark:bg-darkBackground">
      <div className="flex flex-col justify-center items-center">
        <ToastContainerTopRight />

        {loading ? (
          <Loader />
        ) : (
          <div className="min-h-[70vh] grid grid-cols-2 grid-rows-2 justify-center w-full">
            {countriesInGame.length > 0 &&
              countriesInGame[round].map((c, index) => (
                <AnswerCardPopulation
                  key={index}
                  answered={answered}
                  submit={submit}
                  isTheRightAnswer={isTheRightAnswer}
                  c={c}
                  index={index}
                ></AnswerCardPopulation>
              ))}
          </div>
        )}

        <div className="mt-4 flex justify-evenly w-full items-center">
          <Timer seconds={seconds} />
          <ProgressBar
            completed={secondsLeft}
            maxCompleted={seconds}
            className="w-[250px] md:w-3/5 xl:hidden"
            bgColor="#0E94D7"
            customLabel=" "
            height="6px"
          />
          <div className="w-1/3">
            <Button
              background="#0E94D7"
              color="white"
              method={next}
              text={"Next"}
            />
          </div>
          <Round round={round} numberRound={numberRound} />
        </div>
        <div className="xl:hidden w-full flex justify-center items-center">
          <p className="font-bold text-primary">
            {round + 1}/{numberRound}
          </p>
        </div>
      </div>
    </div>
  );
}
