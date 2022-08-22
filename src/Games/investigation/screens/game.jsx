// react
import { useEffect, useState } from "react";

// services and utils
import { saveGame } from "../../../services/user/saveGame";
import getCountriesInvestigation from "../utils/getCountriesInvestigation";
import { serverTimestamp } from "firebase/firestore";
import { updateLevel } from "../../../services/levels/updateLevel";
import { useInterval } from "../../../utils/hooks/useInterval";
import { toast } from "react-toastify";

// components
import Loader from "../../../components/Utils/Loader";
import ToastContainerTopRight from "../../../components/Utils/ToastContainerTopRight";
import { Clues } from "../components/Clues";
import { Propositions } from "../components/Propositions";
import { FooterInvestigation } from "../components/FooterInvestigation";

export default function InvestigationGame({
  setFinished,
  difficulty,
  score,
  setScore,
  setXpWon,
  hardcore,
  endless,
}) {
  // datas
  const [countriesInvestigation, setCountriesInvestigation] = useState([]);

  // game
  const [round, setRound] = useState(0);
  const seconds = endless ? 9999 : hardcore ? 20 : 50;
  const numberRound = endless ? 20 : 10;
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  // status
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    getCountriesInvestigation(numberRound).then((res) => {
      setCountriesInvestigation(res);
      setLoading(false);
    });
  }, []);

  const finish = (_score) => {
    setXpWon((state) => {
      state = _score * (difficulty * 2);
      if (hardcore) state = state * 2;
      updateLevel(state);
      const game = {
        game: "Investigation",
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

  useInterval(() => {
    if (secondsLeft > 0) setSecondsLeft(secondsLeft - 1);
    else finish(score);
  }, 1000);

  const next = () => {
    if (!answered) {
      toast.error("Please select an answer ! 😬");
    } else {
      setAnswered(false);
      if (round < numberRound - 1) setRound(round + 1);
      else {
        if (!endless) finish(score);
        else {
          setRound(0);
          setLoading(true);
          getCountriesInvestigation(numberRound).then((res) => {
            setCountriesInvestigation(res);
            setLoading(false);
          });
        }
      }
    }
  };

  const submit = (answer) => {
    if (!answered) {
      setAnswered(true);
      if (answer.right) {
        setScore(score + 1);
        toast.success("Good answer ! 😍");
      } else {
        toast.error("Wrong answer 😢");
      }
    }
  };

  return (
    <div className="min-h-[100vh] bg-lightBackground dark:bg-darkBackground">
      {loading && <Loader />}
      <div>
        <ToastContainerTopRight />
        {countriesInvestigation?.length > 0 && (
          <Clues
            countriesInvestigation={countriesInvestigation}
            round={round}
            difficulty={difficulty}
          />
        )}

        <Propositions
          answered={answered}
          countriesInvestigation={countriesInvestigation}
          round={round}
          submit={submit}
        />

        <FooterInvestigation
          endless={endless}
          next={next}
          seconds={seconds}
          round={round}
        />
      </div>
    </div>
  );
}
