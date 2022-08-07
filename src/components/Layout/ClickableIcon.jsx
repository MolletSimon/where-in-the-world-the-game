export function ClickableIcon({ method, icon, label, darkMode, title }) {
  return (
    <div className="flex ml-5 items-center mr-2" onClick={method}>
      <span
        className="material-symbols-outlined mr-3 dark:text-darkText"
        title={title}
      >
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
