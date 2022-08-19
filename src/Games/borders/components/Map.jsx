import { forwardRef, useImperativeHandle } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet";
import { Round } from "../../common/components/game/Round";

export function Map({ paths, secondsLeft, mapChildRef, round }) {
  return (
    <div className="flex justify-around items-center">
      <div className="p-4 rounded-full border-4 border-primary h-24 w-24 hidden xl:flex justify-center items-center">
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
      <Round round={round} numberRound={5} />
    </div>
  );
}

export const MapChild = forwardRef((props, ref) => {
  const map = useMap();
  useImperativeHandle(ref, () => ({
    flyTo(lat, lng) {
      map.flyTo([lat, lng], 7, { duration: 0.5 });
    },
  }));
});
