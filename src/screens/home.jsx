// components
import Header from "../components/Layout/header";
import Loader from "../components/Utils/Loader";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { getLevels, PlayerCard } from "../components/Home/playerCard";

// auth
import { useAuthState } from "react-firebase-hooks/auth";

// router
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// react
import { useState, useEffect } from "react";

function Home({ auth, db }) {
  const [user, loading, error] = useAuthState(auth);
  const [darkMode, setDarkmode] = useState(false);
  const [level, setLevel] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!user) navigate("/login");
      else {
        getLevels(db, user.uid).then((res) => {
          setLevel(res.data());
        });
        navigate(location.pathname === "/" ? "select-game" : location.pathname);
      }
    }
  }, [user]);

  return (
    <div className={`${darkMode && "dark"}`}>
      <Header auth={auth} darkMode={darkMode} setDarkmode={setDarkmode} />
      <Outlet />
      <PlayerCard user={user} level={level}></PlayerCard>

      {loading && !error && !user ? <Loader /> : <></>}
    </div>
  );
}

export default Home;
