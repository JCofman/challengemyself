export const calcDaysToGo = (duration, createdTimestamp) => {
  const today = new Date().getTime();
  const difInDays = Math.round((today - createdTimestamp) / 1000 / 60 / 60 / 24);
  return duration - difInDays;
};