import Flip from "react-reveal/Flip";

export function AnswerCardFind({ index, country }) {
  return (
    <div
      key={index}
      className="border-2 sm:min-w-52 sm:min-h-28 sm:p-6 p-3 flex items-center justify-center rounded-xl text-center"
    >
      {country.found ? (
        <Flip>
          <img
            src={country.flags.png}
            className="h-5 max-h-5 sm:max-h-10 sm:h-10 mr-4 object-cover rounded-md"
            alt="flag"
          />
          <p className="sm:font-semibold text-md sm:text-lg dark:text-lightBackground">
            {country.name.common}
          </p>
        </Flip>
      ) : (
        <>
          <span className="material-symbols-outlined">password</span>
        </>
      )}
    </div>
  );
}
