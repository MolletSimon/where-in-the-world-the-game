import Title from "../components/Utils/Title";
import RubberBand from "react-reveal/RubberBand";
import { SelectGameCard } from "../components/SelectGame/SelectGameCard";

export default function SelectGame() {
  return (
    <div className="min-h-[100vh]">
      <div className="min-h-[80vh] w-full flex items-center justify-evenly flex-col pt-8 sm:pt-0">
        <RubberBand>
          <Title margin="2" text="Select the game !" />
        </RubberBand>
        <div
          className="mt-2 h-full w-[95%] sm:w-4/5 gap-4 rounded-lg lg:rounded-3xl pt-4 sm:pt-0
      md:h-96 grid grid-rows-3 grid-cols-2 md:grid-cols-3 md:grid-rows-2 items-center dark:border-darkInput"
        >
          <SelectGameCard
            icon="olympic-games"
            text="Guess which country the flag belongs to"
            border="border-2 dark:border-darkInput"
            game="flag"
          ></SelectGameCard>
          <SelectGameCard
            icon="search"
            border="border-2 dark:border-darkInput"
            text="Guess the country from the clues given to you"
            game="investigation"
          ></SelectGameCard>
          <SelectGameCard
            icon="people"
            border="border-2 dark:border-darkInput"
            text="Guess which of the countries has the largest population"
            game="population"
          ></SelectGameCard>
          <SelectGameCard
            icon="australia"
            border="border-2 dark:border-darkInput"
            text="Find a country by crossing the borders"
            game="borders"
          ></SelectGameCard>
          <SelectGameCard
            icon="eiffel-tower"
            border="border-2 dark:border-darkInput"
            text="Find a country by its capital"
            game="capital"
          ></SelectGameCard>
          <SelectGameCard
            icon="letter"
            border="border-2 dark:border-darkInput"
            text="Find as many countries as possible from a given first letter"
            game="findletter"
          ></SelectGameCard>
        </div>
      </div>
    </div>
  );
}
