import Filters from "../components/Home/Filters/filters";
import CardsView from "../components/Home/cardsView";
import Header from "../components/Layout/header";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { MutatingDots, ThreeDots } from "react-loader-spinner";

function Home({ auth }) {
  const [user, loading, error] = useAuthState(auth);

  if (!loading) {
    if (!auth.currentUser) return <Navigate to="/login" />;
  } else {
    return (
      <MutatingDots
        height="100"
        width="100"
        ariaLabel="loading"
        color="#0E94D7"
        wrapperClass="justify-center items-center h-screen"
      />
    );
  }

  return (
    <>
      <Header auth={auth} />
      <Link to="/test">Go to test mon reuf</Link>
      <Outlet />
    </>
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
