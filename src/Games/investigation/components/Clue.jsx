export function Clue({ image, mt, ml, mr, text }) {
  return (
    <div
      className={`bg-note bg-no-repeat h-60 w-60 bg-contain p-8 flex flex-col items-center ${
        mt && mt
      } ${ml && ml} ${mr && mr}`}
    >
      <img src={`images/${image}.png`} alt={image} className="h-20 w-20" />
      <h2 className="mt-4 font-semibold text-lg text-center">{text}</h2>
    </div>
  );
}
