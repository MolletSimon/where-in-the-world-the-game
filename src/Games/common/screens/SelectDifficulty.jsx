import Subtitle from "../../../components/Utils/Subtitle";
import { ButtonsDifficulty } from "../components/select-difficulty/ButtonsDifficulty";
import { TitleStartScreen } from "../components/select-difficulty/TitleStartScreen";
import Pulse from "react-reveal/Pulse";

export default function SelectDifficultyScreen({
  setDifficulty,
  setDifficultySelected,
  title,
  image,
  alt,
  subtitle,
  ...props
}) {
  const selectDifficulty = (dif) => {
    setDifficulty(dif);
    setDifficultySelected(true);
  };

  return (
    <div className="min-h-[100vh] dark:bg-darkBackground">
      <div className="w-full flex justify-center flex-col items-center min-h-[80vh]">
        <TitleStartScreen
          alt={alt}
          image={`images/${image}.png`}
          title={title}
        />
        <Pulse>
          <Subtitle text={subtitle} />
          <Subtitle text="Select the difficulty !" />
        </Pulse>

        <ButtonsDifficulty
          easyText={props.easyText}
          mediumText={props.mediumText}
          hardText={props.hardText}
          selectDifficulty={selectDifficulty}
        />
      </div>
    </div>
  );
}
