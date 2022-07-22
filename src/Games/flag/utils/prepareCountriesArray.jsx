export default function prepareCountriesArray(
  data,
  numberRound,
  numberPropositions
) {
  let arr = [];
  let countriesArray = [];
  while (arr.length < numberRound) {
    var r = Math.floor(Math.random() * data.length - 1) + 1;
    if (arr.indexOf(r) === -1) {
      arr.push(r);
      const rightAnswer = Math.floor(Math.random() * 3) + 1;
      let answers = [];
      for (let i = 0; i < numberPropositions; i++) {
        if (i === rightAnswer) {
          answers.push({ value: data[r].name.common, right: true });
        } else {
          let value =
            data[Math.floor(Math.random() * data.length - 1) + 1].name.common;
          answers.push({
            value:
              value === data[r].name.common
                ? data[Math.floor(Math.random() * data.length - 1) + 1].name
                    .common
                : value,
            right: false,
          });
        }
      }
      data[r].propositions = answers;
      countriesArray.push(data[r]);
    }
  }
  return countriesArray;
}
