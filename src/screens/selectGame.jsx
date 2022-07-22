import { Link } from "react-router-dom";
import Title from "../components/Utils/Title";

function SelectGameCard({ icon, text, border, game }) {
  return (
    <Link
      to={`/${game}`}
      className={`cursor-pointer w-full hover:shadow-2xl lg:p-4 border ${border} flex lg:flex-row flex-col 
      justify-center items-center`}
    >
      <img
        width="100"
        src={`images/${icon}.png`}
        className="xl:ml-8 xl:block hidden"
        alt="flag"
      />
      <img
        width="70"
        src={`images/${icon}.png`}
        className="xl:hidden block"
        alt="flag"
      />
      <p
        className="lg:m-0 lg:ml-3 mt-4 md:text-md text-xs lg:text-lg lg:mt-0 xl:text-start 
      text-center whitespace-normal"
      >
        {text}
      </p>
    </Link>
  );
}

export default function SelectGame() {
  return (
    <div className="m-2 min-h-[70vh] flex justify-evenly items-center flex-col">
      <Title margin="10" text="Select the game !" />
      <div className="mt-10 w-full sm:w-4/5 xl:w-3/5 border-2 rounded-3xl h-96 grid grid-cols-2 grid-rows-2">
        <SelectGameCard
          icon="olympic-games"
          text="Guess which country the flag belongs to"
          border="border-l-0 border-t-0"
          game="flag"
        ></SelectGameCard>
        <SelectGameCard
          icon="eiffel-tower"
          border="border-r-0 border-t-0"
          text="Guess which country the capital city belongs to"
          game="capital"
        ></SelectGameCard>
        <SelectGameCard
          icon="people"
          border="border-l-0 border-b-0"
          text="Guess which of the two countries has the largest population"
          game="population"
        ></SelectGameCard>
        <SelectGameCard
          icon="australia"
          border="border-r-0 border-b-0"
          text="Find a country by crossing the borders"
          game="borders"
        ></SelectGameCard>
      </div>
    </div>
  );
}
