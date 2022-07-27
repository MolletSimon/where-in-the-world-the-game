export function GamesSaved(props) {
  return (
    <div className="h-96 w-full flex justify-center flex-col">
      <div className="self-center w-2/3">
        <h3 className="text-end italic">
          Number of games played : {props.games.length}
        </h3>
      </div>
      <table className="table table-fixed border-2 border-separate rounded-lg w-2/3 mt-10 self-center">
        <thead className="table-header-group p-6 ">
          <tr>
            <th className="border-b-2 text-center p-4 text-primary">Game</th>
            <th className="border-b-2 text-center p-4 text-primary">Score</th>
            <th className="border-b-2 text-center p-4 text-primary">
              Difficulty
            </th>
            <th className="border-b-2 text-center p-4 text-primary">Time</th>
            <th className="border-b-2 text-center p-4 text-primary">Xp won</th>
          </tr>
        </thead>
        <tbody>
          {props.games.length > 0 &&
            props.games.map((game, index) => (
              <tr key={index}>
                <td className="text-center p-4">{game.game}</td>
                <td className="text-center p-4">{game.score}/10</td>
                <td className="text-center p-4">
                  {game.difficulty === 1 && "Easy"}
                  {game.difficulty === 2 && "Medium"}
                  {game.difficulty === 3 && "Hard"}
                </td>
                <td className="text-center p-4">{game.time}sec</td>
                <td className="text-center p-4">{game.xpWon}xp</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
