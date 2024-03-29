import { useContext, useState } from 'react';
import maxBy from 'lodash.maxby';
import orderBy from 'lodash.orderby';
import { format } from 'd3-format';
import UNDPColorModule from 'undp-viz-colors';
import { scaleOrdinal, scaleLinear } from 'd3-scale';
import minBy from 'lodash.minby';
import {
  CtxDataType,
  DataType,
  HoverDataType,
  HoverRowDataType,
  IndicatorMetaDataType,
} from '../../Types';
import Context from '../../Context/Context';
import { CONTINENTS, INCOME_GROUPS } from '../../Constants';
import { Tooltip } from '../../Components/Tooltip';

interface Props {
  data: DataType[];
  indicators: IndicatorMetaDataType[];
  svgWidth: number;
  focusArea: string;
}

export function Graph(props: Props) {
  const { data, indicators, svgWidth, focusArea } = props;
  const {
    xAxisIndicator,
    colorIndicator,
    selectedCountries,
    selectedRegions,
    selectedIncomeGroups,
    selectedCountryGroup,
    reverseOrder,
  } = useContext(Context) as CtxDataType;
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(
    undefined,
  );
  const margin = {
    top: 100,
    bottom: 10,
    left: 225,
    right: 40,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const xIndicatorMetaData =
    indicators[
      indicators.findIndex(indicator => indicator.Indicator === xAxisIndicator)
    ];
  const colorIndicatorMetaData =
    indicators[
      indicators.findIndex(indicator => indicator.Indicator === colorIndicator)
    ];

  const dataFormatted = orderBy(
    data
      .map(d => {
        const xIndicatorIndex = d.data.findIndex(
          el => xIndicatorMetaData.DataKey === el.indicator,
        );
        const colorIndicatorIndex = d.data.findIndex(
          el => colorIndicatorMetaData?.DataKey === el.indicator,
        );

        const xVal =
          xIndicatorIndex === -1 ? undefined : d.data[xIndicatorIndex].value;
        const colorVal =
          colorIndicator === 'Continents'
            ? d['Group 1']
            : colorIndicator === 'Income Groups'
            ? d['Income group']
            : colorIndicatorIndex === -1
            ? undefined
            : d.data[colorIndicatorIndex].value;
        const countryGroup =
          selectedCountryGroup === 'All' ? true : d[selectedCountryGroup];
        const incomeGroup = !!(
          selectedIncomeGroups.length === 0 ||
          selectedIncomeGroups.indexOf(d['Income group']) !== -1
        );
        const region = !!(
          selectedRegions.length === 0 ||
          selectedRegions.indexOf(d.UNDP_region || '') !== -1
        );
        const country = !!(
          selectedCountries.length === 0 ||
          selectedCountries.indexOf(d['Country or Area']) !== -1
        );
        return {
          countryCode: d['Alpha-3 code'],
          countryName: d['Country or Area'],
          xVal,
          colorVal,
          region,
          countryGroup,
          incomeGroup,
          country,
        };
      })
      .filter(
        d =>
          d.xVal !== undefined &&
          d.xVal !== null &&
          d.country &&
          d.countryGroup &&
          d.incomeGroup &&
          d.region,
      ),
    'xVal',
    reverseOrder ? 'desc' : 'asc',
  );

  const svgHeight = dataFormatted.length * 25 + margin.top + margin.bottom;
  const xMaxValue = maxBy(dataFormatted, d => d.xVal)
    ? (maxBy(dataFormatted, d => d.xVal)?.xVal as number)
    : 0;
  const xMinValue = minBy(dataFormatted, d => d.xVal)
    ? (minBy(dataFormatted, d => d.xVal)?.xVal as number)
    : 0;

  const widthScale = scaleLinear()
    .domain([xMinValue > 0 ? 0 : xMinValue, xMaxValue])
    .range([0, graphWidth])
    .nice();

  const xTicks = widthScale.ticks(5);

  let colorList: string[] =
    colorIndicator === 'Income Groups'
      ? UNDPColorModule.divergentColors.colorsx04
      : UNDPColorModule.categoricalColors.colors;

  if (colorIndicatorMetaData?.IsCategorical) {
    switch (colorIndicatorMetaData?.Categories.length) {
      case 5:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx05;
        break;
      case 6:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx06;
        break;
      case 7:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx07;
        break;
      case 8:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx08;
        break;
      case 9:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx09;
        break;
      default:
        colorList = UNDPColorModule.sequentialColors.neutralColorsx10;
        break;
    }
  }

  if (colorIndicatorMetaData?.IsDivergent) {
    switch (colorIndicatorMetaData?.Categories.length) {
      case 4:
        colorList = UNDPColorModule.divergentColors.colorsx04;
        break;
      case 5:
        colorList = UNDPColorModule.divergentColors.colorsx05;
        break;
      case 7:
        colorList = UNDPColorModule.divergentColors.colorsx07;
        break;
      case 9:
        colorList = UNDPColorModule.divergentColors.colorsx09;
        break;
      default:
        colorList = UNDPColorModule.divergentColors.colorsx11;
        break;
    }
  }

  const colorDomain =
    colorIndicator === 'Continents'
      ? CONTINENTS
      : colorIndicator === 'Income Groups'
      ? INCOME_GROUPS
      : colorIndicatorMetaData?.Categories
      ? colorIndicatorMetaData?.Categories
      : [0, 0];
  const colorScale = scaleOrdinal<string | number, string>()
    .domain(colorDomain)
    .range(colorList)
    .unknown(UNDPColorModule.graphGray);

  return (
    <div className='undp-scrollbar'>
      <div style={{ padding: '2rem 0 0 2rem' }}>
        <p
          className='undp-typography'
          style={{ fontSize: '1.1rem', marginBottom: '0', lineHeight: '1.1' }}
        >
          {xIndicatorMetaData.Indicator}
        </p>
        {focusArea === 'All' ? (
          <p
            className='undp-typography'
            style={{ fontSize: '0.9rem', color: '#AAA' }}
          >
            {xIndicatorMetaData.FocusArea} Investment Case
          </p>
        ) : null}
      </div>
      <svg width='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <g transform={`translate(${margin.left},10)`}>
          <text x={0} y={10} fontSize={14} fill='#212121'>
            {colorIndicatorMetaData?.Indicator
              ? colorIndicatorMetaData?.Indicator
              : colorIndicator}
          </text>
          {colorDomain.map((d, i) => (
            <g
              transform='translate(0,20)'
              key={i}
              onMouseOver={() => {
                setSelectedColor(colorList[i]);
              }}
              onMouseLeave={() => {
                setSelectedColor(undefined);
              }}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={(i * (graphWidth - 50)) / colorDomain.length + 1}
                y={1}
                width={(graphWidth - 50) / colorDomain.length - 2}
                height={8}
                fill={colorList[i]}
                stroke={
                  selectedColor === colorList[i] ? '#212121' : colorList[i]
                }
              />
              <text
                x={
                  (i * (graphWidth - 50)) / colorDomain.length +
                  (graphWidth - 50) / 2 / colorDomain.length
                }
                y={25}
                textAnchor='middle'
                fontSize={12}
                fill='#212121'
              >
                {d}
              </text>
            </g>
          ))}
          <g transform='translate(0,20)'>
            <rect
              x={graphWidth - 40}
              y={1}
              width={40}
              height={8}
              fill={UNDPColorModule.graphGray}
              stroke={UNDPColorModule.graphGray}
            />
            <text
              x={graphWidth - 20}
              y={25}
              textAnchor='middle'
              fontSize={12}
              fill={UNDPColorModule.graphGray}
            >
              NA
            </text>
          </g>
        </g>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {xTicks.map((d, i) => (
            <g key={i}>
              <text
                x={widthScale(d)}
                y={-12.5}
                fill='#AAA'
                textAnchor='middle'
                fontSize={12}
              >
                {Math.abs(d) < 1
                  ? d
                  : format('~s')(d).replace('G', ' bil').replace('M', ' mil')}
              </text>
              <line
                x1={widthScale(d)}
                x2={widthScale(d)}
                y1={-2.5}
                y2={dataFormatted.length * 25 - 2.5}
                stroke='#AAA'
                strokeWidth={1}
                strokeDasharray='4,8'
                opacity={d === 0 ? 0 : 1}
              />
            </g>
          ))}
          {dataFormatted.map((d, i) => {
            const countryData =
              data[data.findIndex(el => el['Alpha-3 code'] === d.countryCode)];
            const selectedColorOpacity =
              d.colorVal !== undefined && d.colorVal !== null
                ? !selectedColor ||
                  selectedColor === (colorScale(d.colorVal) as string)
                : !selectedColor;
            const rowData: HoverRowDataType[] = [
              {
                title: xAxisIndicator,
                value: d.xVal !== undefined && d.xVal !== null ? d.xVal : 'NA',
                type: 'y-axis',
                prefix: xIndicatorMetaData?.LabelPrefix,
                suffix: xIndicatorMetaData?.LabelSuffix,
              },
            ];
            if (colorIndicator !== 'Continents') {
              rowData.push({
                title: colorIndicator,
                value:
                  d.colorVal !== undefined && d.colorVal !== null
                    ? d.colorVal
                    : 'NA',
                type: 'color',
                color: d.colorVal
                  ? (colorScale(d.colorVal) as string)
                  : UNDPColorModule.graphGray,
                prefix: colorIndicatorMetaData?.LabelPrefix,
                suffix: colorIndicatorMetaData?.LabelSuffix,
              });
            }

            if (d.xVal === undefined || d.xVal === null) return null;
            return (
              <g
                key={i}
                opacity={
                  !hoverData
                    ? selectedColorOpacity
                      ? 1
                      : 0.1
                    : hoverData.country === countryData['Country or Area']
                    ? 1
                    : 0.1
                }
                onMouseEnter={event => {
                  setHoverData({
                    country: countryData['Country or Area'],
                    continent: countryData['Group 1'],
                    rows: rowData,
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseMove={event => {
                  setHoverData({
                    country: countryData['Country or Area'],
                    continent: countryData['Group 1'],
                    rows: rowData,
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseLeave={() => {
                  setHoverData(undefined);
                }}
              >
                <text
                  fill={d.colorVal ? colorScale(d.colorVal) : '#212121'}
                  y={i * 25}
                  x={0}
                  dx={-50}
                  dy={14}
                  fontSize={12}
                  textAnchor='end'
                >
                  {d.countryName.length < 25
                    ? d.countryName
                    : `${d.countryName.substring(0, 25)}...`}
                </text>
                <rect
                  y={i * 25}
                  x={widthScale(Math.min(0, d.xVal))}
                  height={20}
                  fill={
                    d.colorVal
                      ? colorScale(d.colorVal)
                      : UNDPColorModule.graphGray
                  }
                  width={Math.abs(widthScale(d.xVal) - widthScale(0))}
                  rx={3}
                  ry={3}
                />
                <text
                  fill='#212121'
                  fontWeight='bold'
                  y={i * 25}
                  x={
                    d.xVal < 0
                      ? widthScale(Math.min(0, d.xVal))
                      : widthScale(d.xVal)
                  }
                  dx={d.xVal < 0 ? -5 : 5}
                  textAnchor={d.xVal < 0 ? 'end' : 'start'}
                  dy={14}
                  fontSize={12}
                >
                  {Math.abs(d.xVal) < 1
                    ? d.xVal
                    : format(',.1f')(d.xVal)
                        .replace(/\.0+$/, '') // Remove trailing zeros after decimal point
                        .replace(/\.(?=[^0-9]|$)/, '') // Remove decimal point if there are no decimal digits after it
                        .replace('G', ' bil')
                        .replace('M', ' mil')}
                </text>
              </g>
            );
          })}
          <line
            x1={widthScale(0)}
            x2={widthScale(0)}
            y1={-2.5}
            y2={dataFormatted.length * 25 - 2.5}
            stroke='#212121'
            strokeWidth={1}
          />
        </g>
      </svg>
      {hoverData ? <Tooltip data={hoverData} /> : null}
    </div>
  );
}
