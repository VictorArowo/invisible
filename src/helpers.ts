import axios from "axios";

export const getTimeFromTimezoneOffset = (offset: number) => {
  const localTime = new Date().getTime();
  const localOffset = new Date().getTimezoneOffset();
  const localOffsetInMilliseconds = localOffset * 60000;

  const utcTime = localTime + localOffsetInMilliseconds;

  const adjustedTime = utcTime + offset * 1000;
  return new Date(adjustedTime).toLocaleTimeString("en-US");
};
