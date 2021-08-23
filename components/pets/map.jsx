import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
const CMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={props.defaultCenter}
      center={props.center}
    >
      {props.children}
    </GoogleMap>
  ))
);

export const MapContainer = () => {
  return (
    <div className="pet-info-body-container">
      <CMap
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&libraries=geometry,drawing,places`}
        loadingElement={<div className="pet-info-body-container" />}
        containerElement={<div className="pet-info-body-container" />}
        mapElement={<div style={{ height: `100%` }} />}
        center={{ lat: -0.1081339, lng: -78.4699519 }}
      >
        <Marker position={{ lat: -0.1081339, lng: -78.4699519 }} />
      </CMap>
    </div>
  );
};
