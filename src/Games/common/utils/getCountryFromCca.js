export default function getCountryFromCca(cca, countries) {
  console.log(countries);
  return countries.find((c) => c.cca === cca);
}
