export function Clue({ image, mt, ml, mr, text }) {
  return (
    <div
      className={`bg-paper bg-no-repeat h-60 w-60 bg-contain pt-16 pr-6 pl-4 pb-8 flex flex-col items-center ${
        mt && mt
      } ${ml && ml} ${mr && mr}`}
    >
      <img src={`images/${image}.png`} alt={image} className="h-14 w-14" />
      <h2 className="mt-4 font-semibold text-md text-center overflow-auto">
        {text}
      </h2>
    </div>
  );
}
