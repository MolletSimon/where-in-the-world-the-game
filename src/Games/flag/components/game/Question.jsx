import ProgressBar from "@ramonak/react-progress-bar";
import { Round } from "../../../components/Round";
import { Timer } from "../../../components/Timer";

export function Question({
  time,
  countriesInGame,
  round,
  numberRound,
  secondsLeft,
  seconds,
}) {
  return (
    <div className="md:w-4/5 w-full xl:justify-center grid xl:grid-cols-3 mb-8">
      <div className="flex justify-center items-center mb-4">
        <ProgressBar
          completed={secondsLeft}
          maxCompleted={seconds}
          className="w-[250px] md:w-3/5 xl:hidden"
          bgColor="#0E94D7"
          customLabel=" "
          height="6px"
        />

        <Timer seconds={seconds} />
      </div>
      <div className="flex justify-center items-center">
        <Flag countriesInGame={countriesInGame} round={round} />
      </div>
      <div className="flex justify-center items-center">
        <Round round={round} numberRound={numberRound}></Round>
      </div>
    </div>
  );
}

function Flag({ countriesInGame, round }) {
  return (
    <div className="flex justify-center items-center">
      <img
        className="rounded-lg mb-8 border-2"
        src={countriesInGame[round].flags.png}
        alt="flag"
        width={250}
      />
    </div>
  );
}

export const renderTime = ({ remainingTime }) => {
  return <p className="text-xl">{remainingTime}</p>;
};
