import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { renderTime } from "../../../flag/components/game/Question";

export function Timer({ seconds }) {
  return (
    <div
      className="hidden xl:flex justify-center items-center
    text-primary dark:text-white font-bold text-lg w-20"
    >
      <CountdownCircleTimer
        isPlaying
        duration={seconds}
        colorsTime={[15, 10, 5, 0]}
        size={120}
        colors={["#0E94D7", "#F7B801", "#A30000", "#A30000"]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}
