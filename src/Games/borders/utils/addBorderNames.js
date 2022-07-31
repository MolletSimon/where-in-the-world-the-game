export default function addBorderNames(newCountry, countries) {
  let bNames = [];
  newCountry.borders.forEach((b) => {
    bNames.push(countries.find((c) => b == c.cca3)?.name.common);
  });
  newCountry.borderNames = bNames;
  return newCountry;
}
