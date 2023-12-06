/* eslint-disable no-irregular-whitespace */
import { useContext } from 'react';
import { Select } from 'antd';
import { DataType, CtxDataType, IndicatorMetaDataType } from '../../Types';
import Context from '../../Context/Context';
import { DataListForCountry } from './DataListForCountry';

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
  const dataFilteredByCountry = dataListCountry
    ? data.filter(d => d['Country or Area'] === dataListCountry)[0].data
    : undefined;

  return (
    <div>
      {dataListCountry && dataFilteredByCountry ? (
        <DataListForCountry
          data={data}
          indicators={indicators}
          country={dataListCountry}
        />
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
