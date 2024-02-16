interface FormatDateStringByDotProps {
  year: number;
  month: number;
  day: number;
  padStart?: boolean;
}

export const formatDateStringByDot = ({ year, month, day, padStart }: FormatDateStringByDotProps) => {
  if (padStart) return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return `${year}-${month}-${day}`;
};
