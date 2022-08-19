export default function getCountryFromCca(cca, countries) {
  return countries.find((c) => c.cca === cca);
}
