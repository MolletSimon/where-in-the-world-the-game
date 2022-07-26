import ProgressBar from "@ramonak/react-progress-bar";
import Subtitle from "../../../../components/Utils/Subtitle";

export default function ActualLevel(props) {
  return (
    <div>
      {props.level && (
        <>
          <Subtitle text={`Level ${props.level.level}`} />{" "}
          <ProgressBar
            completed={props.level.percentageLevel}
            bgColor="#0E94D7"
            className="w-full mt-2"
            height="25px"
            customLabel={`${Math.floor(props.level.xp)}xp`}
            animateOnRender={true}
          />
          <h3 className="text-center text-primary mt-2">
            {Math.floor(props.level.xpToNextLevel - props.level.xp)}xp until
            next level
          </h3>{" "}
        </>
      )}
    </div>
  );
}
