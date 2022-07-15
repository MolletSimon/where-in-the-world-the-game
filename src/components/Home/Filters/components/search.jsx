function Search({ setCountriesDisplayed, countries }) {
  const search = (event) => {
    setCountriesDisplayed(
      countries.filter((c) =>
        c.name.common.toLowerCase().startsWith(event.target.value.toLowerCase())
      )
    );
  };
  return (
    <div className="md:m-10">
      <input
        type="text"
        className="w-[90vw] p-5 md:w-[600px] md:ml-20 bg-white dark:bg-darkInput 
        dark:text-darkText drop-shadow-lg font-Nunito 
        rounded-lg text-ligthInput font-semibold"
        placeholder="🔍    Search for a country..."
        onChange={(event) => search(event)}
      />
    </div>
  );
}

export default Search;
