import ReactStopwatch from "react-stopwatch";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ProgressBar from "@ramonak/react-progress-bar";

export function Question({
  time,
  countriesInGame,
  round,
  numberRound,
  secondsLeft,
}) {
  return (
    <div className="md:w-4/5 w-full xl:justify-center grid xl:grid-cols-3 mb-8">
      <div className="flex justify-center items-center mb-4">
        <ProgressBar
          completed={secondsLeft}
          maxCompleted={60}
          className="w-[250px] md:w-3/5 xl:hidden"
          bgColor="#0E94D7"
          customLabel=" "
          height="6px"
        />

        <Timer secondsLeft={secondsLeft} />
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

function Round(props) {
  return (
    <div className="hidden xl:flex justify-center items-center border-2 shadow-lg border-primary shadow-primary -skew-x-6   h-20 w-28 text-primary font-bold">
      <h2 className="font-bold text-primary lg:text-2xl">
        {props.round + 1}/{props.numberRound}
      </h2>
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

const renderTime = ({ remainingTime }) => {
  return <p className="text-xl">{remainingTime}</p>;
};

function Timer({ secondsLeft }) {
  return (
    <div
      className="hidden xl:flex justify-center items-center
    text-primary font-bold text-lg w-20"
    >
      <CountdownCircleTimer
        isPlaying
        duration={60}
        colorsTime={[15, 10, 5, 0]}
        size={120}
        colors={["#0E94D7", "#F7B801", "#A30000", "#A30000"]}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}
