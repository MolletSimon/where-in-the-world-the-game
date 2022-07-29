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
}) {
  // datas
  const [countriesInvestigation, setCountriesInvestigation] = useState([]);

  // game
  const [round, setRound] = useState(0);
  const seconds = 60;
  const numberRound = 10;
  const [secondsLeft, setSecondsLeft] = useState(60);

  // status
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    getCountriesInvestigation(10).then((res) => {
      setCountriesInvestigation(res);
      setLoading(false);
    });
  }, []);

  const finish = (_score) => {
    setXpWon((state) => {
      console.log(_score);
      state = _score * (difficulty * 2);
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
    setAnswered(false);
    if (round < numberRound - 1) setRound(round + 1);
    else finish(score);
  };

  const submit = (answer) => {
    setAnswered(true);
    if (answer.right) {
      setScore(score + 1);
      toast.success("Good answer ! 😍");
    } else {
      toast.error("Wrong answer 😢");
    }
  };

  return (
    <>
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

        <FooterInvestigation next={next} seconds={seconds} round={round} />
      </div>
    </>
  );
}
