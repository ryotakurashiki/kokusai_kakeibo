import dayjs from 'dayjs';

export function get_string_from_date(date: Date, format?: string): string {
  return dayjs(date).format(format);
}
