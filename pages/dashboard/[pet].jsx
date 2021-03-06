import React, { useEffect, useState, useContext } from "react";
import Layout from "../../layout";
import { useRouter } from "next/router";
import ReactLoading from "react-loading";
import { Information } from "../../components/pets/Information";
import { MapContainer } from "../../components/pets/map";
import {
  petData,
  lastPosition,
  getAddress,
  getDistance,
} from "../../components/pets/utils";
import { SocketContext } from "../../context/socketContext";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/loading";
export default function Pet() {
  const router = useRouter();
  const { auth } = useAuth();
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState(true);
  const [pet, setPet] = useState({});
  const [petPosition, setPetPosition] = useState({
    lat: 0,
    lng: 0,
    direcction: "",
  });

  const [changePosition, setChagePosition] = useState(false);
  const [geolocationAllow, setGeolocationAllow] = useState(false);
  const [userPosition, setUserPosition] = useState({ lat: 0, lng: 0 });
  const [distancia, setDistancia] = useState(0);
  const getInitialData = async () => {
    const response = await petData(router.query.pet);
    if (response.error) {
      router.back();
      return;
    }
    setPet(response);
    getLastPosition(response.gps_id);
    setLoading(false);
  };
  const updatePosition = async (lat, lng) => {
    const response = await getAddress(lat, lng);
    setPetPosition({
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      direcction: response.error ? "" : response,
    });
  };

  useEffect(() => {
    socket?.on("new_position", (mensaje) => {
      const { latitud, longitud } = mensaje;
      updatePosition(latitud, longitud);
    });
  }, [socket]);

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((e) => {
      setGeolocationAllow(e.state === "granted");
    });
    let watch;
    if ("geolocation" in navigator) {
      watch = navigator.geolocation.watchPosition(function (position) {
        const { latitude, longitude } = position.coords;
        setUserPosition({
          lat: latitude,
          lng: longitude,
        });
        latitude !== userPosition.lat && setChagePosition(latitude);
        setDistancia(
          getDistance(latitude, petPosition.lat, longitude, petPosition.lng)
        );
      });
    }
    return () => {
      navigator.geolocation.clearWatch(watch);
    };
  }, [changePosition]);

  const getLastPosition = (pet_id) => {
    lastPosition(pet_id).then((e) => {
      setPetPosition({
        lat: parseFloat(e.latitud),
        lng: parseFloat(e.longitud),
        direcction: e.address,
      });
    });
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="pet-info-container">
        <MapContainer
          allowUser={geolocationAllow}
          userPosition={userPosition}
          petPosition={{ lat: petPosition.lat, lng: petPosition.lng }}
        />
        <Information
          allowUser={geolocationAllow}
          direction={petPosition.direcction}
          pet={pet}
          distancia={distancia}
          btn_event={() => console.log(auth.id)}
        />
      </div>
    );
  }
}

Pet.Layout = Layout;
