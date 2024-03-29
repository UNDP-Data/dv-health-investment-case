import { useContext, useState } from 'react';
import { format } from 'd3-format';
import maxBy from 'lodash.maxby';
import orderBy from 'lodash.orderby';
import { scaleOrdinal, scaleLinear, scaleBand } from 'd3-scale';
import minBy from 'lodash.minby';
import UNDPColorModule from 'undp-viz-colors';
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
  svgHeight: number;
  focusArea: string;
}

export function Graph(props: Props) {
  const { data, indicators, svgHeight, svgWidth, focusArea } = props;
  const {
    xAxisIndicator,
    colorIndicator,
    selectedCountries,
    selectedRegions,
    selectedIncomeGroups,
    selectedCountryGroup,
  } = useContext(Context) as CtxDataType;
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    undefined,
  );
  const [hoverData, setHoverData] = useState<HoverDataType | undefined>(
    undefined,
  );
  const margin = {
    top: 50,
    bottom: 100,
    left: 90,
    right: 20,
  };
  const graphWidth = svgWidth - margin.left - margin.right;
  const graphHeight = svgHeight - margin.top - margin.bottom;
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
    'asc',
  );

  const xMaxValue = maxBy(dataFormatted, d => d.xVal)
    ? (maxBy(dataFormatted, d => d.xVal)?.xVal as number)
    : 0;
  const xMinValue = minBy(dataFormatted, d => d.xVal)
    ? (minBy(dataFormatted, d => d.xVal)?.xVal as number)
    : 0;

  const heightScale = scaleLinear()
    .domain([xMinValue > 0 ? 0 : xMinValue, xMaxValue])
    .range([graphHeight, 0])
    .nice();
  const yTicks = heightScale.ticks(5);
  const xScale = scaleBand()
    .domain(dataFormatted.map(d => d.countryCode))
    .range([0, graphWidth])
    .paddingInner(0.1)
    .paddingOuter(0.2);

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
    <>
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
      <svg width='100%' height='100%' viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        <g transform='translate(90,20)'>
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
              fill='#212121'
            >
              NA
            </text>
          </g>
        </g>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <g>
            {yTicks.map((d, i) => (
              <g key={i} opacity={d === 0 ? 0 : 1}>
                <line
                  y1={heightScale(d)}
                  y2={heightScale(d)}
                  x1={0}
                  x2={graphWidth}
                  stroke='#AAA'
                  strokeWidth={1}
                  strokeDasharray='4,8'
                />
                <text
                  x={0}
                  y={heightScale(d)}
                  fill={UNDPColorModule.graphGray}
                  textAnchor='end'
                  fontSize={12}
                  dy={3}
                  dx={-2}
                >
                  {Math.abs(d) < 1
                    ? d
                    : format('~s')(d).replace('G', 'B').replace('M', 'mil')}
                </text>
              </g>
            ))}
            <line
              y1={heightScale(0)}
              y2={heightScale(0)}
              x1={0}
              x2={graphWidth}
              stroke={UNDPColorModule.graphGray}
              strokeWidth={1}
            />
            <text
              x={0}
              y={heightScale(0)}
              fill={UNDPColorModule.graphGray}
              textAnchor='end'
              fontSize={12}
              dy={3}
              dx={-2}
            >
              {0}
            </text>
          </g>

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
                type: 'x-axis',
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
                <rect
                  x={xScale(d.countryCode)}
                  y={heightScale(Math.max(0, d.xVal))}
                  width={xScale.bandwidth()}
                  fill={
                    d.colorVal
                      ? colorScale(d.colorVal)
                      : UNDPColorModule.graphGray
                  }
                  height={Math.abs(heightScale(d.xVal) - heightScale(0))}
                />
                {xScale.bandwidth() >= 7 && xScale.bandwidth() < 20 ? (
                  <g
                    transform={`translate(${
                      (xScale(d.countryCode) as number) + xScale.bandwidth() / 2
                    },${heightScale(0)})`}
                  >
                    <text
                      x={0}
                      y={0}
                      fontSize='12px'
                      textAnchor={d.xVal >= 0 ? 'end' : 'start'}
                      fill='#110848'
                      transform='rotate(-90)'
                      dy='5px'
                      dx={d.xVal >= 0 ? '-5px' : '19px'}
                    >
                      {countryData['Alpha-3 code']}
                    </text>
                  </g>
                ) : null}
                {xScale.bandwidth() >= 20 ? (
                  <text
                    x={
                      (xScale(d.countryCode) as number) + xScale.bandwidth() / 2
                    }
                    y={heightScale(0)}
                    fontSize='12px'
                    textAnchor='middle'
                    fill='#110848'
                    dy={d.xVal >= 0 ? '15px' : '-5px'}
                  >
                    {d.countryCode}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>
      {hoverData ? <Tooltip data={hoverData} /> : null}
    </>
  );
}
