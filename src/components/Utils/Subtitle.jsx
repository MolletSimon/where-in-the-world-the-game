export default function Subtitle({ text }) {
  return (
    <h3 className="text-ligthInput dark:text-lightGray text-md sm:text-lg md:text-xl lg:text-2xl font-normal text-center ml-3 mr-3 mt-4 sm:mt-6 sm:ml-6 sm:mr-6">
      {text}
    </h3>
  );
}
