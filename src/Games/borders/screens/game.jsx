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
import { getCountries } from "../../../services/countries/getCountries";
import getCountryFromCca from "../../common/utils/getCountryFromCca";
import getDatasBorders from "../utils/getDatasBorders";
import addBorderNames from "../utils/addBorderNames";

export default function BorderGame() {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
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

  const answer = (name) => {
    let newCountry = countries.find((c) => c.name.common.includes(name));
    newCountry = addBorderNames(newCountry, countries);
    setCurrentCountry(newCountry);
    mapChildRef.current.flyTo(newCountry.latlng[0], newCountry.latlng[1]);
  };

  return (
    <div>
      {loading && paths.length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className="flex w-full justify-evenly m-6">
            <div className="flex justify-center align-center border-2 rounded-md p-4">
              <h1>START :</h1>
              <img
                src={paths[round].start.flags.png}
                width={30}
                alt=""
                className="mr-4 ml-4"
              />
              <p>{paths[round].start.name.common}</p>
            </div>
            <div className="flex justify-center align-center border-2 rounded-md p-4">
              <h1>CURRENT :</h1>
              <img
                src={currentCountry.flags.png}
                className="mr-4 ml-4"
                width={30}
                alt=""
                srcset=""
              />
              <p>{currentCountry.name.common}</p>
            </div>
            <div className="flex justify-center align-center border-2 rounded-md p-4">
              <h1>TARGET :</h1>
              <img
                src={paths[round].end.flags.png}
                width={30}
                className="mr-4 ml-4"
                alt=""
                srcset=""
              />
              <p>{paths[round].end.name.common}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <MapContainer
              center={[paths[0].start.latlng[0], paths[0].start.latlng[1]]}
              zoom={7}
              dragging={false}
              scrollWheelZoom={false}
              zoomControl={false}
              style={{ height: "60vh", width: "70%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="http://mt1.google.com/vt?lyrs=m&x={x}&y={y}&z={z}"
              />

              <MapChild ref={mapChildRef} />
            </MapContainer>
          </div>
          {countries.length > 0 && currentCountry && (
            <div className="flex justify-center m-6">
              {currentCountry.borderNames.map((b) => (
                <div
                  className="border-2 p-4 rounded-md ml-2 mr-2 cursor-pointer transition hover:scale-110 w-32 h16 justify-center flex items-center"
                  onClick={() => answer(b)}
                >
                  <span className="text-center">{b}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

const MapChild = forwardRef((props, ref) => {
  const map = useMap();
  useImperativeHandle(ref, () => ({
    flyTo(lat, lng) {
      map.flyTo([lat, lng]);
    },
  }));
});
