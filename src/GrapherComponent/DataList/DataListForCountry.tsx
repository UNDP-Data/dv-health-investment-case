/* eslint-disable no-irregular-whitespace */
import { useState } from 'react';
import { Input } from 'antd';
import uniqBy from 'lodash.uniqby';
import { DataType, IndicatorMetaDataType } from '../../Types';
import { customFormat } from '../../Utils/CustomFormat';

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
  const focusAreas = uniqBy(indicators, d => d.FocusArea).map(d => d.FocusArea);
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
          style={{ top: '95px' }}
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
        {focusAreas.map((f, j) => (
          <div key={j}>
            {dataFilteredByCountry.filter(
              d =>
                indicators
                  .filter(el => el.FocusArea === f)
                  .findIndex(el => el.DataKey === d.indicator) !== -1,
            ).length !== 0 ? (
              <div>
                <div
                  style={{
                    backgroundColor: 'var(--gray-600)',
                    color: 'var(--white)!important',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      padding: 'var(--spacing-05)',
                    }}
                  >
                    <h6
                      style={{ color: 'var(--white)' }}
                      className='undp-typography margin-bottom-00'
                    >
                      {f}
                    </h6>
                  </div>
                </div>
                {filteredIndicatorsBySearch
                  .filter(d => d.FocusArea === f)
                  .map((d, i) =>
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
                                    d.IsYear,
                                    d.IsPeopleValue,
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
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
