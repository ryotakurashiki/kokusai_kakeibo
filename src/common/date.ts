import * as dayjs from "dayjs";

export function get_string_from_date(value: Date, format?: string): string {
  return dayjs(value).format(format);
}

export function start_of_last_month(): Date {
  return dayjs().startOf('month').subtract(1, 'month').toDate();
}

export function start_of_this_month(): Date {
  return dayjs().startOf('month').toDate();
}

export function end_of_this_month(): Date {
  return dayjs().endOf('month').toDate();
}

export function now(): Date {
  return dayjs().toDate();
}