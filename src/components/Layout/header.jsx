import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { ClickableIcon } from "./ClickableIcon";

function Header({ darkMode, setDarkmode, auth }) {
  const switchDarkMode = () => {
    setDarkmode(!darkMode);
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <header
      className="bg-lightBackground dark:bg-darkBackground flex justify-between
      md:p-10 p-6 drop-shadow-lg items-center"
    >
      <HeaderTitle></HeaderTitle>
      <div className="mr-3 cursor-pointer flex items-center">
        <Link to="/terms" className="flex items-center">
          <ClickableIcon
            switchDarkMode={switchDarkMode}
            icon="import_contacts"
            label="Wiki"
            darkMode={darkMode}
          />
        </Link>
        <ClickableIcon
          switchDarkMode={switchDarkMode}
          icon={darkMode ? "light_mode" : "dark_mode"}
          label={darkMode ? "Light mode" : "Dark mode"}
          darkMode={darkMode}
        />

        <ClickableIcon
          switchDarkMode={logout}
          icon="logout"
          label="Logout"
          darkMode={darkMode}
        />
      </div>
    </header>
  );
}

function HeaderTitle() {
  return (
    <div className="flex items-center">
      <img src="images/earth.png" className="mr-12" alt="earth" width="60" />
      <h1
        className="text-xl md:text-3xl font-semibold text-lightText dark:text-darkText
       ml-3"
      >
        Where in the world !
      </h1>
    </div>
  );
}

export default Header;
