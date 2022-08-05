// components
import Header from "../components/Layout/header";
import Loader from "../components/Utils/Loader";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// auth
import { useAuthState } from "react-firebase-hooks/auth";

// router
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// react
import { useState, useEffect } from "react";
import { getLevels } from "../services/levels/getLevels";
import Footer from "../components/Layout/footer";
import { isThemeDark } from "../utils/isThemeDark";

function Home({ auth }) {
  const [user, loading, error] = useAuthState(auth);
  const [darkMode, setDarkmode] = useState(false);
  const [level, setLevel] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setDarkmode(isThemeDark());
    if (!loading) {
      if (!user) navigate("/login");
      else {
        getLevels().then((res) => {
          setLevel(res.data());
        });
        navigate(location.pathname === "/" ? "select-game" : location.pathname);
      }
    }
  }, [user, loading]);

  return (
    <div className={`${darkMode && "dark"}`}>
      <Header
        auth={auth}
        darkMode={darkMode}
        setDarkmode={setDarkmode}
        user={user}
        level={level}
      />
      <div className="dark:bg-darkBackground bg-lightBackground transition-colors duration-500">
        <Outlet />
      </div>
      {/* <PlayerCard user={user} level={level}></PlayerCard> */}

      {loading && !error && !user ? <Loader /> : <></>}
      <Footer />
    </div>
  );
}

export default Home;
