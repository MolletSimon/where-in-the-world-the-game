export function FooterFind({ secondsLeft, score }) {
  return (
    <div className="flex justify-evenly w-/5 ml-auto mr-auto mt-20 items-center">
      <div
        className="hidden xl:flex justify-center text-center 
  items-center border-2 shadow-md border-primary dark:border-white
shadow-primary dark:shadow-white -skew-x-6 rounded-md h-20 min-w-28 p-8 
text-primary dark:text-white font-bold"
      >
        <h2 className="font-bold text-primary dark:text-white lg:text-2xl">
          Time left : {secondsLeft}sec
        </h2>
        <h1 className="m-3">/</h1>
        <h2 className="font-bold text-primary dark:text-white lg:text-2xl">
          Score: {score}pts
        </h2>
      </div>
    </div>
  );
}
