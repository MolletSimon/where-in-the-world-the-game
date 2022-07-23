export function Round(props) {
  return (
    <div
      className="hidden xl:flex justify-center items-center border-2 shadow-md border-primary 
    shadow-primary -skew-x-6 rounded-md h-20 w-28 text-primary font-bold"
    >
      <h2 className="font-bold text-primary lg:text-2xl">
        {props.round + 1}/{props.numberRound}
      </h2>
    </div>
  );
}
