import Subtitle from "../../../components/Utils/Subtitle";

export function NumberTravel(props) {
  return (
    <div className="flex w-full justify-center">
      <Subtitle text={`Number of travel : ${props.numberTurn}`} />
    </div>
  );
}
