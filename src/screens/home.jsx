// import Filters from "../components/Home/Filters/filters";
// import CardsView from "../components/Home/cardsView";
import Header from "../components/Layout/header";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/Utils/Loader";
// import { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useState, useEffect } from "react";
import { collection, getFirestore, doc } from "firebase/firestore";

function Home({ auth, db, app }) {
  const [user, loading, error] = useAuthState(auth);
  const [darkMode, setDarkmode] = useState(false);
  const [value, loadingDb, errorDb] = useDocument(
    doc(getFirestore(app), "levels", user.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  if (!loadingDb && !errorDb && user) {
    user.level = value.data().level;
  }

  if (errorDb) {
    console.error(errorDb.message);
  }
  // const [snapshot, loadingDb, errorDb] = useCollection(
  //   collection(getFirestore(app), "levels")
  // );

  // if (!loadingDb && !errorDb && user) {
  // }

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) navigate("/login");
      else navigate("/select-game");
    }
  }, [user]);

  return (
    <div className={`${darkMode && "dark"}`}>
      <Header auth={auth} darkMode={darkMode} setDarkmode={setDarkmode} />
      <Outlet />
      <p className="text-end">
        {user.displayName} - Level {user.level}
      </p>
      {loading && !error && !user ? <Loader /> : <></>}
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
