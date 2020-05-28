import axios from "axios";

export const getTimeFromTimezoneOffset = (offset: number) => {
  const localTime = new Date().getTime();
  const localOffset = new Date().getTimezoneOffset();
  const localOffsetInMilliseconds = localOffset * 60000;

  const utcTime = localTime + localOffsetInMilliseconds;

  const adjustedTime = utcTime + offset * 1000;
  return new Date(adjustedTime).toLocaleTimeString("en-US");
};

export const convertKelvinToCelsiusTemperature = (temperature: number) => {
  const celsuis = temperature - 273;
  const celsuisFixed = celsuis.toFixed(0);
  return celsuisFixed;
};

interface Coordinates {
  lat: Number;
  lon: Number;
}
export const getCoordinates = async (
  address: string
): Promise<void | Coordinates> => {
  try {
    const { data } = await axios.get(
      `https://www.mapquestapi.com/geocoding/v1/address?key=vFICBEwxWS5TcY9Qwv03jJmoICTANQhQ&inFormat=kvp&outFormat=json&location=${address}&thumbMaps=false`
    );
    const results = data.results[0].locations[0].latLng;
    return { lat: results.lat, lon: results.lng };
  } catch (error) {
    console.log(error);
  }
};
