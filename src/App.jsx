import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/header";
import Home from "./screens/home";
import Detail from "./screens/detail";

function App() {
  const [darkMode, setDarkmode] = useState(false);
  const [detail, setDetail] = useState(false);
  const [countryDetail, setCountryDetail] = useState({});

  const [countries, setCountries] = useState([]);
  const [countriesDisplayed, setCountriesdisplayed] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((json) => {
        const countriesSorted = json.sort((a, b) =>
          a.name.common > b.name.common
            ? 1
            : b.name.common > a.name.common
            ? -1
            : 0
        );
        setCountries(countriesSorted);
        setCountriesdisplayed(countriesSorted);
      });
  }, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-lightBackground min-h-screen dark:bg-darkBackground">
        <Header darkMode={darkMode} setDarkmode={setDarkmode} />
        {detail ? (
          countryDetail && (
            <Detail
              countries={countries}
              countryDetail={countryDetail}
              setDetail={setDetail}
              setCountryDetail={setCountryDetail}
            />
          )
        ) : (
          <Home
            countries={countries}
            countriesDisplayed={countriesDisplayed}
            setCountriesDisplayed={setCountriesdisplayed}
            setCountryDetail={setCountryDetail}
            setDetail={setDetail}
          />
        )}
        {/* <Outlet /> */}
      </div>
    </div>
  );
}

export default App;
