import { Link } from "react-router-dom";
import Title from "../components/Utils/Title";
import RubberBand from "react-reveal/RubberBand";
import Flip from "react-reveal/Flip";

function SelectGameCard({ icon, text, border, game }) {
  return (
    <Link
      to={`/${game}`}
      className={`cursor-pointer w-full hover:shadow-2xl lg:p-4 border ${border} flex lg:flex-row flex-col 
      justify-center items-center h-full md:mt-0 md:mb-0 mt-6 mb-6`}
    >
      <Flip left>
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
          className="lg:m-0 lg:ml-10 mt-4 md:text-md text-xs lg:text-lg lg:mt-0 xl:text-start 
      text-center whitespace-normal"
        >
          {text}
        </p>
      </Flip>
    </Link>
  );
}

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
          icon="eiffel-tower"
          border="border-0 border-b-2"
          text="Guess which country the capital city belongs to"
          game="capital"
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
