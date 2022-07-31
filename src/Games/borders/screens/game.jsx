import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { useMap, Pane, Circle } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import Loader from "../../../components/Utils/Loader";
import RubberBand from "react-reveal/RubberBand";
import { getCountries } from "../../../services/countries/getCountries";
import getCountryFromCca from "../../common/utils/getCountryFromCca";
import getDatasBorders from "../utils/getDatasBorders";
import addBorderNames from "../utils/addBorderNames";
import Popup from "reactjs-popup";
import Title from "../../../components/Utils/Title";
import { Button } from "../../../components/Utils/Button";
import Subtitle from "../../../components/Utils/Subtitle";
import { Timer } from "../../common/components/game/Timer";
import { Round } from "../../common/components/game/Round";
import { useInterval } from "../../../utils/hooks/useInterval";
import { updateLevel } from "../../../services/levels/updateLevel";
import { serverTimestamp } from "firebase/firestore";
import { saveGame } from "../../../services/user/saveGame";

export default function BorderGame({ score, setScore, setXpWon, setFinished }) {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [numberTurn, setNumberTurn] = useState(0);
  const [roundFinished, setRoundFinished] = useState(false);
  const [goodAnswer, setGoodAnswer] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [secondsRound, setSecondsRound] = useState(45);
  const [currentCountry, setCurrentCountry] = useState({});
  const [round, setRound] = useState(0);
  const mapChildRef = useRef();

  useEffect(() => {
    getDatasBorders().then((data) => {
      setPaths((state) => {
        state = data;
        setCurrentCountry(data[0].start);
        return state;
      });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  useInterval(() => {
    if (secondsLeft > 0) {
      setSecondsLeft(secondsLeft - 1);
    } else {
      if (!roundFinished) {
        setRoundFinished(true);
        setGoodAnswer(false);
        finish();
      }
    }
  }, 1000);

  const next = () => {
    setRound((state) => {
      if (state === 9) {
        finishGame();
      } else {
        state = round + 1;
        let newCountry = paths[state]?.start;
        setCurrentCountry(newCountry);
        mapChildRef.current.flyTo(newCountry.latlng[0], newCountry.latlng[1]);
        return state;
      }
    });
    setNumberTurn(0);
    setSecondsLeft(45);
    setRoundFinished(false);
  };

  const answer = (name) => {
    let newCountry = countries.find((c) => c.name.common === name);
    setNumberTurn(numberTurn + 1);
    newCountry = addBorderNames(newCountry, countries);
    setCurrentCountry(newCountry);
    console.log(newCountry);
    mapChildRef.current.flyTo(newCountry.latlng[0], newCountry.latlng[1]);

    if (newCountry.cca3 == paths[round].end.cca3) {
      setGoodAnswer(true);
      setScore(score + (20 - numberTurn));
      setSecondsRound(45 - secondsLeft);
      setRoundFinished(true);
      finish();
    }

    if (numberTurn >= 19) {
      setGoodAnswer(false);
      setRoundFinished(true);
      finish();
    }
  };

  const finishGame = () => {
    setXpWon((state) => {
      state = score;
      updateLevel(state);
      const game = {
        game: "Borders",
        score: score,
        difficulty: 1,
        time: "No Time",
        xpWon: state,
        date: serverTimestamp(),
      };
      saveGame(game);
      return state;
    });
    setFinished(true);
  };

  const finish = () => {
    document.getElementById("trigger-button")?.click();
  };

  return (
    <div>
      {loading && paths.length === 0 ? (
        <Loader />
      ) : (
        <div className="overflow-x-hidden">
          <div className="flex w-full justify-evenly mt-4">
            <div className="flex justify-center align-center border-2 rounded-md p-4">
              <h1>START :</h1>
              <img
                src={paths[round]?.start.flags.png}
                width={30}
                alt=""
                className="mr-4 ml-4"
              />
              <p>{paths[round]?.start.name.common}</p>
            </div>
            <div className="flex justify-center align-center border-2 rounded-md p-4">
              <h1>CURRENT :</h1>
              <img
                src={currentCountry?.flags.png}
                className="mr-4 ml-4"
                width={30}
                alt=""
              />
              <p>{currentCountry?.name.common}</p>
            </div>
            <div className="flex justify-center align-center border-2 rounded-md p-4">
              <h1>TARGET :</h1>
              <img
                src={paths[round]?.end?.flags.png}
                width={30}
                className="mr-4 ml-4"
                alt=""
              />
              <p>{paths[round]?.end?.name.common}</p>
            </div>
          </div>

          <Popup
            closeOnDocumentClick={false}
            trigger={<button id="trigger-button"></button>}
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
                <Title
                  text={goodAnswer ? "Congratulations ! 😍" : "Ow no 😭"}
                />
                <Subtitle
                  text={
                    goodAnswer
                      ? `You did it in ${numberTurn} tries and ${secondsRound} seconds`
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
                      next();
                    }}
                  />
                </div>
              </RubberBand>
            )}
          </Popup>
          <div className="flex justify-around items-center">
            <div className="p-4 rounded-full border-4 border-primary h-24 w-24 flex justify-center items-center">
              <h1 className="text-2xl font-bold text-primary">{secondsLeft}</h1>
            </div>
            <MapContainer
              center={[paths[0].start.latlng[0], paths[0].start.latlng[1]]}
              zoom={7}
              maxZoom={7}
              dragging={false}
              scrollWheelZoom={false}
              zoomControl={false}
              style={{ height: "55vh", width: "70%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="http://mt2.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
              />

              <MapChild ref={mapChildRef} />
            </MapContainer>
            <Round round={round} numberRound={10} />
          </div>
          <div className="flex w-full justify-center">
            <Subtitle text={`Number of travel : ${numberTurn}`} />
          </div>
          {countries.length > 0 && currentCountry && (
            <div className="flex justify-center m-6">
              {currentCountry.borderNames?.map((b, index) => (
                <div
                  key={index}
                  className="border-2 p-4 rounded-md ml-2 mr-2 cursor-pointer transition hover:scale-110 w-48 h16 justify-center flex items-center"
                  onClick={() => answer(b)}
                >
                  <span className="text-center">{b}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const MapChild = forwardRef((props, ref) => {
  const map = useMap();
  useImperativeHandle(ref, () => ({
    flyTo(lat, lng) {
      map.flyTo([lat, lng], 7, { duration: 0.5 });
    },
  }));
});
