import api, { gpsApi } from "../../hooks/axios_client";
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_KEY);
export const petData = async(id)=>{
    try {
        const response = await api.get(`/pet?_id=${id}`)
        return response.data    
    } catch (error) {
        return {error: error}
    }
    
}
export const lastPosition = async(gps_id)=>{
    try {
        const response = await gpsApi.get(`/${gps_id}`)
        const {latitud, longitud } = response.data.data
        const address = await getAddress(latitud, longitud)
        return  {latitud, longitud , address}
    } catch (error) {
        return {error: error}
    }
    
}

export const getAddress = async(lat, lng) =>{
    try {
        const response = await Geocode.fromLatLng(`${lat}`, `${lng}`)
        return response.results[0].formatted_address    
    } catch (error) {
        return {error: error}
    }
}

export const getDistance = (posLat1, poslat2, poslng1, poslng2) => {
  var R = 12.742; // Radius of the Earth in miles
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
  return d.toFixed(3);
}