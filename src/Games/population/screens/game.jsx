import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../../components/Utils/Button";
import Loader from "../../../components/Utils/Loader";
import ToastContainerTopRight from "../../../components/Utils/ToastContainerTopRight";
import { getCountries } from "../../../services/countries/getCountries";
import commafy from "../../../utils/commafy";
import getDataByDifficulty from "../../flag/utils/getDataByDifficulty";
import prepareCountriesArray, {
  prepareCountriesPopulationArray,
} from "../../flag/utils/prepareCountriesArray";

export default function PopulationGame({ score, setScore, setFinished }) {
  const [countriesInGame, setCountriesInGame] = useState([]);
  const [round, setRound] = useState(0);
  const [answered, setAnswered] = useState(false);

  const numberRound = 10;
  const numberPropositions = 4;

  useEffect(() => {
    console.log("useEffect");
    getCountries()
      .then((data) => {
        let c = getDataByDifficulty(data, 1);
        setCountriesInGame(
          prepareCountriesPopulationArray(c, numberRound, numberPropositions)
        );
      })
      .catch((e) => console.error(e));
  }, []);

  const submit = (i) => {
    setAnswered(true);
    const currentCountries = countriesInGame[round];

    if (isTheRightAnswer(i)) {
      toast.success("Good answer !");
      setScore(score + 1);
    } else {
      toast.error("Bad answer");
    }
  };

  const next = () => {
    if (answered) {
      if (round < numberRound - 1) {
        setRound(round + 1);
      } else {
        setFinished(true);
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
    <div className="flex flex-col justify-center items-center">
      <div className="min-h-[70vh] grid grid-cols-2 grid-rows-2 justify-center w-full">
        {countriesInGame.length > 0 ? (
          countriesInGame[round].map((c, index) => (
            <div
              className="flex justify-center items-center border-2 flex-col"
              style={{
                backgroundColor:
                  answered && isTheRightAnswer(index) ? "#3AB795" : "white",
              }}
              key={index}
              onClick={() => submit(index)}
            >
              <img
                src={c.flags.png}
                alt="flag"
                width={200}
                className="rounded-2xl"
              />
              <p className="mt-6 text-xl font-bold text-primary">
                Country: {c.name.common}
              </p>
              <p className="mt-2 text-lg font-normal italic">
                Region: {c.region}
              </p>
              <ToastContainerTopRight />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      <div className="w-1/3 mt-4">
        <Button
          background="#0E94D7"
          color="white"
          method={next}
          text={"Next"}
        />
      </div>
    </div>
  );
}
