function BorderCountries({ countryDetail, countries, setCountryDetail }) {
  return (
    <div className="mt-10 flex items-center flex-wrap mr-2">
      <h3 className="text-xl font-semibold dark:text-darkText">
        Border countries :
      </h3>
      {countryDetail.borders?.map((c, index) => (
        <Country
          setCountryDetail={setCountryDetail}
          key={index}
          countries={countries}
          country={c}
        />
      ))}
    </div>
  );
}

function Country({ country, countries, setCountryDetail }) {
  const borderCountry = countries.find((c) => c.cca3 == country);
  const nameCountry = borderCountry?.name?.common;

  const onClickDetail = () => {
    setCountryDetail(borderCountry);
  };

  return (
    <div
      className="p-3 border-[1px] border-lightBackground dark:bg-darkInput ml-3 
    rounded-md cursor-pointer w-auto shadow-lg"
      onClick={onClickDetail}
    >
      <span className="whitespace-nowrap font-Nunito dark:text-white">
        {nameCountry && nameCountry}
      </span>
    </div>
  );
}

export default BorderCountries;
