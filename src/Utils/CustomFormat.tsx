import { format } from 'd3-format';
import { KEY_WITH_PEOPLE_VALUE, KEY_WITH_YEAR_VALUE } from '../Constants';

export const customFormat = (num: number, dataKey = '') => {
  const formatNum = (value: number, suffix: string) => {
    const formatSpecifier = value <= 20 ? '.1f' : '.0f';
    let formattedValue = format(formatSpecifier)(value);
    // Remove trailing zeros and unnecessary decimal points
    formattedValue = formattedValue.replace(/(\.\d*[1-9])0+$|\.0+$/, '$1');
    return `${formattedValue}${suffix}`;
  };

  if (KEY_WITH_YEAR_VALUE.includes(dataKey)) {
    return format('.0f')(num); // Format as a whole number without a comma
  }

  if (KEY_WITH_PEOPLE_VALUE.includes(dataKey)) {
    return format(',')(Math.round(num));
  }

  if (num >= 1000000000) {
    return formatNum(num / 1000000000, ' bil');
  }
  if (num >= 1000000) {
    return formatNum(num / 1000000, ' mil');
  }
  if (num >= 1000) {
    return formatNum(num / 1000, ' K');
  }
  return formatNum(num, '');
};
