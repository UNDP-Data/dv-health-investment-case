/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable jsx-a11y/iframe-has-title */
import { useState, useEffect, useReducer } from 'react';
import { json, csv } from 'd3-request';
import uniqBy from 'lodash.uniqby';
import sortBy from 'lodash.sortby';
import { queue } from 'd3-queue';
import styled from 'styled-components';
import {
  CountryGroupDataTypeFromFile,
  DataType,
  IndicatorDataType,
  IndicatorMetaDataType,
} from './Types';
import { GrapherComponent } from './GrapherComponent';
import Reducer from './Context/Reducer';
import Context from './Context/Context';
import {
  DEFAULT_VALUES_TOBACCO,
  DEFAULT_VALUES_NCD,
  DEFAULT_VALUES_ALL,
} from './Constants';

const VizAreaEl = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  height: 10rem;
`;

interface Props {
  focusArea: string;
}

function WorldEl(props: Props) {
  const { focusArea } = props;
  const [finalData, setFinalData] = useState<DataType[] | undefined>(undefined);
  const [indicatorsList, setIndicatorsList] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  const [countryList, setCountryList] = useState<string[] | undefined>(
    undefined,
  );
  const queryParams = new URLSearchParams(window.location.search);
  const initialState = {
    graphType: queryParams.get('graphType') || 'barGraph',
    selectedRegions: queryParams.get('regions')?.split('~') || [],
    selectedCountries: queryParams.get('countries')?.split('~') || [],
    selectedIncomeGroups: queryParams.get('incomeGroups')?.split('~') || [],
    selectedCountryGroup: queryParams.get('countryGroup') || 'All',
    xAxisIndicator:
      queryParams.get('firstMetric') || focusArea === 'Tobacco_control'
        ? DEFAULT_VALUES_TOBACCO.firstMetric
        : focusArea === 'NCDs'
        ? DEFAULT_VALUES_NCD.firstMetric
        : DEFAULT_VALUES_ALL.firstMetric,
    yAxisIndicator:
      queryParams.get('secondMetric') || focusArea === 'Tobacco_control'
        ? DEFAULT_VALUES_TOBACCO.secondMetric
        : focusArea === 'NCDs'
        ? DEFAULT_VALUES_NCD.secondMetric
        : DEFAULT_VALUES_ALL.secondMetric,
    colorIndicator:
      queryParams.get('colorMetric') || focusArea === 'Tobacco_control'
        ? DEFAULT_VALUES_TOBACCO.colorMetric
        : focusArea === 'NCDs'
        ? DEFAULT_VALUES_NCD.colorMetric
        : DEFAULT_VALUES_ALL.colorMetric,
    sizeIndicator: queryParams.get('sizeMetric') || undefined,
    showLabel: queryParams.get('showLabel') === 'true',
    showSource: false,
    reverseOrder: queryParams.get('reverseOrder') === 'true',
    dataListCountry: undefined,
    verticalBarLayout: queryParams.get('verticalBarLayout') !== 'false',
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateGraphType = (
    graphType: 'scatterPlot' | 'map' | 'barGraph' | 'trendLine',
  ) => {
    dispatch({
      type: 'UPDATE_GRAPH_TYPE',
      payload: graphType,
    });
  };

  const updateReverseOrder = (reverseOrder: boolean) => {
    dispatch({
      type: 'UPDATE_REVERSE_ORDER',
      payload: reverseOrder,
    });
  };

  const updateSelectedRegions = (selectedRegions: string[]) => {
    dispatch({
      type: 'UPDATE_SELECTED_REGIONS',
      payload: selectedRegions,
    });
  };

  const updateSelectedCountries = (selectedCountries: string[]) => {
    dispatch({
      type: 'UPDATE_SELECTED_COUNTRIES',
      payload: selectedCountries,
    });
  };

  const updateSelectedCountryGroup = (
    selectedCountryGroup: 'All' | 'SIDS' | 'LLDC' | 'LDC',
  ) => {
    dispatch({
      type: 'UPDATE_SELECTED_COUNTRY_GROUP',
      payload: selectedCountryGroup,
    });
  };

  const updateXAxisIndicator = (xAxisIndicator: string) => {
    dispatch({
      type: 'UPDATE_X_AXIS_INDICATOR',
      payload: xAxisIndicator,
    });
  };

  const updateYAxisIndicator = (yAxisIndicator?: string) => {
    dispatch({
      type: 'UPDATE_Y_AXIS_INDICATOR',
      payload: yAxisIndicator,
    });
  };

  const updateColorIndicator = (colorIndicator?: string) => {
    dispatch({
      type: 'UPDATE_COLOR_INDICATOR',
      payload: colorIndicator,
    });
  };

  const updateSizeIndicator = (sizeIndicator?: string) => {
    dispatch({
      type: 'UPDATE_SIZE_INDICATOR',
      payload: sizeIndicator,
    });
  };

  const updateSelectedIncomeGroups = (selectedIncomeGroups?: string) => {
    dispatch({
      type: 'UPDATE_SELECTED_INCOME_GROUPS',
      payload: selectedIncomeGroups,
    });
  };

  const updateShowMostRecentData = (selectedIncomeGroups: boolean) => {
    dispatch({
      type: 'UPDATE_SHOW_MOST_RECENT_DATA',
      payload: selectedIncomeGroups,
    });
  };

  const updateShowLabel = (showLabel: boolean) => {
    dispatch({
      type: 'UPDATE_SHOW_LABEL',
      payload: showLabel,
    });
  };

  const updateShowSource = (showSource: boolean) => {
    dispatch({
      type: 'UPDATE_SHOW_SOURCE',
      payload: showSource,
    });
  };

  const updateBarLayout = (varticalBarLayout: boolean) => {
    dispatch({
      type: 'UPDATE_BAR_LAYOUT',
      payload: varticalBarLayout,
    });
  };

  const updateDataListCountry = (country: string) => {
    dispatch({
      type: 'UPDATE_DATA_LIST_COUNTRY',
      payload: country,
    });
  };

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
                    ? parseFloat((+countryData[key] * 100).toFixed(1))
                    : +countryData[key],
              }))
              .filter(el => el.value !== -999999);
            return {
              ...d,
              data: indicatorData,
              UNDP_region: countryData.UNDP_region,
              tobacco_reference_year: countryData.tobacco_reference_year,
              NCD_reference_year: countryData.NCD_reference_year,
            };
          });
          setFinalData(dataFormatted.filter(d => d['Alpha-3 code'] !== 'ATA'));
          setCountryList(
            sortBy(
              dataFormatted.filter(
                d => d['Alpha-3 code'] !== 'ATA' && d.data.length > 0,
              ),
              d => d['Country or Area'],
            ).map(d => d['Country or Area']),
          );
          setRegionList(
            uniqBy(dataFormatted, d => d.UNDP_region)
              .map(d => d.UNDP_region)
              .filter(d => d && d !== '') as string[],
          );
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
      {indicatorsList && finalData && regionList && countryList ? (
        <div className='undp-container'>
          <Context.Provider
            value={{
              ...state,
              updateGraphType,
              updateSelectedRegions,
              updateSelectedCountries,
              updateSelectedCountryGroup,
              updateXAxisIndicator,
              updateYAxisIndicator,
              updateColorIndicator,
              updateSizeIndicator,
              updateSelectedIncomeGroups,
              updateShowMostRecentData,
              updateShowLabel,
              updateShowSource,
              updateReverseOrder,
              updateBarLayout,
              updateDataListCountry,
            }}
          >
            <GrapherComponent
              data={finalData}
              indicators={indicatorsList}
              regions={regionList}
              countries={countryList}
              focusArea={focusArea}
            />
          </Context.Provider>
        </div>
      ) : (
        <VizAreaEl className='undp-container'>
          <div className='undp-loader' />
        </VizAreaEl>
      )}
    </div>
  );
}

export default WorldEl;
