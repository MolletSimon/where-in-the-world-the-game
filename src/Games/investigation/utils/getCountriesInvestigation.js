import { getCountries } from "../../../services/countries/getCountries";
import { getRandom } from "../../common/utils/getRandom";
import prepareCountriesArray from "../../common/utils/prepareCountriesArray";

export default async function getCountriesInvestigation(numberRound) {
  let countriesInvestigation = [];

  let countries = await getCountries();
  let countriesFetch = [...countries];

  countries = countries.filter(
    (c) =>
      c.population > 15000000 &&
      c.currencies &&
      c.car.signs?.length > 0 &&
      c.region &&
      c.timezones?.length > 0 &&
      c.tld.length > 0 &&
      c.area &&
      c.borders?.length > 0 &&
      c.languages
  );

  countriesInvestigation = getPropositions(
    getRandom(countries, numberRound),
    countriesFetch
  );

  console.log(countriesInvestigation);

  return countriesInvestigation;
}

function getPropositions(countries, countriesFetch) {
  countries.forEach((c) => {
    let propositions = [];
    let borders = [];
    // remove the right answer for propositions
    let countriesForPropositions = [
      ...countriesFetch.filter((co) => co.name.common != c.name.common),
    ];
    countriesForPropositions = getRandom(countriesForPropositions, 4);
    let indexGoodAnswer = Math.floor(Math.random() * (3 - 0 + 1) + 0);

    c.borders.forEach((b) => {
      borders.push(countriesFetch.find((c) => b == c.cca3)?.name.common);
    });

    for (let i = 0; i < 4; i++) {
      if (i === indexGoodAnswer)
        propositions.push({ name: c.name.common, right: true, flag: c.flag });
      else {
        propositions.push({
          name: countriesForPropositions[0].name.common,
          right: false,
          flag: countriesForPropositions[0].flag,
        });
        countriesForPropositions.shift();
      }
    }

    c.propositions = propositions;
    c.bordersName = borders;
  });

  return countries;
}
