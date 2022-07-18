import { PhoneMultiFactorGenerator } from "firebase/auth";

export default function Title({ text, margin }) {
  return (
    <h1
      className={`font-semibold text-5xl text-center ${
        margin ? `mt-${margin}` : "mt-16"
      } `}
    >
      {text}
    </h1>
  );
}
