import { AnswerCard } from "./AnswerCard";

export function Answers({
  countriesInGame,
  round,
  selected,
  submitted,
  select,
}) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-2/5 h-60 gap-4 mb-4">
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
