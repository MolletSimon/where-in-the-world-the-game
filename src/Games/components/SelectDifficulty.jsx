import Subtitle from "../../components/Utils/Subtitle";
import { ButtonsDifficulty } from "./ButtonsDifficulty";
import { TitleStartScreen } from "./TitleStartScreen";
import Pulse from "react-reveal/Pulse";

export default function SelectDifficultyScreen({
  setDifficulty,
  setDifficultySelected,
  title,
  image,
  alt,
  subtitle,
}) {
  const selectDifficulty = (dif) => {
    setDifficulty(dif);
    setDifficultySelected(true);
  };

  return (
    <div className="w-full flex justify-center flex-col items-center min-h-[80vh]">
      <TitleStartScreen alt={alt} image={`images/${image}.png`} title={title} />
      <Pulse>
        <Subtitle text={subtitle} />
        <Subtitle text="Select the difficulty !" />
      </Pulse>

      <ButtonsDifficulty selectDifficulty={selectDifficulty} />
    </div>
  );
}
