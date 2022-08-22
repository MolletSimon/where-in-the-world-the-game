import { Button } from "../../../../components/Utils/Button";

export function Buttons(props) {
  return (
    <div className="md:mt-24 md:w-1/3 h-full justify-end">
      <Button
        background="#0E94D7"
        color="white"
        text="Play new game"
        method={props.newGame}
      />
      <Button
        background="white"
        color="black"
        text="Return to home page"
        method={() => props.navigate("/select-game")}
      />
    </div>
  );
}
