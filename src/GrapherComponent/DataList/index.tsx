/* eslint-disable no-irregular-whitespace */
import { useContext, useState } from 'react';
import sortBy from 'lodash.sortby';
import { format } from 'd3-format';
import { Input, Select } from 'antd';
import { DataType, CtxDataType, IndicatorMetaDataType } from '../../Types';
import Context from '../../Context/Context';

interface Props {
  data: DataType[];
  countries: string[];
  indicators: IndicatorMetaDataType[];
}

export function DataList(props: Props) {
  const { data, countries, indicators } = props;
  const { dataListCountry, updateDataListCountry } = useContext(
    Context,
  ) as CtxDataType;
  const [search, updateSearch] = useState<string | undefined>(undefined);
  const filteredIndicatorsBySearch = search
    ? indicators.filter(d =>
        d.Indicator.toLowerCase().includes(search.toLowerCase() || ''),
      )
    : indicators;
  const dataFilteredByCountry = dataListCountry
    ? data.filter(d => d['Country or Area'] === dataListCountry)[0].data
    : undefined;

  function customFormat(num: number, dataKey: string): string {
    const specificKeys = [
      'averted_deaths',
      'tobacco_attributable_deaths',
      'annual_deaths_averted',
      'NCD_deaths_per_1000',
      '15y_deaths_averted_total',
      '15y_hly_total',
      '15y_hly_tobacco',
      '15y_deaths_averted_total',
      '15y_strokes_averted_total',
      '15y_IHD_averted_total',
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
      return format('.0f')(num); // Format as whole number without comma
    }

    if (specificKeys.includes(dataKey)) {
      return format(',')(Math.round(num));
    }

    const isROIMetric = roiKeys.includes(dataKey);
    const shouldForceOneDecimal = isROIMetric && num < 1;

    if (num >= 1000000000) {
      return formatNum(num / 1000000000, ' Bil', shouldForceOneDecimal);
    }
    if (num >= 1000000) {
      return formatNum(num / 1000000, ' Mil', shouldForceOneDecimal);
    }
    if (num >= 1000) {
      return formatNum(num / 1000, ' K', shouldForceOneDecimal);
    }
    return formatNum(num, '', shouldForceOneDecimal);
  }

  return (
    <div>
      {dataListCountry && dataFilteredByCountry ? (
        <>
          <div
            style={{
              padding: 'var(--spacing-06)',
              backgroundColor: 'var(--white)',
              borderBottom: '1px solid var(--gray-400)',
              position: 'sticky',
              top: 0,
            }}
          >
            <Input
              className='undp-input'
              placeholder='Search an indicator'
              onChange={d => {
                updateSearch(d.target.value);
              }}
              value={search}
            />
          </div>
          <div>
            <div
              className='undp-table-head undp-table-head-sticky'
              style={{ top: '101px' }}
            >
              <div
                style={{ width: '70%', paddingLeft: '1rem' }}
                className='undp-table-head-cell undp-sticky-head-column'
              >
                Indicator
              </div>
              <div
                style={{ width: '30%', paddingRight: '1rem' }}
                className='undp-table-head-cell undp-sticky-head-column align-right'
              >
                Value
              </div>
            </div>
            {sortBy(filteredIndicatorsBySearch, d => d.Indicator).map((d, i) =>
              dataFilteredByCountry.findIndex(
                el => el.indicator === d.DataKey,
              ) !== -1 ? (
                <div
                  key={i}
                  className='undp-table-row padding-top-05'
                  style={{ backgroundColor: 'var(--white)' }}
                >
                  <div
                    style={{
                      width: '70%',
                      fontSize: '1.1rem',
                      paddingLeft: '1rem',
                    }}
                    className='undp-table-row-cell'
                  >
                    <div className='undp-typography'>{d.Indicator}</div>
                  </div>
                  <div
                    style={{ width: '30%', paddingRight: '1rem' }}
                    className='undp-table-row-cell align-right'
                  >
                    {dataFilteredByCountry.findIndex(
                      el => el.indicator === d.DataKey,
                    ) === -1 ? (
                      'NA'
                    ) : (
                      <h5 className='undp-typography margin-bottom-00 bold'>
                        {d.LabelPrefix ? `${d.LabelPrefix} ` : ''}
                        {dataFilteredByCountry.findIndex(
                          el => el.indicator === d.DataKey,
                        ) !== -1
                          ? customFormat(
                              dataFilteredByCountry[
                                dataFilteredByCountry.findIndex(
                                  el => el.indicator === d.DataKey,
                                )
                              ].value,
                              d.DataKey,
                            )
                          : dataFilteredByCountry[
                              dataFilteredByCountry.findIndex(
                                el => el.indicator === d.DataKey,
                              )
                            ].value}
                        {d.LabelSuffix ? ` ${d.LabelSuffix}` : ''}
                      </h5>
                    )}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </>
      ) : (
        <div className='center-area-info-el'>
          <h5 className='undp-typography'>
            Please select countries to see their trends
          </h5>
          <Select
            showSearch
            className='undp-select'
            placeholder='Please select a country'
            onChange={d => {
              updateDataListCountry(d);
            }}
            value={dataListCountry}
            maxTagCount='responsive'
          >
            {countries.map(d => (
              <Select.Option className='undp-select-option' key={d}>
                {d}
              </Select.Option>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
}
