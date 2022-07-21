import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Utils/Button";
import Subtitle from "../../../components/Utils/Subtitle";
import Title from "../../../components/Utils/Title";

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
    <div className="w-full flex justify-center flex-col">
      <div className="flex justify-evenly items-center m-8">
        <img src="images/olympic-games.png" alt="flag" />
        <Title text="Welcome to the flag !" margin="0" />
        <img src="images/olympic-games.png" alt="flag" />
      </div>
      <Subtitle text="You will have to guess which country correspond to the flag that will be presented to you" />
      <Subtitle text="Select the difficulty !" />
      <div className="w-full mt-14 flex items-center flex-col">
        <div className="w-1/3 mb-2 ">
          <Button
            background="#22E97F"
            color="white"
            text="Easy"
            padding={20}
            method={() => selectDifficulty(1)}
          />
        </div>
        <div className="w-1/3 mb-2">
          <Button
            background="#F2CD60"
            color="white"
            text="Medium"
            padding={20}
            method={() => selectDifficulty(2)}
          />
        </div>
        <div className="w-1/3">
          <Button
            background="#F25757"
            padding={20}
            color="white"
            text="Hard"
            method={() => selectDifficulty(3)}
          />
        </div>
      </div>
    </div>
  );
}
