export default function Title({ text, margin }) {
  return (
    <h1
      className={`font-semibold text-lg sm:text-xl md:text-3xl dark:text-lightBackground lg:text-5xl  text-center  md:${
        margin ? `mt-${margin}` : "mt-16"
      } `}
    >
      {text}
    </h1>
  );
}
