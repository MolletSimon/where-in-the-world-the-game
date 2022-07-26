import { Link } from "react-router-dom";
import Flip from "react-reveal/Flip";

export function SelectGameCard({ icon, text, border, game }) {
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
