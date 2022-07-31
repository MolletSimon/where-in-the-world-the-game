import { getCountries } from "../../../services/countries/getCountries";
import { getRandom } from "../../common/utils/getRandom";

export default async function getDatasBorders() {
  let datas = [];

  // get all countries
  let countries = await getCountries();

  // get countries that have more than 2 borders
  let countriesInGame = [...countries.filter((c) => c.borders?.length > 2)];

  //take 50 countries
  countriesInGame = getRandom(countriesInGame, 50);

  countriesInGame.forEach((co) => {
    datas.push(getPath(co, countries));
  });

  // only take the good ones (not one travel)
  datas = datas.filter((d) => !d.oneTravel);

  // take 10
  datas = getRandom(datas, 10);

  datas.forEach((d) => {
    if (d.start.borders.includes(d.end.cca3)) console.log("one travel");
  });

  return datas;
}

function getPath(country, countries) {
  let duplicateCountries = [...countries];
  let path = {
    start: country,
    path: [],
  };

  // add borderNames to array
  let bNames = [];
  country.borders.forEach((b) => {
    bNames.push(countries.find((c) => b == c.cca3)?.name.common);
  });
  country.borderNames = bNames;

  for (let i = 0; i < 4; i++) {
    // delete actual country from duplicate array to avoid loop
    duplicateCountries = duplicateCountries.filter(
      (d) => d.cca3 != country.cca3
    );

    // select borders that have more than 2 borders
    let borders = [];
    country.borders.forEach((b) => {
      let border = duplicateCountries.find((d) => d.cca3 === b);
      if (border?.borders.length >= 2) borders.push(border);
    });

    let newCountry = borders[Math.floor(Math.random() * borders.length)];

    if (!newCountry) {
      break;
    }
    country = newCountry;
    path.path.push(country);
  }

  path.end = country;

  if (path.start.borders.includes(path.end.cca3)) path.oneTravel = true;

  return path;
}
