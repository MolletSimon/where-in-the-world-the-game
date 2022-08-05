export function Question({ paths, round, currentCountry }) {
  return (
    <div className="flex w-full justify-evenly mt-4">
      <CountryCard
        alt={"flag-start"}
        img={paths[round]?.start.flags.png}
        label="START :"
        content={paths[round]?.start.name.common}
      />
      <CountryCard
        alt={"flag-current"}
        img={currentCountry?.flags.png}
        label="CURRENT :"
        content={currentCountry?.name.common}
      />
      <CountryCard
        alt={"flag-end"}
        img={paths[round]?.end?.flags.png}
        label="TARGET :"
        content={paths[round]?.end?.name.common}
      />
    </div>
  );
}

export function CountryCard({ label, img, alt, content }) {
  return (
    <div className="flex justify-center align-center border-2 rounded-md p-4 dark:border-darkInput">
      <h1 className="lg:block hidden dark:text-white">{label}</h1>
      <img
        src={img}
        width={30}
        alt={alt}
        className="mr-4 ml-4 sm:block hidden"
      />
      <p className="dark:text-white">{content}</p>
    </div>
  );
}
