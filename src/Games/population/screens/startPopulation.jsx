import Subtitle from "../../../components/Utils/Subtitle";
import { ButtonsDifficulty } from "../../components/ButtonsDifficulty";
import { TitleStartScreen } from "../../components/TitleStartScreen";

export default function StartPopulation({
  setDifficulty,
  setDifficultySelected,
}) {
  const selectDifficulty = (dif) => {
    setDifficulty(dif);
    setDifficultySelected(true);
  };

  return (
    <div className="w-full flex justify-center flex-col items-center min-h-[80vh]">
      <TitleStartScreen
        alt="population"
        image="images/people.png"
        title="Welcome to the population game !"
      />
      <Subtitle text="You will have to guess which of the two countries has the largest population" />
      <Subtitle text="Select the difficulty !" />
      <ButtonsDifficulty selectDifficulty={selectDifficulty} />
    </div>
  );
}
