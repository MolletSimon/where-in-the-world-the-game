import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../Utils/Button";
import Loader from "../Utils/Loader";

export default function FlagGame() {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [countriesInGame, setCountriesInGame] = useState([]);
  const [round, setRound] = useState(0);

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
            answers.push({
              value: data[Math.floor(Math.random() * 249) + 1].name.common,
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
    <div>
      {loading ? (
        <Loader label="The game is loading.." />
      ) : (
        <div>
          {countriesInGame.length > 0 && (
            <div className="flex justify-center flex-col items-center mt-16">
              <img
                className="rounded-lg mb-8"
                src={countriesInGame[round].flags.png}
                alt="flag"
                width={300}
              />
              {countriesInGame[round].propositions.map((p, index) => (
                <div
                  onClick={() => select(index)}
                  className={`border-2 p-4 w-1/2 rounded-md mb-4 cursor-pointer ${
                    selected == index && "bg-primary text-white"
                  }`}
                  key={index}
                >
                  {p.value}
                </div>
              ))}
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