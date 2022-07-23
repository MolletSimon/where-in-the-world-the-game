import { Button } from "../../components/Utils/Button";
import HeadShake from "react-reveal/HeadShake";

export function ButtonsDifficulty(props) {
  return (
    <div className="w-full mt-14 flex items-center flex-col">
      <HeadShake>
        <div className="xl:w-1/3 w-1/2 mb-2 ">
          <Button
            background="#22E97F"
            color="white"
            text="Easy"
            padding={20}
            method={() => props.selectDifficulty(1)}
          />
        </div>
        <div className="xl:w-1/3 w-1/2 mb-2">
          <Button
            background="#F2CD60"
            color="white"
            text="Medium"
            padding={20}
            method={() => props.selectDifficulty(2)}
          />
        </div>
        <div className="xl:w-1/3 w-1/2">
          <Button
            background="#F25757"
            padding={20}
            color="white"
            text="Hard"
            method={() => props.selectDifficulty(3)}
          />
        </div>
      </HeadShake>
    </div>
  );
}
