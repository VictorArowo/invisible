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

export interface TemperatureAndTime {
  temp: string;
  time: string;
}
export const getTemperatureAndTime = async (
  coordinates: Coordinates
): Promise<void | TemperatureAndTime> => {
  const { lat, lon } = coordinates;

  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=defc605098f799005cd8477ff485bfb8`
    );
    return {
      temp: convertKelvinToCelsiusTemperature(data.main.temp),
      time: getTimeFromTimezoneOffset(data.timezone),
    };
  } catch (error) {
    console.log(error);
  }
};

export const standardizeInput = (arr: string[]): string[] => {
  const arrString = arr.reduce((acc, curr) => (acc += `${curr} `), "");
  const seperatedArray = arrString.split(", " || ",");
  return seperatedArray;
};
