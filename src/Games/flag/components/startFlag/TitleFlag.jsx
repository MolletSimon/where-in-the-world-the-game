import Title from "../../../../components/Utils/Title";

export function TitleFlag() {
  return (
    <div className="flex justify-evenly items-center m-8">
      <img
        src="images/olympic-games.png"
        alt="flag"
        width={80}
        className="hidden sm:block md:hidden"
      />
      <img
        src="images/olympic-games.png"
        alt="flag"
        className="md:block hidden"
      />
      <Title text="Welcome to the flag !" margin="0" />
      <img
        src="images/olympic-games.png"
        alt="flag"
        width={80}
        className="hidden sm:block md:hidden"
      />
      <img
        src="images/olympic-games.png"
        alt="flag"
        className="md:block hidden"
      />
    </div>
  );
}
