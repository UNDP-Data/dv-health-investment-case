import { useState, useEffect } from 'react';
import { json, csv } from 'd3-request';
import { queue } from 'd3-queue';
import styled from 'styled-components';
import { Select } from 'antd';
import {
  CountryGroupDataTypeFromFile,
  DataType,
  IndicatorDataType,
  IndicatorMetaDataType,
} from './Types';
import { GrapherComponentForCountry } from './GrapherComponent';
import { CountrySummary } from './GrapherComponent/SummaryCards';

interface Props {
  focusArea: string;
}

const VizAreaEl = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  height: 10rem;
`;

function CountryEl(props: Props) {
  const { focusArea } = props;
  const [finalData, setFinalData] = useState<DataType[] | undefined>(undefined);
  const [countryId, setCountryId] = useState<string | undefined>(undefined);
  const [indicatorsList, setIndicatorsList] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);
  const [countryList, setCountryList] = useState<string[] | undefined>(
    undefined,
  );
  useEffect(() => {
    queue()
      .defer(
        csv,
        `https://raw.githubusercontent.com/UNDP-Data/dv-health-investment-case-data-repo/main/data.csv`,
      )
      .defer(
        json,
        `https://raw.githubusercontent.com/UNDP-Data/dv-health-investment-case-metadata/main/metadata.json`,
      )
      .defer(
        json,
        'https://raw.githubusercontent.com/UNDP-Data/country-taxonomy-from-azure/main/country_territory_groups.json',
      )
      .await(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          err: any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: any,
          indicatorMetaData: IndicatorMetaDataType[],
          countryTaxonomy: CountryGroupDataTypeFromFile[],
        ) => {
          if (err) throw err;
          const countryListFromTaxonomy: DataType[] = countryTaxonomy.map(
            d => ({
              'Alpha-3 code': d['Alpha-3 code'],
              'Country or Area': d['Country or Area'],
              'Group 1': d['Group 1'],
              'Group 2': d['Group 2'],
              LDC: d.LDC,
              LLDC: d.LLDC,
              'Latitude (average)': +d['Latitude (average)'],
              'Longitude (average)': +d['Longitude (average)'],
              SIDS: d.SIDS,
              'Income group': d['Income group'],
              data: [],
            }),
          );
          const dataFormatted: DataType[] = countryListFromTaxonomy.map(d => {
            if (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.findIndex((el: any) => el.ISO_code === d['Alpha-3 code']) ===
              -1
            )
              return d;
            const countryData =
              data[
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.findIndex((el: any) => el.ISO_code === d['Alpha-3 code'])
              ];
            const selectedKeys =
              focusArea === 'All'
                ? indicatorMetaData.map(el => el.DataKey)
                : indicatorMetaData
                    .filter(
                      el => el.FocusArea === focusArea.replaceAll('_', ' '),
                    )
                    .map(el => el.DataKey);
            const selectedKeysPercent =
              focusArea === 'All'
                ? indicatorMetaData
                    .filter(el => el.IsPercent)
                    .map(el => el.DataKey)
                : indicatorMetaData
                    .filter(
                      el =>
                        el.FocusArea === focusArea.replaceAll('_', ' ') &&
                        el.IsPercent,
                    )
                    .map(el => el.DataKey);
            const indicatorData: IndicatorDataType[] = selectedKeys
              .map(key => ({
                indicator: key,
                value:
                  countryData[key] === ''
                    ? -999999
                    : selectedKeysPercent.indexOf(key) !== -1
                    ? +countryData[key] * 100
                    : +countryData[key],
              }))
              .filter(el => el.value !== -999999);
            return {
              ...d,
              data: indicatorData,
              UNDP_region: countryData.UNDP_region,
              tobacco_reference_year: countryData.tobacco_reference_year,
              NCD_reference_year: countryData.NCD_reference_year,
              GDP_USD: countryData.GDP_USD,
              GDP_USD_NCD: countryData.GDP_USD_1,
            };
          });
          setFinalData(dataFormatted.filter(d => d['Alpha-3 code'] !== 'ATA'));
          setCountryList(
            dataFormatted
              .filter(d => d['Alpha-3 code'] !== 'ATA' && d.data.length > 0)
              .map(d => d['Country or Area'])
              .sort((a, b) => a.localeCompare(b)),
          );
          setCountryId('Armenia');
          setIndicatorsList(
            focusArea === 'All'
              ? indicatorMetaData
              : indicatorMetaData.filter(
                  d => d.FocusArea === focusArea.replaceAll('_', ' '),
                ),
          );
        },
      );
  }, []);

  return (
    <div>
      {indicatorsList && finalData && countryId && countryList ? (
        <div className='undp-container'>
          <Select
            className='undp-select margin-bottom-05'
            placeholder='Select A Country'
            showSearch
            value={countryId}
            onChange={d => {
              setCountryId(d);
            }}
          >
            {countryList.map((d, i) => (
              <Select.Option className='undp-select-option' value={d} key={i}>
                {d}
              </Select.Option>
            ))}
          </Select>
          <CountrySummary
            focusArea={focusArea}
            indicators={indicatorsList}
            data={finalData.filter(d => d['Country or Area'] === countryId)[0]}
          />
          <GrapherComponentForCountry
            data={finalData}
            indicators={indicatorsList}
            countrySelected={countryId}
          />
        </div>
      ) : (
        <VizAreaEl className='undp-container'>
          <div className='undp-loader' />
        </VizAreaEl>
      )}
    </div>
  );
}

export default CountryEl;
