import Title from "../components/Utils/Title";
import RubberBand from "react-reveal/RubberBand";
import { SelectGameCard } from "../components/SelectGame/SelectGameCard";

export default function SelectGame() {
  return (
    <div className="m-2 min-h-[85vh] flex justify-evenly items-center flex-col">
      <RubberBand>
        <Title margin="2" text="Select the game !" />
      </RubberBand>
      <div
        className="mt-2 w-full h-full sm:w-4/5 xl:w-3/5 border-2 rounded-3xl 
      md:h-96 grid grid-rows-4 md:grid-cols-2 md:grid-rows-2 items-center"
      >
        <SelectGameCard
          icon="olympic-games"
          text="Guess which country the flag belongs to"
          border="border-0 border-b-2 md:border-r-2"
          game="flag"
        ></SelectGameCard>
        <SelectGameCard
          icon="search"
          border="border-0 border-b-2"
          text="Guess the country from the clues given to you"
          game="investigation"
        ></SelectGameCard>
        <SelectGameCard
          icon="people"
          border="border-0 border-b-2 md:border-b-0 md:border-r-2"
          text="Guess which of the two countries has the largest population"
          game="population"
        ></SelectGameCard>
        <SelectGameCard
          icon="australia"
          border="border-0"
          text="Find a country by crossing the borders"
          game="borders"
        ></SelectGameCard>
      </div>
    </div>
  );
}
