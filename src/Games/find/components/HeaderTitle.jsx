import Subtitle from "../../../components/Utils/Subtitle";

export function HeaderTitle({
  countriesInGame,
  handleKeyDown,
  guess,
  setGuess,
  search,
}) {
  return (
    <>
      <Subtitle
        text={`Find all the countries that start with the letter 
    ${countriesInGame[0].name.common.substring(0, 1)}`}
      />
      <div className="w-full flex justify-center items-center mt-8">
        <input
          className="sm:w-3/5 w-4/5 p-2 sm:p-4 border-[1px] shadow-lg rounded-xl text-primary dark:bg-darkInput dark:text-lightBackground"
          type="text"
          onKeyDown={(e) => handleKeyDown(e)}
          value={guess}
          name=""
          id=""
          onChange={(e) => {
            setGuess(e.target.value);
          }}
        />
        <div
          onClick={search}
          className="sm:p-4 p-2 cursor-pointer bg-primary rounded-xl flex items-center sm:ml-6 ml-2 border"
        >
          <span className="material-symbols-outlined text-white">done</span>
        </div>
      </div>
    </>
  );
}
