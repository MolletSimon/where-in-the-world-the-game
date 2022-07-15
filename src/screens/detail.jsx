import InfosDetails from "../components/Details/infosdetails";
import BorderCountries from "../components/Details/borderCountries";

function ButtonBack(props) {
  return (
    <button
      onClick={props.onClickBack}
      className="p-4 pl-6 pr-6 rounded-md shadow-md m-10 font-Nunito font-semibold 
        flex items-center w-40 justify-center dark:bg-darkInput dark:text-white"
    >
      <span className="material-symbols-outlined">arrow_back_ios</span>
      Back
    </button>
  );
}

function Infos(props) {
  return (
    <div className="grid md:grid-cols-2 mt-20">
      <div className="md:ml-32 flex justify-center md:justify-start">
        <img
          src={props.countryDetail.flags.png}
          className="w-1/2 md:w-3/4 max-h-72"
        />
      </div>
      <div>
        <InfosDetails countryDetail={props.countryDetail}></InfosDetails>
        <BorderCountries
          countries={props.countries}
          countryDetail={props.countryDetail}
          setCountryDetail={props.setCountryDetail}
        ></BorderCountries>
      </div>
    </div>
  );
}

function Detail({ countryDetail, setDetail, countries, setCountryDetail }) {
  const onClickBack = () => {
    setDetail(false);
  };

  return (
    <div>
      <ButtonBack onClickBack={onClickBack}></ButtonBack>
      <Infos
        countryDetail={countryDetail}
        countries={countries}
        setCountryDetail={setCountryDetail}
      ></Infos>
    </div>
  );
}

export default Detail;
