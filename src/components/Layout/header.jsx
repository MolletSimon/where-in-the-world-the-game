import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { PlayerCard } from "../Home/playerCard";
import { ClickableIcon } from "./ClickableIcon";

function Header({ darkMode, setDarkmode, auth, user, level }) {
  const switchDarkMode = () => {
    setDarkmode(!darkMode);
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <header
      className="bg-lightBackground dark:bg-darkBackground flex justify-between 
    md:p-6 p-4 drop-shadow-lg items-center"
    >
      <HeaderTitle></HeaderTitle>

      <div className="mr-3 cursor-pointer flex md:w-auto  items-center">
        <a
          href="https://where-in-the-world-zeta-drab.vercel.app/"
          target="_blank"
          className="flex items-center"
        >
          <ClickableIcon icon="import_contacts" />
        </a>
        <ClickableIcon
          method={switchDarkMode}
          icon={darkMode ? "light_mode" : "dark_mode"}
          darkMode={darkMode}
        />

        <ClickableIcon method={logout} icon="logout" darkMode={darkMode} />
        <div className="">
          <PlayerCard user={user} level={level} />
        </div>
        {/* <div className="flex flex-col group">
          <select name="" id="">
            <option value="" className="bg-note">
              English
            </option>
          </select>

          <img
            src="images/france.png"
            alt="english"
            width={30}
            className="ml-8 hidden group-hover:block"
          />
        </div> */}
      </div>
    </header>
  );
}

function HeaderTitle() {
  return (
    <div>
      <Link to="/select-game" className="flex items-center">
        <img src="images/earth.png" className="mr-12" alt="earth" width="60" />
        <h1
          className="hidden sm:block text-md sm:text-xl md:text-3xl font-semibold 
          text-lightText dark:text-darkText ml-3"
        >
          Where in the world !
        </h1>
      </Link>
    </div>
  );
}

export default Header;
