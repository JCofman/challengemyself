export const calcDaysToGo = (duration, createdTimestamp) => {
  const today = new Date().getTime();
  const difInDays = Math.round(
    (today - createdTimestamp) / 1000 / 60 / 60 / 24
  );
  let remainingDays = duration - difInDays;
  if (remainingDays <= 0) {
    remainingDays = 0;
  }
  return remainingDays;
};

export const formatDate = date => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('.');
};
