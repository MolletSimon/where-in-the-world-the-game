import { Button } from "../../../../components/Utils/Button";

export function ButtonsDifficulty(props) {
  return (
    <div className="w-full mt-14 flex items-center flex-col">
      <div className="w-1/3 mb-2 ">
        <Button
          background="#22E97F"
          color="white"
          text="Easy"
          padding={20}
          method={() => props.selectDifficulty(1)}
        />
      </div>
      <div className="w-1/3 mb-2">
        <Button
          background="#F2CD60"
          color="white"
          text="Medium"
          padding={20}
          method={() => props.selectDifficulty(2)}
        />
      </div>
      <div className="w-1/3">
        <Button
          background="#F25757"
          padding={20}
          color="white"
          text="Hard"
          method={() => props.selectDifficulty(3)}
        />
      </div>
    </div>
  );
}
