// components
import Header from "../components/Layout/header";
import Loader from "../components/Utils/Loader";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { getLevels, PlayerCard } from "../components/Home/playerCard";

// auth
import { useAuthState } from "react-firebase-hooks/auth";

// router
import { Outlet, useNavigate } from "react-router-dom";

// react
import { useState, useEffect } from "react";

function Home({ auth, db }) {
  const [user, loading, error] = useAuthState(auth);
  const [darkMode, setDarkmode] = useState(false);
  const [level, setLevel] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) navigate("/login");
      else {
        getLevels(db, user.uid).then((res) => {
          setLevel(res.data());
        });
        navigate("/select-game");
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
