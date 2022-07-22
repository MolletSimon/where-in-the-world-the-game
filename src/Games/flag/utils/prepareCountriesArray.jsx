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

    if (game === "population") {
      // Shuffle array
      const shuffled = data.sort(() => 0.5 - Math.random());
      arr.push(shuffled.slice(0, 4));
      console.log(arr);

      arr.forEach((c) => {});
      console.log();
    }
  }

  console.log(arr);

  return countriesArray;
}

function prepareFlagCountry() {}
