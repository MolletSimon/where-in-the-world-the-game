import { Button } from "../../../../components/Utils/Button";
import HeadShake from "react-reveal/HeadShake";
import { isThemeDark } from "../../../../utils/isThemeDark";

export function ButtonsDifficulty(props) {
  const theme = !isThemeDark();
  return (
    <div className="w-full mt-14 flex items-center flex-col">
      <HeadShake>
        <div className="xl:w-1/3 w-4/5 mb-2 ">
          <Button
            background={`${theme ? "#22E97F" : "#45CB85"}`}
            color="white"
            text={props.easyText ? props.easyText : "Easy"}
            padding={20}
            method={() => props.selectDifficulty(1)}
          />
        </div>
        <div className="xl:w-1/3 w-4/5 mb-2">
          <Button
            background={`${theme ? "#F2CD60" : "#ED7D3A"}`}
            color="white"
            text={props.mediumText ? props.mediumText : "Medium"}
            padding={20}
            method={() => props.selectDifficulty(2)}
          />
        </div>
        <div className="xl:w-1/3 w-4/5">
          <Button
            background={`${theme ? "#F25757" : "#C44536"}`}
            padding={20}
            color="white"
            text={props.hardText ? props.hardText : "Hard"}
            method={() => props.selectDifficulty(3)}
          />
        </div>
      </HeadShake>
    </div>
  );
}
