export const showTodayDate = () => {
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;
  const curDay = now.getDate();
  const curHour = now.getHours();
  const curMinute = now.getMinutes();

  return { curYear, curMonth, curDay, curHour, curMinute };
};
