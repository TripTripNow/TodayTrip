export const showTodayDate = () => {
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;

  return { curYear, curMonth };
};
