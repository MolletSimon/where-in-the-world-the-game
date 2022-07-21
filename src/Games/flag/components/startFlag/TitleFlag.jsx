import Title from "../../../../components/Utils/Title";

export function TitleFlag() {
  return (
    <div className="flex justify-evenly items-center m-8">
      <img src="images/olympic-games.png" alt="flag" />
      <Title text="Welcome to the flag !" margin="0" />
      <img src="images/olympic-games.png" alt="flag" />
    </div>
  );
}
