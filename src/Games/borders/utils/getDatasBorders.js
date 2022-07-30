import { getCountries } from "../../../services/countries/getCountries";
import { getRandom } from "../../common/utils/getRandom";

export default async function getDatasBorders() {
  let datas = [];

  let countries = await getCountries();

  let countriesInGame = [...countries.filter((c) => c.borders?.length > 2)];

  countriesInGame = getRandom(countriesInGame, 10);

  countriesInGame.forEach((co) => {
    datas.push(getPath(co, countries));
  });

  return datas;
}

function getPath(country, countries) {
  console.log("path");
  // add borderNames to array
  let bNames = [];
  country.borders.forEach((b) => {
    bNames.push(countries.find((c) => b == c.cca3)?.name.common);
  });
  country.borderNames = bNames;

  let path = {
    start: country,
    path: [],
  };

  let i = 0;
  // the algo make 4 turn
  while (i < 4) {
    // get border of countries
    let borders = country.borders.map((b) =>
      countries.find((c) => c.cca3 == b)
    );

    // verify that the new country has not already been add in path
    path.path.length > 0 &&
      path.path.forEach((p) => {
        const index = borders.indexOf(borders.find((b) => b.cca3 == p.cca3));
        if (index > -1) {
          borders.splice(index, 1);
        }
      });

    // set new country from border
    country = borders.find(
      (b) =>
        b.borders.length === Math.max(...borders.map((o) => o.borders.length))
    );

    if (i === 3) {
      if (
        country?.cca3 === path.start?.cca3 ||
        path.start?.borders.includes(country?.cca3)
      ) {
        country = borders.find(
          (b) =>
            b.borders.length !=
              Math.max(...borders.map((o) => o.borders.length)) &&
            b.cca3 != path.start.cca3
        );

        i++;
      } else {
        path.path.push(country);
        i++;
      }
    } else {
      path.path.push(country);
      i++;
    }
  }

  path.end = country;

  return path;
}
