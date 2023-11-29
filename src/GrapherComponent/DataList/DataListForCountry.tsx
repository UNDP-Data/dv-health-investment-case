/* eslint-disable no-irregular-whitespace */
import { useState } from 'react';
import sortBy from 'lodash.sortby';
import { Input } from 'antd';
import { format } from 'd3-format';
import { DataType, IndicatorMetaDataType } from '../../Types';

interface Props {
  data: DataType[];
  country: string;
  indicators: IndicatorMetaDataType[];
}

export function DataListForCountry(props: Props) {
  const { data, country, indicators } = props;
  const [search, updateSearch] = useState<string | undefined>(undefined);
  const filteredIndicatorsBySearch = search
    ? indicators.filter(d =>
        d.Indicator.toLowerCase().includes(search.toLowerCase() || ''),
      )
    : indicators;
  const dataFilteredByCountry = data.filter(
    d => d['Country or Area'] === country,
  )[0].data;

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
      '15y_ROI_alcohol',
      '15y_ROI_salt',
      '15y_ROI_physicalActivity',
      '15y_ROI_clinical',
      '15y_ROI_tobacco',
      'all_ROI_15years',
    ];
    const yearIndicator = 'ncd_reference_year';

    const roundedNum = Math.round(num);
    const formatNum = (value: number, suffix: string) =>
      `${format(value <= 20 ? '.1f' : '.0f')(value)}${suffix}`;

    if (dataKey === yearIndicator) {
      return format('.0f')(num); // Format as whole number without comma
    }

    if (specificKeys.includes(dataKey)) {
      return format(',')(roundedNum);
    }

    if (num >= 1000000000) {
      return formatNum(num / 1000000000, ' Bil');
    }
    if (num >= 1000000) {
      return formatNum(num / 1000000, ' Mil');
    }
    if (num >= 1000) {
      return formatNum(num / 1000, ' K');
    }
    return formatNum(num, '');
  }

  return (
    <div style={{ width: '100%' }}>
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
          dataFilteredByCountry.findIndex(el => el.indicator === d.DataKey) !==
          -1 ? (
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
    </div>
  );
}
