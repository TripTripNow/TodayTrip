interface FormatDateStringByDotProps {
  year: number;
  month: number;
  day: number;
}

export const formatDateStringByDot = ({ year, month, day }: FormatDateStringByDotProps) => `${year}.${month}.${day}`;
