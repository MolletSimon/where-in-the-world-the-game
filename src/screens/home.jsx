// import Filters from "../components/Home/Filters/filters";
// import CardsView from "../components/Home/cardsView";
import Header from "../components/Layout/header";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Utils/Loader";
// import { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { MutatingDots } from "react-loader-spinner";
import { useState } from "react";

function Home({ auth }) {
  const [user, loading, error] = useAuthState(auth);
  const [darkMode, setDarkmode] = useState(false);

  if (!loading) {
    if (!user) return <Navigate to="/login" />;
  } else {
    if (!error) {
      return <Loader />;
    } else {
      console.error(error);
    }
  }

  return (
    <div className={`${darkMode && "dark"}`}>
      <Header auth={auth} darkMode={darkMode} setDarkmode={setDarkmode} />
      <Link to="/test">Go to test mon reuf</Link>
      <Outlet />
    </div>
    //   <Filters
    //     countries={countries}
    //     setCountriesDisplayed={setCountriesDisplayed}
    //   />
    //   {countriesDisplayed && (
    //     <CardsView
    //       setCountryDetail={setCountryDetail}
    //       setDetail={setDetail}
    //       countriesDisplayed={countriesDisplayed}
    //     />
    //   )}
    // </>
  );
}

export default Home;
