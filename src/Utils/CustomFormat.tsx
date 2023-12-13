import { format } from 'd3-format';

export const customFormat = (num: number, dataKey = '') => {
  const specificKeys = [
    'averted_deaths',
    'tobacco_attributable_deaths',
    'annual_deaths_averted',
    'NCD_deaths_per_1000',
    '15y_deaths_averted_total',
    '15y_hly_total',
    '15y_hly_tobacco',
    '15y_strokes_averted_total',
    '15y_IHD_averted_total',
    'NCD_deaths',
    'deaths_averted_per_USD_10000_invested_in_interventions',
  ];

  const roiKeys = [
    '15y_ROI_alcohol',
    '15y_ROI_salt',
    '15y_ROI_physicalActivity',
    '15y_ROI_clinical',
    '15y_ROI_tobacco',
    'all_ROI_15years',
  ];

  const yearIndicator = ['ncd_reference_year', 'tobacco_reference_year'];

  const formatNum = (
    value: number,
    suffix: string,
    forceOneDecimal = false,
  ) => {
    const formatSpecifier = forceOneDecimal
      ? '.2f'
      : value <= 20
      ? '.1f'
      : '.0f';
    let formattedValue = format(formatSpecifier)(value);
    // Remove trailing zeros and unnecessary decimal points
    formattedValue = formattedValue.replace(/(\.\d*[1-9])0+$|\.0+$/, '$1');
    return `${formattedValue}${suffix}`;
  };

  if (yearIndicator.includes(dataKey)) {
    return format('.0f')(num); // Format as a whole number without a comma
  }

  if (specificKeys.includes(dataKey)) {
    return format(',')(Math.round(num));
  }

  const isROIMetric = roiKeys.includes(dataKey);
  const shouldForceOneDecimal = isROIMetric && num < 1;

  if (num >= 1000000000) {
    return formatNum(num / 1000000000, ' bil', shouldForceOneDecimal);
  }
  if (num >= 1000000) {
    return formatNum(num / 1000000, ' mil', shouldForceOneDecimal);
  }
  if (num >= 1000) {
    return formatNum(num / 1000, ' K', shouldForceOneDecimal);
  }
  return formatNum(num, '', shouldForceOneDecimal);
};
