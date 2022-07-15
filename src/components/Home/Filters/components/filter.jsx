function Filter({ countries, setCountriesDisplayed }) {
  const selectRegion = (event) => {
    if (event.target.value != "all")
      setCountriesDisplayed(
        countries.filter((c) => c.region == event.target.value)
      );
    else setCountriesDisplayed(countries);
  };

  return (
    <div className="md:mr-20 md:mt-0 mt-6">
      <select
        className="bg-white dark:bg-darkInput dark:text-white 
        p-6 shadow-md rounded-md"
        onChange={(event) => selectRegion(event)}
      >
        <option defaultValue value="all">
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default Filter;
