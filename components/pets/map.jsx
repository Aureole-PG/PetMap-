/*global google*/
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  D,
} from "react-google-maps";
export const MapContainer = ({ allowUser, userPosition, petPosition }) => {
  const defaultOptions = {
    mapTypeControlOptions: {
      position: "RIGHT_TOP",
      mapTypeIds: ["roadmap", "satellite", "custom-map"],
    },
    zoomControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  };

  return (
    <>
      <CMap
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&libraries=geometry,drawing,places`}
        loadingElement={<div className="window-height" />}
        containerElement={<div className="window-height" />}
        mapElement={<div style={{ height: `100%` }} />}
        center={{ lat: -0.1081339, lng: -78.4699519 }}
        defaultOptions={defaultOptions}
      >
        <Marker position={{ lat: -0.1081339, lng: -78.4699519 }} />
        {allowUser && <Marker position={userPosition} />}
      </CMap>
    </>
  );
};

const CMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={props.defaultCenter}
      center={props.center}
      defaultOptions={props.defaultOptions}
    >
      {props.children}
    </GoogleMap>
  ))
);
