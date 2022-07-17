import { Link } from "react-router-dom";
import Title from "../components/Utils/Title";

function SelectGameCard({ icon, text, border }) {
  return (
    <Link
      to="game"
      className={`cursor-pointer hover:shadow-2xl p-4 border ${border} flex justify-center items-center`}
    >
      <img width="100" src={`images/${icon}.png`} className="ml-8" alt="flag" />
      <p className="m-6 whitespace-normal">{text}</p>
    </Link>
  );
}

export default function SelectGame() {
  return (
    <div className="m-2 flex justify-center items-center flex-col">
      <Title margin="10" text="Select the game !" />
      <div className="mt-10 w-3/5 border-2 rounded-3xl h-96 grid grid-cols-2 grid-rows-2">
        <SelectGameCard
          icon="olympic-games"
          text="Guess which country the flag belongs to"
          border="border-l-0 border-t-0"
        ></SelectGameCard>
        <SelectGameCard
          icon="eiffel-tower"
          border="border-r-0 border-t-0"
          text="Guess which country the capital city belongs to"
        ></SelectGameCard>
        <SelectGameCard
          icon="people"
          border="border-l-0 border-b-0"
          text="Guess which of the two countries has the largest population"
        ></SelectGameCard>
        <SelectGameCard
          icon="australia"
          border="border-r-0 border-b-0"
          text="Find a country by crossing the borders"
        ></SelectGameCard>
      </div>
    </div>
  );
}
