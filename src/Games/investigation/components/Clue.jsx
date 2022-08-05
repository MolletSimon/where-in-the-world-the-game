export function Clue({ image, mt, ml, mr, text }) {
  return (
    <div
      className={`bg-paper dark:bg-darkPaper bg-no-repeat h-32 w-32 md:h-60 md:w-60 bg-contain md:pt-16 pr-6 pl-4 pb-8 flex flex-col items-center ${
        mt && mt
      } ${ml && ml} ${mr && mr}`}
    >
      <img
        src={`images/${image}.png`}
        alt={image}
        className="md:h-14 md:w-14 h-8 w-8"
      />
      <h2 className="mt-4 font-semibold text-sm md:text-md text-center overflow-auto dark:text-lightBackground">
        {text}
      </h2>
    </div>
  );
}
