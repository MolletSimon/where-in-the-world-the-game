import { useEffect, useState } from "react";
import { Answers } from "../../flag/components/game/Answers";
import getCountriesInvestigation from "../utils/getCountriesInvestigation";

export default function InvestigationGame({ difficulty }) {
  const [countriesInvestigation, setCountriesInvestigation] = useState([]);
  const [round, setRound] = useState(0);

  useEffect(() => {
    getCountriesInvestigation(10).then((res) => {
      setCountriesInvestigation(res);
    });
  }, []);

  const next = () => {
    setRound(round + 1);
  };

  return (
    <div>
      {countriesInvestigation?.length > 0 && (
        <div>
          <h1>Subregion : {countriesInvestigation[round].subregion}</h1>
          <h1>Capital : {countriesInvestigation[round].capital[0]}</h1>
          <h1>
            Languages :{" "}
            {Object.values(countriesInvestigation[round].languages).map(
              (c, i) => (
                <span>
                  {i > 0 && ", "}
                  {c}
                </span>
              )
            )}
          </h1>
          <h1>Subregion : {countriesInvestigation[round].subregion}</h1>
          <Answers countriesInGame={countriesInvestigation} round={round} />

          <button onClick={next}>Next</button>
        </div>
      )}
    </div>
  );
}
