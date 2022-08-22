import { AnswerCard } from "./AnswerCard";

export function Answers({
  countriesInGame,
  round,
  selected,
  submitted,
  select,
}) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-[95%] md:w-4/5 lg:w-3/5 2xl:w-2/5 h-40 md:h-60 gap-2 md:gap-4 mb-4 mt-6">
      {countriesInGame[round].propositions.map((p, index) => (
        <AnswerCard
          key={index}
          selected={selected}
          submitted={submitted}
          select={select}
          p={p}
          index={index}
        ></AnswerCard>
      ))}
    </div>
  );
}
