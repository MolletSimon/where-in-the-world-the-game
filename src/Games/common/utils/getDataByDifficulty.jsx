export default function getDataByDifficulty(data, difficulty) {
  switch (difficulty) {
    case 1:
      data = data.filter((d) => d.population > 30000000);
      break;
    case 2:
      data = data.filter(
        (d) => d.population > 1000000 && d.population < 30000000
      );
      break;
    default:
      data = data.filter((d) => d.population < 1000000);
      break;
  }
  return data;
}
