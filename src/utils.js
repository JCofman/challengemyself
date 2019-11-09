export const calcDaysToGo = (duration, createdTimestamp) => {
  const today = new Date().getTime();
  const difInDays = Math.round((today - createdTimestamp) / 1000 / 60 / 60 / 24);
  let remainingDays = duration - difInDays;
  if (remainingDays <= 0) {
    remainingDays = 0;
  }
  return remainingDays;
};