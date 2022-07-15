import commafy from "../../utils/commafy";

function InfosDetails(props) {
  return (
    <>
      <h1
        className="text-start text-4xl font-Nunito font-extrabold 
  mt-10 dark:text-darkText md:ml-0 ml-7"
      >
        {props.countryDetail.name.common}
      </h1>
      <div
        className="grid md:grid-cols-2 mt-10 dark:text-white 
            ml-7 md:ml-0 leading-8 md:leading-0"
      >
        <div>
          <h3 className="font-Nunito">
            <span className="font-semibold">Native Name: </span>
            {props.countryDetail.name.official}
          </h3>
          <h3 className="font-Nunito">
            <span className="font-semibold">Population: </span>
            {commafy(props.countryDetail.population)}
          </h3>
          <h3 className="font-Nunito">
            <span className="font-semibold">Region: </span>
            {props.countryDetail.region}
          </h3>
          <h3 className="font-Nunito">
            <span className="font-semibold">Sub Region: </span>
            {props.countryDetail.subregion}
          </h3>
          <h3 className="font-Nunito">
            <span className="font-semibold">Capital: </span>
            {props.countryDetail.capital && props.countryDetail.capital[0]}
          </h3>
        </div>
        <div>
          <h3 className="font-Nunito">
            <span className="font-semibold">Top Level Domain: </span>
            {props.countryDetail.tld[0]}
          </h3>
          <h3 className="font-Nunito">
            <span className="font-semibold">Currencies: </span>
            {props.countryDetail.currencies &&
              props.countryDetail.currencies[
                Object.keys(props.countryDetail.currencies)[0]
              ].name}
          </h3>
          <h3 className="font-Nunito">
            <span className="font-semibold">Languages: </span>
            {props.countryDetail.languages &&
              props.countryDetail.languages[
                Object.keys(props.countryDetail.languages)[0]
              ]}
          </h3>
        </div>
      </div>
    </>
  );
}

export default InfosDetails;
