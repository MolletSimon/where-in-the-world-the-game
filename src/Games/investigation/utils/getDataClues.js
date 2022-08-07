import commafy from "../../../utils/commafy";

export default function getDataClues(
  difficulty,
  countriesInvestigation,
  round
) {
  const country = countriesInvestigation[round];

  const firstClue = {
    image:
      (difficulty == 1 && "currency") ||
      (difficulty == 2 && "population") ||
      (difficulty == 3 && "borders"),
    text:
      (difficulty == 1 &&
        Object.values(country.currencies).map((c, i) => (
          <span key={i}>
            {i > 0 && ", "}
            {c.name}
          </span>
        ))) ||
      (difficulty == 2 && commafy(country.population)) ||
      (difficulty == 3 &&
        Object.values(country.bordersName).map((c, i) => (
          <span key={i}>
            {i > 0 && ", "}
            {c}
          </span>
        ))),
  };
  const secondClue = {
    image:
      (difficulty == 1 && "eiffel-tower") ||
      (difficulty == 2 && "subregion") ||
      (difficulty == 3 && "area"),
    text:
      (difficulty == 1 && country.capital[0]) ||
      (difficulty == 2 && country.region) ||
      (difficulty == 3 && commafy(country.area) + " km²"),
  };
  const thirdClue = {
    image:
      (difficulty == 1 && "subregion") ||
      (difficulty == 2 && "time") ||
      (difficulty == 3 && "road"),
    text:
      (difficulty == 1 && country.subregion) ||
      (difficulty == 2 &&
        country.timezones.map((c, i) => (
          <span key={i}>
            {i > 0 && ", "}
            {c}
          </span>
        ))) ||
      (difficulty == 3 && `Drive on the ${country.car?.side}`),
    // country.tld.map((c, i) => (
    //   <span key={i}>
    //     {i > 0 && ", "}
    //     {c}
    //   </span>
    // ))),
  };
  const forthClue = {
    image:
      (difficulty == 1 && "languages") ||
      (difficulty == 2 && "plate") ||
      (difficulty == 3 && "phone"),
    text:
      (difficulty == 1 &&
        Object.values(country.languages).map((c, i) => (
          <span key={i}>
            {i > 0 && ", "}
            {c}
          </span>
        ))) ||
      (difficulty == 2 && country.car?.signs[0]) ||
      (difficulty == 3 &&
        country.idd.root + country.idd.suffixes.map((s) => s)),
  };
  return [firstClue, secondClue, thirdClue, forthClue];
}
