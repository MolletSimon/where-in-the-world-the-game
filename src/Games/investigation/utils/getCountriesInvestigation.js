import { getCountries } from "../../../services/countries/getCountries";
import { getRandom } from "../../common/utils/getRandom";

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
      c.languages &&
      c.idd?.suffixes.length < 10
  );

  countriesInvestigation = getPropositions(
    getRandom(countries, numberRound),
    countriesFetch
  );
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
    const sameRegion = getRandom(
      countriesForPropositions.filter((cp) => cp.subregion === c.subregion),
      1
    );

    let sameFirstLetter = [];

    if (
      countriesForPropositions.filter((cp) =>
        cp.name.common.startsWith(c.name.common.slice(0, 2))
      ).length > 0
    ) {
      sameFirstLetter = getRandom(
        countriesForPropositions.filter((cp) =>
          cp.name.common.startsWith(c.name.common.slice(0, 2))
        ),
        1
      );
    } else {
      if (
        countriesForPropositions.filter((cp) =>
          cp.name.common.startsWith(c.name.common.charAt(0))
        ).length > 0
      ) {
        sameFirstLetter = getRandom(
          countriesForPropositions.filter((cp) =>
            cp.name.common.startsWith(c.name.common.charAt(0))
          ),
          1
        );
      } else {
        sameFirstLetter = getRandom(countriesForPropositions, 1);
      }
    }

    // SAME POPULATION
    const populationArray = countriesForPropositions.map(
      (a) => a.ccn3 != c.ccn3 && a.population
    );

    const closest = populationArray.reduce(function (prev, curr) {
      return Math.abs(curr - c.population) < Math.abs(prev - c.population)
        ? curr
        : prev;
    });

    const samePopulation = countriesForPropositions.find(
      (cp) => cp.population == closest
    );

    countriesForPropositions = [
      samePopulation,
      sameFirstLetter[0],
      sameRegion[0],
    ];
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
