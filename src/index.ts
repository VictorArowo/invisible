import flow from "../utils/flow";
import {
  getCoordinates,
  getTemperatureAndTime,
  TemperatureAndTime,
  standardizeInput,
} from "./helpers";

export const main = () => {
  try {
    const [, , ...args] = process.argv;
    const places: string[] = standardizeInput([...args]);
    console.log("Processing...");

    places.map((place) => {
      const encodedPlace = encodeURI(place);
      flow(
        getCoordinates,
        getTemperatureAndTime
      )(encodedPlace).then((res: TemperatureAndTime) =>
        console.log(
          `${place.trim()} has a temparature of ${
            res.temp
          }°c and the current time is ${res.time}`
        )
      );
    });
  } catch (error) {
    console.log("Something went wrong. Usage => npm start '[PLACES]'");
  }
};

main();
