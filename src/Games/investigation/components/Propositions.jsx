export function Propositions({
  countriesInvestigation,
  round,
  answered,
  submit,
}) {
  return (
    <div className="flex justify-center items-center mt-32">
      <div className="w-2/3 flex flex-row">
        {countriesInvestigation?.length > 0 &&
          countriesInvestigation[round].propositions.map((c, index) => (
            <div
              key={index}
              onClick={() => submit(c)}
              style={{
                background: answered && c.right ? "#3AB795" : "white",
                color: answered && c.right ? "white" : "black",
              }}
              className="border-2 ml-8 p-6 md:p-4 w-full rounded-2xl mb-4 cursor-pointer h-20
flex justify-center items-center text-center transition hover:scale-125"
            >
              {c.name}
            </div>
          ))}
      </div>
    </div>
  );
}
