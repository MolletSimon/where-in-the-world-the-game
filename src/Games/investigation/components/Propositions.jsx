import { isThemeDark } from "../../../utils/isThemeDark";

export function Propositions({
  countriesInvestigation,
  round,
  answered,
  submit,
}) {
  const darkTheme = isThemeDark();
  const bgColor = isThemeDark() ? "#2B3945" : "white";
  const color = isThemeDark() ? "white" : "black";
  return (
    <div className="flex justify-center items-center mt-32">
      <div className="w-2/3 flex flex-row">
        {countriesInvestigation?.length > 0 &&
          countriesInvestigation[round].propositions.map((c, index) => (
            <div
              key={index}
              onClick={() => submit(c)}
              style={{
                background: answered && c.right ? "#3AB795" : bgColor,
                color: answered && c.right ? "white" : color,
              }}
              className="border-2 ml-8 p-6 md:p-4 w-full rounded-2xl mb-4 cursor-pointer h-20
flex justify-center items-center text-center transition hover:scale-125 dark:border-darkInput"
            >
              {c.name}
            </div>
          ))}
      </div>
    </div>
  );
}
