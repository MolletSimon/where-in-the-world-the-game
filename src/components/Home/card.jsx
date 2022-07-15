import { Link, Outlet } from "react-router-dom";
import commafy from "../../utils/commafy";

function Card({ country, setDetail, setCountryDetail }) {
  const onClickDetail = () => {
    setCountryDetail(country);
    setDetail(true);
  };

  return (
    <div
      className="shadow-md rounded-md cursor-pointer dark:bg-darkInput"
      onClick={onClickDetail}
    >
      <img
        src={country.flags.png}
        className=" max-h-50 h-48 object-cover rounded-md"
        width="500"
        height="200"
      />

      <div className="ml-5 mt-4 mb-14 dark:text-white">
        <h2 className="font-Nunito text-xl font-extrabold mb-4 mt-8">
          {country.name.common}
        </h2>
        <p className="font-Nunito mb-1">
          <span className="font-semibold">Population: </span>
          {commafy(parseInt(country.population))}
        </p>
        <p className="font-Nunito mb-1">
          <span className="font-semibold">Region: </span>
          {country.region}
        </p>
        <p className="font-Nunito">
          <span className="font-semibold">Capital: </span>
          {country.capital}
        </p>
      </div>
    </div>
  );
}

export default Card;
