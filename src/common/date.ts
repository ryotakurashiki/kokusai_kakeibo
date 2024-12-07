import * as dayjs from "dayjs";

export function start_of_last_month(): Date {
  return dayjs().startOf('month').subtract(1, 'month').toDate();
}