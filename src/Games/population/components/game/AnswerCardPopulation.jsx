import commafy from "../../../../utils/commafy";
import Tada from "react-reveal/Tada";
import { Fade } from "react-reveal";
import { isThemeDark } from "../../../../utils/isThemeDark";

export function AnswerCardPopulation(props) {
  const bgColor = isThemeDark() ? "#202C37" : "white";
  const color = isThemeDark() ? "white" : "black";
  return (
    <div
      className="flex justify-center  items-center dark:border-darkInput border-2  flex-col transition hover:scale-110 hover:rounded-lg"
      style={{
        backgroundColor:
          props.answered && props.isTheRightAnswer(props.index)
            ? "#3AB795"
            : bgColor,
        cursor: !props.answered && "pointer",
      }}
      onClick={() => props.submit(props.index)}
    >
      <Fade>
        <img
          src={props.c.flags.png}
          alt="flag"
          width={200}
          className="hidden md:block rounded-2xl"
        />
        <img
          src={props.c.flags.png}
          alt="flag"
          width={80}
          className="block md:hidden rounded-lg"
        />
        <p
          className="mt-6 md:text-xl text-lg text-center"
          style={{
            color:
              props.answered && props.isTheRightAnswer(props.index)
                ? "white"
                : color,
          }}
        >
          <span className="font-bold">Country:</span> {props.c.name.common}
        </p>
      </Fade>
      {!props.answered && (
        <p className="mt-2 md:text-lg text-md font-normal italic dark:text-lightBackground">
          Region: {props.c.region}
        </p>
      )}
      {props.answered && (
        <Tada>
          <p
            className="text-md sm:text-lg md:text-2xl mt-3 text-center w-4/5"
            style={{
              color: color,
            }}
          >
            <span className="italic font-bold dark:text-white">
              Population :{" "}
            </span>
            {commafy(props.c.population)}
          </p>
        </Tada>
      )}
    </div>
  );
}
