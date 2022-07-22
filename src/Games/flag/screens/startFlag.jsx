import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Subtitle from "../../../components/Utils/Subtitle";
import { TitleFlag } from "../components/startFlag/TitleFlag";
import { ButtonsDifficulty } from "../components/startFlag/ButtonsDifficulty";

export default function StartScreenFlag({
  setDifficulty,
  setDifficultySelected,
}) {
  const navigate = useNavigate();

  const selectDifficulty = (dif) => {
    setDifficulty(dif);
    setDifficultySelected(true);
  };

  return (
    <div className="w-full flex justify-center flex-col items-center min-h-[80vh]">
      <TitleFlag></TitleFlag>
      <Subtitle text="You will have to guess which country correspond to the flag that will be presented to you" />
      <Subtitle text="Select the difficulty !" />
      <ButtonsDifficulty
        selectDifficulty={selectDifficulty}
      ></ButtonsDifficulty>
    </div>
  );
}
