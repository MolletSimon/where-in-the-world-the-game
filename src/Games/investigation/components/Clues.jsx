import { useEffect, useState } from "react";
import Jello from "react-reveal/Jello";
import Loader from "../../../components/Utils/Loader";
import commafy from "../../../utils/commafy";
import getDataClues from "../utils/getDataClues";
import { Clue } from "./Clue";

export function Clues({ round, countriesInvestigation, difficulty }) {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    setDatas(getDataClues(difficulty, countriesInvestigation, round));
  }, [round]);

  return (
    <div className="flex justify-center">
      {datas.length == 0 && <Loader />}

      {datas.length > 0 && (
        <Jello spy={round}>
          <Clue ml="m-16" image={datas[0].image} text={datas[0].text} />
          <Clue
            mt="mt-32"
            image={datas[1].image}
            ml="ml-32"
            text={datas[1].text}
          />
          <Clue
            image={datas[2].image}
            text={datas[2].text}
            ml="ml-32"
            mt="mt-44"
          />
          <Clue
            image={datas[3].image}
            ml="ml-32"
            mr="mr-16"
            mt="mt-16"
            text={datas[3].text}
          />
        </Jello>
      )}
    </div>
  );
}
