import commafy from "../../../../utils/commafy";
import Tada from "react-reveal/Tada";
import ToastContainerTopRight from "../../../../components/Utils/ToastContainerTopRight";
import { Fade } from "react-reveal";

export function AnswerCardPopulation(props) {
  return (
    <div
      className="flex justify-center items-center border-2 flex-col"
      style={{
        backgroundColor:
          props.answered && props.isTheRightAnswer(props.index)
            ? "#3AB795"
            : "white",
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
          width={100}
          className="block md:hidden rounded-lg"
        />
        <p
          className="mt-6 md:text-xl text-lg text-center"
          style={{
            color:
              props.answered && props.isTheRightAnswer(props.index)
                ? "white"
                : "black",
          }}
        >
          <span className="font-bold">Country:</span> {props.c.name.common}
        </p>
      </Fade>
      {!props.answered && (
        <p className="mt-2 md:text-lg text-md font-normal italic">
          Region: {props.c.region}
        </p>
      )}
      {props.answered && (
        <Tada>
          <p
            className="text-lg md:text-2xl mt-3 text-center"
            style={{
              color: props.isTheRightAnswer(props.index) && "white",
            }}
          >
            <span className="italic font-bold">Population : </span>
            {commafy(props.c.population)}
          </p>
        </Tada>
      )}

      <ToastContainerTopRight />
    </div>
  );
}
