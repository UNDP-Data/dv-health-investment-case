import { format } from 'd3-format';

export const customFormat = (
  num: number,
  isYear: boolean,
  isPeopleValue: boolean,
) => {
  const formatNum = (value: number, suffix: string) => {
    const formatSpecifier = value <= 20 ? '.1f' : '.0f';
    let formattedValue = format(formatSpecifier)(value);
    // Remove trailing zeros and unnecessary decimal points
    formattedValue = formattedValue.replace(/(\.\d*[1-9])0+$|\.0+$/, '$1');
    return `${formattedValue}${suffix}`;
  };

  if (isYear) {
    return format('.0f')(num); // Format as a whole number without a comma
  }

  if (isPeopleValue) {
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
