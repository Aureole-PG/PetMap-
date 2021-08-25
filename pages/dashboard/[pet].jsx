import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import { useRouter } from "next/router";
import api, { gpsApi } from "../../hooks/axios_client";
import ReactLoading from "react-loading";
import Geocode from "react-geocode";
import { Information } from "../../components/pets/Information";
import { MapContainer } from "../../components/pets/map";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_KEY);

export default function Pet() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState({});
  const [petPosition, setPosition] = useState({
    lat: 0,
    lng: 0,
    direcction: "",
  });

  const [changePosition, setChagePosition] = useState(false);
  const [geolocationAllow, setGeolocationAllow] = useState(false);
  const [userPosition, setUserPosition] = useState({ lat: 0, lng: 0 });
  const [distancia, setDistancia] = useState(0);
  useEffect(() => {
    api
      .get(`/pet?_id=${router.query.pet}`)
      .then((e) => {
        setPet(e.data);
        getLocations(e.data._id, e.data.gps_id);
        setLoading(false);
      })
      .catch((e) => {
        router.back();
      });
  }, []);

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((e) => {
      setGeolocationAllow(e.state === "granted");
    });
    let watch;
    if ("geolocation" in navigator) {
      console.log("Available");
      watch = navigator.geolocation.watchPosition(function (position) {
        const { latitude, longitude } = position.coords;
        setUserPosition({
          lat: latitude,
          lng: longitude,
        });
        latitude !== userPosition.lat && setChagePosition(latitude);
        setDistancia(
          haversine_distance(
            latitude,
            petPosition.lat,
            longitude,
            petPosition.lng
          )
        );
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
    return () => {
      navigator.geolocation.clearWatch(watch);
    };
  }, [changePosition]);

  const getLocations = (pet_id, gps_id) => {
    api
      .get(`/locations?pet_id=${pet_id}&gps_id=${gps_id}`)
      .then((locationResponse) => {
        updateUbication(gps_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUbication = (id) => {
    gpsApi
      .get(`/${pet.gps_id || id}`)
      .then((e) => {
        const { latitud, longitud } = e.data.data;
        Geocode.fromLatLng(`${latitud}`, `${longitud}`).then(
          (response) => {
            const address = response.results[0].formatted_address;
            setPosition({
              lat: parseFloat(latitud),
              lng: parseFloat(longitud),
              direcction: address,
            });
          },
          (error) => {
            console.error(error);
          }
        );
      })
      .catch((e) => {
        console.log("sdasdssdasdas", e);
      });
  };

  if (loading) {
    return (
      <div className="row align-items-center height">
        <div className="col">
          <div className="d-flex justify-content-center">
            <ReactLoading
              type={"bubbles"}
              color={"#00b0ff"}
              height={"20%"}
              width={"20%"}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="pet-info-container">
        <MapContainer
          allowUser={geolocationAllow}
          userPosition={userPosition}
          petPosition={petPosition}
        />
        <Information
          allowUser={geolocationAllow}
          direction={petPosition.direcction}
          pet={pet}
          distancia={distancia}
        />
      </div>
    );
  }
}

Pet.Layout = Layout;

function haversine_distance(posLat1, poslat2, poslng1, poslng2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = posLat1 * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = poslat2 * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (poslng2 - poslng1) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  d = (d * 1.609).toFixed(3);
  return d;
}
