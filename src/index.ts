import flow from "../utils/flow";
import {
  getCoordinates,
  getTemperatureAndTime,
  TemperatureAndTime,
} from "./helpers";

const main = () => {
  try {
    const places: string[] = JSON.parse(process.argv[2]);
    console.log("Processing...");

    places.map((place) => {
      flow(
        getCoordinates,
        getTemperatureAndTime
      )(place).then((res: TemperatureAndTime) =>
        console.log(
          `${place} has a temparature of ${res.temp}°c and the current time is ${res.time}`
        )
      );
    });
  } catch (error) {
    console.log("Something went wrong. Usage => npm start '[PLACES]'");
  }
};

main();
