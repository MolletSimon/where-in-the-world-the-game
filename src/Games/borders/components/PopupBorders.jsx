import RubberBand from "react-reveal/RubberBand";
import Popup from "reactjs-popup";
import Title from "../../../components/Utils/Title";
import { Button } from "../../../components/Utils/Button";
import Subtitle from "../../../components/Utils/Subtitle";
import { isThemeDark } from "../../../utils/isThemeDark";

export function PopupBorders(props) {
  const bgColor = isThemeDark() ? "#202C37" : "white";
  return (
    <Popup
      closeOnDocumentClick={false}
      trigger={<button id="trigger-button"></button>}
      modal
      nested
      overlayStyle={{
        background: "rgba(0,0,0,0.5)",
      }}
      contentStyle={{
        padding: "30px 50px 30px 50px",
        borderRadius: "20px",
        background: bgColor,
      }}
    >
      {(close) => (
        <RubberBand className="w-full">
          <Title
            text={props.goodAnswer ? "Congratulations ! 😍" : "Ow no 😭"}
          />

          <Subtitle
            text={
              props.goodAnswer
                ? `You did it in ${props.numberTurn} tries and ${props.secondsRound} seconds`
                : "You failed to find the country in 45sec !"
            }
          />
          <div className="mt-6">
            <Button
              background="#0E94D7"
              text="Next !"
              color="white"
              method={() => {
                close();
                props.next();
              }}
            />
          </div>
        </RubberBand>
      )}
    </Popup>
  );
}
