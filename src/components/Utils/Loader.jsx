import { MutatingDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <MutatingDots
      height="100"
      width="100"
      ariaLabel="loading"
      color="#0E94D7"
      secondaryColor="#0E94D7"
      wrapperClass="justify-center items-center h-screen"
    />
  );
}
