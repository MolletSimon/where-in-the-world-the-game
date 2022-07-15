import Search from "./components/search";
import Filter from "./components/filter";

function Filters({ countries, setCountriesDisplayed }) {
  return (
    <div
      className="md:m-0 flex justify-between 
    items-center md:flex-row flex-col mt-10"
    >
      <Search
        countries={countries}
        setCountriesDisplayed={setCountriesDisplayed}
      />
      <Filter
        countries={countries}
        setCountriesDisplayed={setCountriesDisplayed}
      />
    </div>
  );
}

export default Filters;
