export default function prepareCountriesArray(
  data,
  numberRound,
  numberPropositions,
  game
) {
  let arr = [];
  let countriesArray = [];

  while (arr.length < numberRound) {
    if (game === "flag") {
      var r = Math.floor(Math.random() * data.length - 1) + 1;
      if (arr.indexOf(r) === -1) {
        arr.push(r);
        const rightAnswer = Math.floor(Math.random() * 3) + 1;
        let answers = [];
        for (let i = 0; i < numberPropositions; i++) {
          if (i === rightAnswer) {
            answers.push({
              value: data[r].name.common,
              right: true,
              region: data[r].region,
              population: data[r].population,
            });
          } else {
            let value = data[Math.floor(Math.random() * data.length - 1) + 1];
            if (value.name.common === data[r].name.common)
              value = data[Math.floor(Math.random() * data.length - 1) + 1];

            let wrongAnswer = {
              value: value.name.common,
              right: false,
              region: value.region,
              population: value.population,
            };
            answers.push(wrongAnswer);
          }
        }

        data[r].propositions = answers;
        countriesArray.push(data[r]);
      }
    }
  }

  return countriesArray;
}

export function prepareCountriesPopulationArray(
  data,
  numberRound,
  numberPropositions
) {
  let countriesArray = [];

  for (let i = 0; i < numberRound; i++) {
    let answers = [...getRandom(data, 4)];
    countriesArray.push(answers);
  }

  return countriesArray;
}

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
