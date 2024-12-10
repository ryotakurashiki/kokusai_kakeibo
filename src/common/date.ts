import * as dayjs from "dayjs";

export function get_string_from_date(value: Date, format?: string): string {
  return dayjs(value).format(format);
}

export function get_start_of_month(year: number, month: number) {
  return dayjs().year(year).month(month-1).startOf('month').toDate();
}

export function get_end_of_month(year: number, month: number) {
  return dayjs().year(year).month(month-1).endOf('month').toDate();
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

export function current_year(): number {
  return dayjs().year();
}

export function current_month(): number {
  return dayjs().month();
}

export function now(): Date {
  return dayjs().toDate();
}