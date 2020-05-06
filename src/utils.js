/**
 * Returns the remaining duration in days from the passed timestamp
 * @param {number} duration
 * @param {Date} createdTimestamp
 */
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

/**
 * Formats the date into dd.mm.yyy format
 * @param {Date} date
 */
export const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('.');
};

export const timeZones = [
  { label: '(GMT-12:00) International Date Line West', value: '-12' },
  { label: '(GMT-11:00) Midway Island, Samoa', value: '-11' },
  { label: '(GMT-10:00) Hawaii', value: '-10' },
  { label: '(GMT-09:00) Alaska', value: '-9' },
  { label: '(GMT-08:00) Pacific Time (US & Canada)', value: '-8' },
  { label: '(GMT-08:00) Tijuana, Baja California', value: '-8' },
  { label: '(GMT-07:00) Arizona', value: '-7' },
  { label: '(GMT-07:00) Chihuahua, La Paz, Mazatlan', value: '-7' },
  { label: '(GMT-07:00) Mountain Time (US & Canada)', value: '-7' },
  { label: '(GMT-06:00) Central America', value: '-6' },
  { label: '(GMT-06:00) Central Time (US & Canada)', value: '-6' },
  { label: '(GMT-05:00) Bogota, Lima, Quito, Rio Branco', value: '-5' },
  { label: '(GMT-05:00) Eastern Time (US & Canada)', value: '-5' },
  { label: '(GMT-05:00) Indiana (East)', value: '-5' },
  { label: '(GMT-04:00) Atlantic Time (Canada)', value: '-4' },
  { label: '(GMT-04:00) Caracas, La Paz', value: '-4' },
  { label: '(GMT-04:00) Manaus', value: '-4' },
  { label: '(GMT-04:00) Santiago', value: '-4' },
  { label: '(GMT-03:30) Newfoundland', value: '-3.5' },
  { label: '(GMT-03:00) Brasilia', value: '-3' },
  { label: '(GMT-03:00) Buenos Aires, Georgetown', value: '-3' },
  { label: '(GMT-03:00) Greenland', value: '-3' },
  { label: '(GMT-03:00) Montevideo', value: '-3' },
  { label: '(GMT-02:00) Mid-Atlantic', value: '-2' },
  { label: '(GMT-01:00) Cape Verde Is.', value: '-1' },
  { label: '(GMT-01:00) Azores', value: '-1' },
  { label: '(GMT+00:00) Casablanca, Monrovia, Reykjavik', value: '0' },
  {
    label:
      '(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London',
    value: '0',
  },
  {
    label: '(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna',
    value: '1',
  },
  {
    label: '(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague',
    value: '1',
  },
  { label: '(GMT+01:00) Brussels, Copenhagen, Madrid, Paris', value: '1' },
  { label: '(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb', value: '1' },
  { label: '(GMT+01:00) West Central Africa', value: '1' },
  { label: '(GMT+02:00) Amman', value: '2' },
  { label: '(GMT+02:00) Athens, Bucharest, Istanbul', value: '2' },
  { label: '(GMT+02:00) Beirut', value: '2' },
  { label: '(GMT+02:00) Cairo', value: '2' },
  { label: '(GMT+02:00) Harare, Pretoria', value: '2' },
  {
    label: '(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius',
    value: '2',
  },
  { label: '(GMT+02:00) Jerusalem', value: '2' },
  { label: '(GMT+02:00) Minsk', value: '2' },
  { label: '(GMT+02:00) Windhoek', value: '2' },
  { label: '(GMT+03:00) Kuwait, Riyadh, Baghdad', value: '3' },
  { label: '(GMT+03:00) Moscow, St. Petersburg, Volgograd', value: '3' },
  { label: '(GMT+03:00) Nairobi', value: '3' },
  { label: '(GMT+03:00) Tbilisi', value: '3' },
  { label: '(GMT+03:30) Tehran', value: '3.5' },
  { label: '(GMT+04:00) Abu Dhabi, Muscat', value: '4' },
  { label: '(GMT+04:00) Baku', value: '4' },
  { label: '(GMT+04:00) Yerevan', value: '4' },
  { label: '(GMT+04:30) Kabul', value: '4.5' },
  { label: '(GMT+05:00) Yekaterinburg', value: '5' },
  { label: '(GMT+05:00) Islamabad, Karachi, Tashkent', value: '5' },
  { label: '(GMT+05:30) Sri Jayawardenapura', value: '5.5' },
  { label: '(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi', value: '5.5' },
  { label: '(GMT+05:45) Kathmandu', value: '5.75' },
  { label: '(GMT+06:00) Almaty, Novosibirsk', value: '6' },
  { label: '(GMT+06:00) Astana, Dhaka', value: '6' },
  { label: '(GMT+06:30) Yangon (Rangoon)', value: '6.5' },
  { label: '(GMT+07:00) Bangkok, Hanoi, Jakarta', value: '7' },
  { label: '(GMT+07:00) Krasnoyarsk', value: '7' },
  { label: '(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi', value: '8' },
  { label: '(GMT+08:00) Kuala Lumpur, Singapore', value: '8' },
  { label: '(GMT+08:00) Irkutsk, Ulaan Bataar', value: '8' },
  { label: '(GMT+08:00) Perth', value: '8' },
  { label: '(GMT+08:00) Taipei', value: '8' },
  { label: '(GMT+09:00) Osaka, Sapporo, Tokyo', value: '9' },
  { label: '(GMT+09:00) Seoul', value: '9' },
  { label: '(GMT+09:00) Yakutsk', value: '9' },
  { label: '(GMT+09:30) Adelaide', value: '9.5' },
  { label: '(GMT+09:30) Darwin', value: '9.5' },
  { label: '(GMT+10:00) Brisbane', value: '10' },
  { label: '(GMT+10:00) Canberra, Melbourne, Sydney', value: '10' },
  { label: '(GMT+10:00) Hobart', value: '10' },
  { label: '(GMT+10:00) Guam, Port Moresby', value: '10' },
  { label: '(GMT+10:00) Vladivostok', value: '10' },
  { label: '(GMT+11:00) Magadan, Solomon Is., New Caledonia', value: '11' },
  { label: '(GMT+12:00) Auckland, Wellington', value: '12' },
  { label: '(GMT+12:00) Fiji, Kamchatka, Marshall Is.', value: '12' },
  { label: "(GMT+13:00) Nuku'alofa", value: '13' },
];

export const timeOptions = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
