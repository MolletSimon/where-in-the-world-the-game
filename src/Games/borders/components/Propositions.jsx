export function Propositions(props) {
  return (
    <div>
      {props.length > 0 && props.currentCountry && (
        <div className="flex justify-center m-6 w-full flex-wrap">
          {props.currentCountry.borderNames?.map((b, index) => (
            <div
              key={index}
              className="border-2 p-4 dark:border-darkInput rounded-md ml-2 mr-2 cursor-pointer transition hover:scale-110 w-48 h16 justify-center flex items-center"
              onClick={() => props.answer(b)}
            >
              <span className="text-center dark:text-white">{b}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
