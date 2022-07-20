import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../../components/Utils/Button";
import Loader from "../../../components/Utils/Loader";
import ReactStopwatch from "react-stopwatch";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AnswerCard } from "../components/AnswerCard";
import { Navigate } from "react-router-dom";
import ToastContainerTopRight from "../../../components/Utils/ToastContainerTopRight";

export default function FlagGame() {
  const [loading, setLoading] = useState(true);
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [started, setStarted] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [countriesInGame, setCountriesInGame] = useState([]);
  const [round, setRound] = useState(0);
  const [time, setTime] = useState({ seconds: 0, minutes: 0, hours: 0 });
  const [good, setGood] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [numberRound, setNumberRound] = useState(10);
  const [numberPropositions, setNumberPropositions] = useState(4);

  const initGame = (data) => {
    let arr = [];
    let countriesArray = [];
    while (arr.length < numberRound) {
      var r = Math.floor(Math.random() * 249) + 1;
      if (arr.indexOf(r) === -1) {
        arr.push(r);
        const rightAnswer = Math.floor(Math.random() * 3) + 1;
        let answers = [];
        for (let i = 0; i < numberPropositions; i++) {
          if (i === rightAnswer) {
            answers.push({ value: data[r].name.common, right: true });
          } else {
            let value = data[Math.floor(Math.random() * 249) + 1].name.common;
            answers.push({
              value:
                value == data[r].name.common
                  ? data[Math.floor(Math.random() * 249) + 1].name.common
                  : value,
              right: false,
            });
          }
        }
        data[r].propositions = answers;
        countriesArray.push(data[r]);
      }
    }
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
      setGood(true);
    } else {
      toast.error("Wrong answer 😔");
      setGood(false);
    }
    setSelected(null);
  };

  const next = () => {
    setSubmitted(false);
    setGood(false);
    if (round < numberRound - 1) setRound(round + 1);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
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
              <div className="w-3/5 justify-around grid grid-cols-3 mb-8">
                <div className="flex justify-center items-center">
                  <ReactStopwatch
                    seconds={time.seconds}
                    minutes={time.minutes}
                    hours={time.hours}
                    render={({ formatted, hours, minutes, seconds }) => {
                      return (
                        <div className="w-32 h-32">
                          <CircularProgressbar
                            value={seconds}
                            maxValue={60}
                            strokeWidth={3}
                            styles={buildStyles({
                              pathColor: "#0E94D7",
                              textColor: "#0E94D7",
                            })}
                            text={
                              formatted.split(":")[1] +
                              ":" +
                              formatted.split(":")[2]
                            }
                            backgroundPadding={10}
                            className="text-xs"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <img
                    className="rounded-lg mb-8 border-2"
                    src={countriesInGame[round].flags.png}
                    alt="flag"
                    width={250}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <h2 className="font-bold text-primary text-3xl">
                    {round}/{numberRound}
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 w-2/5 h-60 gap-4 mb-4">
                {countriesInGame[round].propositions.map((p, index) => (
                  <AnswerCard
                    key={index}
                    selected={selected}
                    submitted={submitted}
                    select={select}
                    p={p}
                    index={index}
                  ></AnswerCard>
                ))}
              </div>
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
