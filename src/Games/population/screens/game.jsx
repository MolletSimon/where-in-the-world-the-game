import { useEffect, useState } from "react";
import { getCountries } from "../../../services/countries/getCountries";
import getDataByDifficulty from "../../flag/utils/getDataByDifficulty";
import prepareCountriesArray from "../../flag/utils/prepareCountriesArray";

export default function PopulationGame() {
  const [countriesInGame, setCountriesInGame] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    getCountries()
      .then((data) => {
        let c = getDataByDifficulty(data);
        setCountriesInGame(prepareCountriesArray(c, 10, 4, "population"));
      })
      .catch((e) => console.error(e));
  }, []);
  return <div className="min-h-full grid grid-cols-2 grid-rows-2"></div>;
}
