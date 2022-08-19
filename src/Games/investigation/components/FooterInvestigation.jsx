import { Button } from "../../../components/Utils/Button";
import { Round } from "../../common/components/game/Round";
import { Timer } from "../../common/components/game/Timer";

export function FooterInvestigation({ endless, seconds, next, round }) {
  return (
    <div className="w-full flex justify-evenly items-center mt-14">
      <Timer seconds={seconds} />
      <div className="w-1/3">
        <Button text="Next" color="white" background="#0E94D7" method={next} />
      </div>
      <Round round={round} numberRound={endless ? 11 : 10} />
    </div>
  );
}
