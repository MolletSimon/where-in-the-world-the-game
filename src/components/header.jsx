function Header({ darkMode, setDarkmode }) {
  const switchDarkMode = () => {
    setDarkmode(!darkMode);
  };

  return (
    <header
      className="bg-lightBackground dark:bg-darkBackground flex justify-between 
      md:p-10 p-6 drop-shadow-lg items-center"
    >
      <h1
        className="text-xl md:text-3xl font-extrabold text-lightText dark:text-darkText
      font-Nunito ml-3"
      >
        Where in the world ?
      </h1>
      <div
        className="mr-3 cursor-pointer flex items-center"
        onClick={switchDarkMode}
      >
        {darkMode ? (
          <span className="material-symbols-outlined mr-3 dark:text-darkText">
            dark_mode
          </span>
        ) : (
          <span className="material-symbols-outlined mr-3">dark_mode</span>
        )}

        <h3 className="font-Nunito font-semibold text-md md:text-xl dark:text-darkText">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </h3>
      </div>
    </header>
  );
}

export default Header;
