export function GamesSaved(props) {
  return (
    <div className="w-full flex justify-center flex-col">
      <div className="hidden md:block self-center w-2/3">
        <h3 className="text-end italic">
          Number of games played : {props.games.length}
        </h3>
      </div>

      <div className="w-full flex justify-center items-center flex-col">
        {props.games.length > 0 &&
          props.games.map((game, index) => (
            <div
              key={index}
              className={` rounded-md p-4 w-4/5 mt-6 grid grid-cols-4 md:grid-cols-5 grid-rows-1 items-center justify-items-cente bg-opacity-10 ${
                getImageAndColorOfGame(game).color
              }`}
            >
              <img
                src={getImageAndColorOfGame(game).image}
                width={35}
                alt="game"
                className="self-start md:ml-10"
              />
              <p className="text-center font-bold italic md:block hidden">
                {game.game}
              </p>
              <p className="text-center">
                {game.score}
                <span>
                  {game.game != "Borders" && game.game != "Find"
                    ? "/10"
                    : " pts"}
                </span>
              </p>
              <p className="text-center">
                {game.time}
                {game.game != "Borders" && " sec"}
              </p>
              <p className="text-center">
                {" "}
                {game.difficulty === 1 && "Easy"}
                {game.difficulty === 2 && "Medium"}
                {game.difficulty === 3 && "Hard"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

function getImageAndColorOfGame(game) {
  let image = "";
  let color = "";
  switch (game.game) {
    case "Borders":
      image = "images/australia.png";
      color = "bg-primary";
      break;
    case "Investigation":
      color = "bg-validGreen";
      image = "images/search.png";
      break;
    case "Flag":
      color = "bg-mandarin";
      image = "images/olympic-games.png";
      break;
    case "Population":
      color = "bg-pink";
      image = "images/people.png";
      break;
    case "Capital":
      color = "bg-fuchsia-400";
      image = "images/eiffel-tower.png";
      break;
    case "Find":
      color = "bg-violet-400";
      image = "images/letter.png";
  }

  return { image, color };
}
