export function Round(props) {
  return (
    <div
      className="hidden xl:flex justify-center items-center border-2 shadow-md border-primary dark:border-white
    shadow-primary dark:shadow-white -skew-x-6 rounded-md h-20 w-28 text-primary dark:text-white font-bold"
    >
      <h2 className="font-bold text-primary dark:text-white lg:text-2xl">
        {props.numberRound > 10
          ? "∞"
          : `${props.round + 1}/${props.numberRound}`}
      </h2>
    </div>
  );
}
