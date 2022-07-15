import Filters from "../components/Home/Filters/filters";
import CardsView from "../components/Home/cardsView";

function Home({
  setDetail,
  setCountryDetail,
  countries,
  setCountriesDisplayed,
  countriesDisplayed,
}) {
  return (
    <>
      <Filters
        countries={countries}
        setCountriesDisplayed={setCountriesDisplayed}
      />
      {countriesDisplayed && (
        <CardsView
          setCountryDetail={setCountryDetail}
          setDetail={setDetail}
          countriesDisplayed={countriesDisplayed}
        />
      )}
    </>
  );
}

export default Home;
