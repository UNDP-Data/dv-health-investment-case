import { useState } from 'react';
import sortBy from 'lodash.sortby';
import { format } from 'd3-format';
import { Input } from 'antd';
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
                    {d.LabelPrefix ? `${d.LabelPrefix} ` : ''}
                    {dataFilteredByCountry.findIndex(
                      el => el.indicator === d.DataKey,
                    ) !== -1
                      ? dataFilteredByCountry[
                          dataFilteredByCountry.findIndex(
                            el => el.indicator === d.DataKey,
                          )
                        ].value < 1000000
                        ? format(',')(
                            dataFilteredByCountry[
                              dataFilteredByCountry.findIndex(
                                el => el.indicator === d.DataKey,
                              )
                            ].value,
                          )
                        : format('.3s')(
                            dataFilteredByCountry[
                              dataFilteredByCountry.findIndex(
                                el => el.indicator === d.DataKey,
                              )
                            ].value,
                          )
                            .replace('G', 'B')
                            .replace('M', 'Mil')
                      : dataFilteredByCountry[
                          dataFilteredByCountry.findIndex(
                            el => el.indicator === d.DataKey,
                          )
                        ].value}
                    {d.LabelSuffix ? ` ${d.LabelSuffix}` : ''}
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
