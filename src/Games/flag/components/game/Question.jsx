import ProgressBar from "@ramonak/react-progress-bar";
import { Round } from "../../../common/components/game/Round";
import { Timer } from "../../../common/components/game/Timer";

export function Question({
  time,
  countriesInGame,
  round,
  numberRound,
  secondsLeft,
  seconds,
  capitalMode,
}) {
  return (
    <div className="md:w-4/5 w-full xl:justify-center grid xl:grid-cols-3 md:mb-8">
      <div className="flex justify-center items-center mb-2 md:mb-4">
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
        {capitalMode ? (
          <h2 className="font-semibold text-center text-2xl md:text-4xl mt-4 mb-4">
            Capital:{" "}
            <span className="text-primary italic">
              {" "}
              {countriesInGame[round].capital[0]}
            </span>
          </h2>
        ) : (
          <Flag countriesInGame={countriesInGame} round={round} />
        )}
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
        className="rounded-lg mb-8 border-2 dark:border-darkInput"
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
