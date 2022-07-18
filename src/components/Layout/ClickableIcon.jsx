export function ClickableIcon({ switchDarkMode, icon, label, darkMode }) {
  return (
    <div className="flex ml-5 items-center mr-2" onClick={switchDarkMode}>
      <span className="material-symbols-outlined mr-3 dark:text-darkText">
        {icon}
      </span>
      {label ? (
        <h3 className={`hover:underline ${darkMode && "text-white"}`}>
          {label}
        </h3>
      ) : (
        <></>
      )}
    </div>
  );
}
