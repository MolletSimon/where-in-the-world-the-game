import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Subtitle from "../../../components/Utils/Subtitle";
import Title from "../../../components/Utils/Title";
import { getLevels } from "../../../services/levels/getLevels";
import ActualLevel from "../components/finish/actualLevel";
import { Buttons } from "../components/finish/Buttons";
import RubberBand from "react-reveal/RubberBand";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Popup from "reactjs-popup";
import { Button } from "../../../components/Utils/Button";

export default function EndScreen({
  score,
  setFinished,
  setDifficultySelected,
  setScore,
  xpWon,
  setXpWon,
}) {
  const [level, setLevel] = useState({});
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  useEffect(() => {
    getLevels().then((res) => {
      const data = res?.data();
      setLevel(data);
    });
  }, []);

  const newGame = () => {
    setFinished(false);
    setDifficultySelected(false);
    setScore(0);
    setXpWon(0);
  };

  return (
    <div className="min-h-[100vh] bg-lightBackground dark:bg-darkBackground">
      {level.level ? (
        <div className="flex flex-col items-center min-h-[80vh] justify-center gap-4 md:gap-0 md:justify-around">
          {level.newLevel && <Confetti width={width} height={height} />}

          <div className="lg:w-1/2">
            {level.newLevel && !level.newRank ? (
              <Popup
                defaultOpen={true}
                modal
                nested
                overlayStyle={{
                  background: "rgba(0,0,0,0.5)",
                }}
                contentStyle={{
                  padding: "30px 200px 30px 200px",
                  borderRadius: "20px",
                  background: "white",
                }}
              >
                {(close) => (
                  <RubberBand className="w-full">
                    <Title text="New Level ! 😍" />
                    <Subtitle text={`You are now level : ${level.level}`} />
                    <div className="mt-6">
                      <Button
                        background="#0E94D7"
                        text="Yay !"
                        color="white"
                        method={close}
                      />
                    </div>
                  </RubberBand>
                )}
              </Popup>
            ) : (
              <Title text="Game over !" />
            )}

            {level.newRank && (
              <Popup
                defaultOpen={true}
                modal
                nested
                overlayStyle={{
                  background: "rgba(0,0,0,0.5)",
                }}
                contentStyle={{
                  padding: "80px",
                  borderRadius: "20px",
                  background: "white",
                }}
              >
                {(close) => (
                  <RubberBand className="w-full flex justify-center modal flex-row">
                    <div className="mb-10">
                      <Title margin="0" text="New rank !" />
                      <Subtitle text={`Your are now a ${level.rank}`} />
                      <div className="flex justify-center w-full mt-6">
                        <img
                          src={`icons/Ranks/${level.rank}.png`}
                          alt={level.rank}
                          width={75}
                        />
                      </div>
                    </div>
                    <Button
                      background="#0E94D7"
                      text="Yay !"
                      color="white"
                      method={close}
                    />
                  </RubberBand>
                )}
              </Popup>
            )}
            <Subtitle text={`Your score is ${score}/10`} />
            <ActualLevel level={level}></ActualLevel>
            <Subtitle
              text={`Congratulations : You have won ${Math.floor(xpWon)}xp`}
            />
            <Subtitle text={`Your rank : ${level.rank}`} />
          </div>
          <Buttons navigate={navigate} newGame={newGame}></Buttons>
        </div>
      ) : (
        <div className="pt-20">
          <Title text="Game over !" />
          <Subtitle text={`Your score is ${score}/10`} />
          <Subtitle text="You are currently not logged in so you didn't win any xp." />
          <div className="flex justify-center">
            <Buttons navigate={navigate} newGame={newGame} />
          </div>
        </div>
      )}
    </div>
  );
}
