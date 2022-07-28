import Jello from "react-reveal/Jello";
import commafy from "../../../utils/commafy";
import { Clue } from "./Clue";

export function Clues({ round, countriesInvestigation }) {
  return (
    <div className="flex justify-center">
      <Jello spy={round}>
        <Clue
          ml="m-16"
          image="population"
          text={commafy(countriesInvestigation[round].population)}
        />
        <Clue
          mt="mt-32"
          image="eiffel-tower"
          ml="ml-32"
          text={countriesInvestigation[round].capital[0]}
        />
        <Clue
          image="subregion"
          text={countriesInvestigation[round].subregion}
          ml="ml-32"
          mt="mt-44"
        />
        <Clue
          image="languages"
          ml="ml-32"
          mr="mr-16"
          mt="mt-16"
          text={Object.values(countriesInvestigation[round].languages).map(
            (c, i) => (
              <span key={i}>
                {i > 0 && ", "}
                {c}
              </span>
            )
          )}
        />
      </Jello>
    </div>
  );
}
