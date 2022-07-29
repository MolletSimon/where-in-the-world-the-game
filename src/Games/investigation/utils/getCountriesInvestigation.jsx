import { getCountries } from "../../../services/countries/getCountries";
import { getRandom } from "../../common/utils/getRandom";
import prepareCountriesArray from "../../common/utils/prepareCountriesArray";

export default async function getCountriesInvestigation(numberRound) {
  let countriesInvestigation = [];

  let countries = await getCountries();

  countries = countries.filter(
    (c) =>
      c.population > 5000000 &&
      c.currencies &&
      c.car.signs?.length > 0 &&
      c.region &&
      c.timezones?.length > 0 &&
      c.tld.length > 0 &&
      c.area &&
      c.borders?.length > 0 &&
      c.languages
  );

  countriesInvestigation = prepareCountriesArray(
    getRandom(countries, numberRound),
    numberRound,
    4
  );
  return countriesInvestigation;
}
