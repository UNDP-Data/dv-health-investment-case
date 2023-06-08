import { useState, useEffect } from 'react';
import { json, csv } from 'd3-request';
import { queue } from 'd3-queue';
import styled from 'styled-components';
import { Select } from 'antd';
import {
  CountryDataFromCSV,
  CountryGroupDataTypeFromFile,
  DataType,
  IndicatorDataType,
  IndicatorMetaDataType,
} from './Types';
import { GrapherComponentForCountry } from './GrapherComponent';
import { KEYS_FROM_DATA, KEY_WITH_PERCENT_VALUE } from './Constants';
import { CountrySummary } from './GrapherComponent/SummaryCards';

const VizAreaEl = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  height: 10rem;
`;

function CountryEl() {
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
      .defer(csv, './Data/countryData.csv')
      .defer(json, './Data/indicatorMetaData.json')
      .defer(
        json,
        'https://raw.githubusercontent.com/UNDP-Data/country-taxonomy-from-azure/main/country_territory_groups.json',
      )
      .await(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          err: any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: CountryDataFromCSV[],
          indicatorMetaData: IndicatorMetaDataType[],
          countryTaxonomy: CountryGroupDataTypeFromFile[],
        ) => {
          if (err) throw err;
          const countryListFromTaxonomy: DataType[] = countryTaxonomy.map(
            d => ({
              'Alpha-3 code': d['Alpha-3 code-1'],
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
            if (data.findIndex(el => el.ISO_code === d['Alpha-3 code']) === -1)
              return d;
            const countryData =
              data[
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                data.findIndex(el => el.ISO_code === d['Alpha-3 code'])
              ];
            const indicatorData: IndicatorDataType[] = KEYS_FROM_DATA.map(
              key => ({
                indicator: key,
                value:
                  countryData[key] === ''
                    ? -999999
                    : KEY_WITH_PERCENT_VALUE.indexOf(key) !== -1
                    ? +countryData[key] * 100
                    : +countryData[key],
              }),
            ).filter(el => el.value !== -999999);
            return {
              ...d,
              data: indicatorData,
              WHO_region: countryData.WHO_region,
              modelling_year: countryData.modelling_year,
              reference_year: countryData.reference_year,
              total_population_source: countryData.total_population_source,
              adult_population_source: countryData.adult_population_source,
              GDP_source: countryData.GDP_source,
              Country_total_health_expenditure_year:
                countryData.Country_total_health_expenditure_year,
              Government_total_health_expenditure_year:
                countryData.Government_total_health_expenditure_year,
              USD_exchange_rate_source: countryData.USD_exchange_rate_source,
              year_of_prevalence_data: countryData.year_of_prevalence_data,
              prevelance_data_source: countryData.prevelance_data_source,
            };
          });
          setFinalData(dataFormatted.filter(d => d['Alpha-3 code'] !== 'ATA'));
          setCountryList(
            dataFormatted
              .filter(d => d['Alpha-3 code'] !== 'ATA' && d.data.length > 0)
              .map(d => d['Country or Area']),
          );
          setCountryId('Tunisia');
          setIndicatorsList(indicatorMetaData);
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
