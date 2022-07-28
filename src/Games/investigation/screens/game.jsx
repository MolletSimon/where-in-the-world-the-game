import { useEffect, useState } from "react";
import Subtitle from "../../../components/Utils/Subtitle";
import { Answers } from "../../flag/components/game/Answers";
import getCountriesInvestigation from "../utils/getCountriesInvestigation";
import commafy from "../../../utils/commafy";
import { Button } from "../../../components/Utils/Button";
import { Round } from "../../common/components/game/Round";
import Loader from "../../../components/Utils/Loader";
import { Timer } from "../../common/components/game/Timer";
import { toast } from "react-toastify";
import ToastContainerTopRight from "../../../components/Utils/ToastContainerTopRight";
import { serverTimestamp } from "firebase/firestore";
import { saveGame } from "../../../services/user/saveGame";
import { updateLevel } from "../../../services/levels/updateLevel";
import { useInterval } from "../../../utils/hooks/useInterval";

export default function InvestigationGame({
  setFinished,
  difficulty,
  score,
  setScore,
  xpWon,
  setXpWon,
}) {
  const [countriesInvestigation, setCountriesInvestigation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [numberRound, setNumberRound] = useState(10);
  const [seconds, setSeconds] = useState(60);
  const [round, setRound] = useState(0);

  useEffect(() => {
    getCountriesInvestigation(10).then((res) => {
      setCountriesInvestigation(res);
      setLoading(false);
    });
  }, []);

  const finish = (_score) => {
    setXpWon((state) => {
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
    else finish();
  }, 1000);

  const next = () => {
    setAnswered(false);
    if (round < numberRound - 1) setRound(round + 1);
    else finish();
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
          <div className="flex justify-center">
            <div className="bg-note bg-no-repeat h-60 w-60 bg-contain p-8 flex flex-col items-center m-16">
              <img
                src="images/population.png"
                alt="population"
                className="h-20 w-20"
              />
              <h2 className="mt-4 font-semibold text-xl text-center">
                {commafy(countriesInvestigation[round].population)}
              </h2>
            </div>
            <div className="bg-note bg-no-repeat h-60 w-60 bg-contain p-8 flex flex-col items-center mt-32 ml-32">
              <img
                src="images/eiffel-tower.png"
                alt="capital"
                className="h-20 w-20"
              />
              <h2 className="mt-4 font-semibold text-lg text-center">
                {countriesInvestigation[round].capital[0]}
              </h2>
            </div>
            <div className="bg-note bg-no-repeat h-60 w-60 bg-contain p-8 flex flex-col items-center mt-44 ml-32">
              <img
                src="images/subregion.png"
                alt="region"
                className="h-20 w-20"
              />
              <h2 className="mt-4 font-semibold text-lg text-center">
                {countriesInvestigation[round].subregion}
              </h2>
            </div>
            <div className="bg-note bg-no-repeat h-60 w-60 bg-contain p-8 flex flex-col items-center mt-16 ml-32 mr-16">
              <img
                src="images/languages.png"
                alt="languages"
                className="h-20 w-20"
              />
              <h2 className="mt-4 font-semibold text-md text-center">
                {Object.values(countriesInvestigation[round].languages).map(
                  (c, i) => (
                    <span key={i}>
                      {i > 0 && ", "}
                      {c}
                    </span>
                  )
                )}
              </h2>
            </div>
          </div>
        )}

        <div className="flex justify-center items-center mt-32">
          <div className="w-2/3 flex flex-row">
            {countriesInvestigation?.length > 0 &&
              countriesInvestigation[round].propositions.map((c, index) => (
                <div
                  key={index}
                  onClick={() => submit(c)}
                  style={{
                    background: answered && c.right ? "#3AB795" : "white",
                    color: answered && c.right ? "white" : "black",
                  }}
                  className="border-2 ml-8 p-6 md:p-4 w-full rounded-2xl mb-4 cursor-pointer 
          flex justify-center items-center h-full"
                >
                  {c.value}
                </div>
              ))}
          </div>
        </div>

        <div className="w-full flex justify-evenly items-center mt-14">
          <Timer seconds={seconds} />
          <div className="w-1/3">
            <Button
              text="Next"
              color="white"
              background="#0E94D7"
              method={next}
            />
          </div>
          <Round round={round} numberRound={10} />
        </div>
      </div>
    </>
  );
}
