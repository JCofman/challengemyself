import { calcDaysToGo, formatDate } from '../src/utils';

describe('Utils', () => {
  const realDate = Date;

  beforeEach(() => {
    const DATE_TO_USE = new Date('2019');
    const _Date = Date;
    global.Date = jest.fn(() => DATE_TO_USE);
    global.Date.UTC = _Date.UTC;
    global.Date.parse = _Date.parse;
    global.Date.now = _Date.now;
    global.Date.getTime = _Date.getTime;
  });

  afterEach(() => {
    global.Date = realDate;
  });

  test('calcDaysToGo() should return 100 days to go', () => {
    const days = calcDaysToGo(100, new Date('2016'));
    expect(global.Date).toHaveBeenCalledTimes(2);
    expect(days).toBe(100);
  });
  test('calcDaysToGo() should return 50 days to go', () => {
    const days = calcDaysToGo(50, new Date('2017'));
    expect(global.Date).toHaveBeenCalledTimes(2);
    expect(days).toBe(50);
  });

  test('formatDate() should return the date in the following format dd.mm.yyyy', () => {
    const formatedDate = formatDate('2019');
    const expectedDate = '01.01.2019';
    expect(global.Date).toHaveBeenCalledTimes(1);
    expect(formatedDate).toBe(expectedDate);
  });
});
