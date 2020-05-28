import axios from "axios";

import {
  getCoordinates,
  getTemperatureAndTime,
  getTimeFromTimezoneOffset,
  convertKelvinToCelsiusTemperature,
} from "./helpers";
import { main } from "./index";
import coordinatesResponse from "./mockResponses/coordinatesResponse";
import temperatureAndTimeResponse from "./mockResponses/temperatureAndTimeResponse";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
let spy: jest.SpyInstance<string, []>;

beforeAll(() => {
  const mockDate = new Date(1590659174036);
  spy = jest.spyOn(global, "Date").mockImplementation(() => mockDate as any);
});

afterAll(() => {
  spy.mockReset();
});

test("getTimeFromTimezoneOffset works as expected", async () => {
  expect(getTimeFromTimezoneOffset(3600)).toEqual("10:46:14 AM");
});

test("getCoordinates works as expected", async () => {
  mockedAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: coordinatesResponse })
  );

  const response = await getCoordinates("London");
  expect(response).toEqual({ lat: 51.507276, lon: -0.12766 });
});

test("convertKelvinToCelsiusTemperature works as expected", async () => {
  expect(convertKelvinToCelsiusTemperature(273)).toEqual("0");
});

test("getTemperatureAndTime works as expected", async () => {
  mockedAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: temperatureAndTimeResponse })
  );
  const response = await getTemperatureAndTime({
    lat: 51.507276,
    lon: -0.12766,
  });
  expect(response).toEqual({ temp: "15", time: "10:46:14 AM" });
});
