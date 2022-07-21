import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../../components/Utils/Button";
import Loader from "../../../components/Utils/Loader";
import "react-circular-progressbar/dist/styles.css";
import ToastContainerTopRight from "../../../components/Utils/ToastContainerTopRight";
import { updateLevel } from "../../../services/levels/updateLevel";
import getDataByDifficulty from "../utils/getDataByDifficulty";
import prepareCountriesArray from "../utils/prepareCountriesArray";
import { getCountries } from "../../../services/countries/getCountries";
import { Answers } from "../components/game/Answers";
import { Question } from "../components/game/Question";

export default function FlagGame({ setFinished, difficulty, score, setScore }) {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [countriesInGame, setCountriesInGame] = useState([]);
  const [round, setRound] = useState(0);
  const [time, setTime] = useState({ seconds: 0, minutes: 0, hours: 0 });
  const [submitted, setSubmitted] = useState(false);

  const [numberRound, setNumberRound] = useState(10);
  const [numberPropositions, setNumberPropositions] = useState(4);

  const initGame = (data) => {
    data = getDataByDifficulty(data, difficulty);
    let countriesArray = prepareCountriesArray(
      data,
      numberRound,
      numberPropositions
    );
    setCountriesInGame(countriesArray);
  };

  const select = (index) => {
    setSelected(index);
  };

  const submit = () => {
    setSubmitted(true);
    if (
      countriesInGame[round].propositions.findIndex((p) => p.right) === selected
    ) {
      toast.success("Good answer !");
      setScore(score + 1);
    } else {
      toast.error("Wrong answer 😔");
    }
    setSelected(null);
    if (round >= numberRound - 1) {
      finish();
    }
  };

  const next = () => {
    setSubmitted(false);
    if (round < numberRound - 1) setRound(round + 1);
  };

  const finish = () => {
    const xpWon = score * (difficulty / 1.4);
    updateLevel(xpWon);
    setFinished(true);
  };

  useEffect(() => {
    getCountries()
      .then((data) => {
        initGame(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-h-[95%]">
      {loading ? (
        <Loader label="The game is loading.." />
      ) : (
        <div>
          {countriesInGame.length > 0 && (
            <div className="flex justify-center flex-col items-center mt-16">
              <Question
                countriesInGame={countriesInGame}
                numberRound={numberRound}
                round={round}
                time={time}
              />

              <Answers
                countriesInGame={countriesInGame}
                round={round}
                select={select}
                selected={selected}
                submitted={submitted}
              />
              <div className="w-1/3">
                <Button
                  background="#0E94D7"
                  color="white"
                  method={submitted ? next : submit}
                  text={submitted ? "Next" : "Submit"}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <ToastContainerTopRight />
    </div>
  );
}
