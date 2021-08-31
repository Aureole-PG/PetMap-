/*global google*/
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
export const MapContainer = ({ allowUser, userPosition, petPosition }) => {
  const defaultOptions = {
    mapTypeControlOptions: {
      position: "RIGHT_TOP",
      mapTypeIds: ["roadmap", "satellite"],
    },
    zoomControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  };
  return (
    <>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_KEY}>
        <GoogleMap
          mapContainerClassName={"window-height"}
          options={defaultOptions}
          center={petPosition}
          zoom={10}
        >
          <Marker
            icon={{
              url: "/static/pet_gps.png",
              size: { width: 50, height: 50 },
              anchor: { x: 25, y: 50 },
              scaledSize: { width: 50, height: 50 },
            }}
            position={petPosition}
          />
          {allowUser && <Marker position={userPosition} />}
        </GoogleMap>
      </LoadScript>
    </>
  );
};
