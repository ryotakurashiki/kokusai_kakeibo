import dayjs from 'dayjs';

export function get_string_from_date(date: Date, format?: string): string {
  return dayjs(date).format(format);
}

export function current_days(): number {
  return Number(dayjs().format("D"));
}

export function this_month_days(): number {
  return Number(dayjs().endOf('month').format("D"));
}

export function current_year(): number {
  return dayjs().year();
}

export function current_month(): number {
  return dayjs().month();
}
