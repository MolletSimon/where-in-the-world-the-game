import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../components/Utils/Button";
import Loader from "../components/Utils/Loader";
import ReactStopwatch from "react-stopwatch";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function FlagGame() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [countriesInGame, setCountriesInGame] = useState([]);
  const [round, setRound] = useState(0);
  const [time, setTime] = useState({ seconds: 0, minutes: 0, hours: 0 });

  const numberRound = 10;
  const numberPropositions = 4;

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
    if (
      countriesInGame[round].propositions.findIndex((p) => p.right) === selected
    ) {
      toast.success("Bonne réponse !");
    } else {
      toast.error("Mauvaise réponse 😔");
    }
    setSelected(null);
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
              <div className="w-3/5 justify-around flex flex-row items-center">
                <div>
                  <ReactStopwatch
                    seconds={time.seconds}
                    minutes={time.minutes}
                    hours={time.hours}
                    onCallback={() => console.log("Finish")}
                    render={({ formatted, hours, minutes, seconds }) => {
                      return (
                        <div className="w-32 h-32">
                          <CircularProgressbar
                            value={seconds}
                            maxValue={60}
                            text={formatted}
                            backgroundPadding={10}
                            className="text-xs"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
                <img
                  className="rounded-lg mb-8 border-2"
                  src={countriesInGame[round].flags.png}
                  alt="flag"
                  width={250}
                />
                <div>
                  <h2 className="font-bold text-primary text-3xl">
                    {round}/{numberRound}
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2 grid-rows-2 w-2/5 h-60 gap-4">
                {countriesInGame[round].propositions.map((p, index) => (
                  <div
                    onClick={() => select(index)}
                    className={`border-2 p-4 w-full rounded-2xl mb-4 cursor-pointer flex justify-center items-center ${
                      selected == index && "bg-primary text-white"
                    }`}
                    key={index}
                  >
                    {p.value}
                  </div>
                ))}
              </div>
              <div className="w-1/3">
                <Button
                  background="#0E94D7"
                  color="white"
                  method={submit}
                  text="Next"
                />
              </div>
            </div>
          )}
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
