import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/Utils/Button";
import Subtitle from "../../../components/Utils/Subtitle";
import Title from "../../../components/Utils/Title";

export default function SelectDifficultyFlag() {
  const [difficulty, setDifficulty] = useState(0);
  const navigate = useNavigate();

  const selectDifficulty = (dif) => {
    setDifficulty(dif);
    navigate(`/flag/${dif}`);
  };

  return (
    <div className="w-full flex justify-center flex-col">
      <div className="flex justify-around items-center m-8">
        <img src="images/olympic-games.png" alt="flag" />
        <Title text="Welcome to the flag !" margin="0" />
        <img src="images/olympic-games.png" alt="flag" />
      </div>
      <Subtitle text="You will have to guess which country correspond to the flag that will be presented to you" />
      <Subtitle text="Select the difficulty !" />
      <div className="w-full mt-10 flex items-center flex-col">
        <div className="w-2/5">
          <Button
            background="#22E97F"
            color="white"
            text="Easy"
            method={() => selectDifficulty(1)}
          />
        </div>
        <div className="w-2/5">
          <Button
            background="#F2CD60"
            color="white"
            text="Medium"
            method={() => selectDifficulty(2)}
          />
        </div>
        <div className="w-2/5">
          <Button
            background="#F25757"
            color="white"
            text="Hard"
            method={() => selectDifficulty(3)}
          />
        </div>
      </div>
    </div>
  );
}
