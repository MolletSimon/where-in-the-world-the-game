export function Clue({ image, mt, ml, mr, text }) {
  return (
    <div
      className={`bg-paper dark:bg-darkPaper bg-no-repeat h-48 w-48 md:h-60 md:w-60 bg-contain pt-16 pr-6 pl-4 pb-8 flex flex-col items-center lg:mt-20`}
    >
      <img
        src={`images/${image}.png`}
        alt={image}
        className="md:h-20 md:w-20 h-12 w-12"
      />
      <h2 className="mt-4 font-semibold text-sm md:text-md text-center overflow-auto dark:text-lightBackground">
        {text}
      </h2>
    </div>
  );
}
