import ReactStopwatch from "react-stopwatch";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

export function Question({ time, countriesInGame, round, numberRound }) {
  return (
    <div className="w-3/5 justify-around grid grid-cols-3 mb-8">
      <Timer time={time} />
      <Flag countriesInGame={countriesInGame} round={round} />
      <Round round={round} numberRound={numberRound}></Round>
    </div>
  );
}

function Round(props) {
  return (
    <div className="flex justify-center items-center">
      <h2 className="font-bold text-primary text-3xl">
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

function Timer({ time }) {
  return (
    <div className="flex justify-center items-center">
      <ReactStopwatch
        seconds={time.seconds}
        minutes={time.minutes}
        hours={time.hours}
        render={({ formatted, hours, minutes, seconds }) => {
          return (
            <div className="w-32 h-32">
              <CircularProgressbar
                value={seconds}
                maxValue={60}
                strokeWidth={3}
                styles={buildStyles({
                  pathColor: "#0E94D7",
                  textColor: "#0E94D7",
                })}
                text={formatted.split(":")[1] + ":" + formatted.split(":")[2]}
                backgroundPadding={10}
                className="text-xs"
              />
            </div>
          );
        }}
      />
    </div>
  );
}
