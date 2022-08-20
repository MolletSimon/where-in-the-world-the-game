import { getCountries } from "../../../services/countries/getCountries";

export default async function getCountriesFromLetter() {
  const countries = await getCountries();
  let random = Math.floor(Math.random() * (21 - 1 + 1) + 1);
  while (random == 14 || random == 16) {
    random = Math.floor(Math.random() * (21 - 1 + 1) + 1);
  }
  const letter = String.fromCharCode(97 + random).toUpperCase();
  const filteredCountries = countries.filter((d) =>
    d.name.common.startsWith(letter)
  );
  filteredCountries.forEach((c) => {
    c.found = false;
  });
  filteredCountries.sort((a, b) => (a.population > b.population ? -1 : 1));
  return filteredCountries;
}
