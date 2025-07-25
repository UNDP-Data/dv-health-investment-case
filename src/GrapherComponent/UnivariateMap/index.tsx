/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { geoEqualEarth } from 'd3-geo';
import { zoom } from 'd3-zoom';
import { format } from 'd3-format';
import { select } from 'd3-selection';
import UNDPColorModule from 'undp-viz-colors';
import maxBy from 'lodash.maxby';
import { scaleThreshold, scaleOrdinal, scaleSqrt } from 'd3-scale';
import {
  CtxDataType,
  DataType,
  HoverDataType,
  HoverRowDataType,
  IndicatorMetaDataType,
} from '../../Types';
import Context from '../../Context/Context';
import World from '../../Data/worldMap.json';
import { Tooltip } from '../../Components/Tooltip';

interface Props {
  data: DataType[];
  indicators: IndicatorMetaDataType[];
  focusArea: string;
}

const G = styled.g`
  pointer-events: none;
`;

export function UnivariateMap(props: Props) {
  const { data, indicators, focusArea } = props;
  const {
    xAxisIndicator,
    sizeIndicator,
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
  const queryParams = new URLSearchParams(window.location.search);
  const svgWidth =
    queryParams.get('showSettings') === 'false' && window.innerWidth > 960
      ? 1280
      : 960;
  const svgHeight = 678;
  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);
  const projection = geoEqualEarth()
    .rotate([0, 0])
    .scale(180)
    .translate([470, 315]);
  const xIndicatorMetaData =
    indicators[
      indicators.findIndex(indicator => indicator.Indicator === xAxisIndicator)
    ];
  const sizeIndicatorMetaData =
    indicators[
      indicators.findIndex(indicator => indicator.Indicator === sizeIndicator)
    ];
  const valueArray = xIndicatorMetaData.IsCategorical
    ? xIndicatorMetaData.Categories
    : xIndicatorMetaData.BinningRangeLarge.length === 0
    ? xIndicatorMetaData.BinningRange5
    : xIndicatorMetaData.BinningRangeLarge;
  const colorArray = xIndicatorMetaData.IsDivergent
    ? UNDPColorModule.divergentColors[
        `colorsx${
          (valueArray.length + 1 < 10
            ? `0${valueArray.length + 1}`
            : `${valueArray.length + 1}`) as '04' | '05' | '07' | '09' | '11'
        }`
      ]
    : xIndicatorMetaData.MapColor
    ? xIndicatorMetaData.MapColor === 'Negative'
      ? UNDPColorModule.sequentialColors[
          `negativeColorsx${
            (valueArray.length + 1 < 10
              ? `0${valueArray.length + 1}`
              : `${valueArray.length + 1}`) as
              | '04'
              | '05'
              | '06'
              | '07'
              | '08'
              | '09'
              | '10'
          }`
        ]
      : UNDPColorModule.sequentialColors[
          `neutralColorsx${
            (valueArray.length + 1 < 10
              ? `0${valueArray.length + 1}`
              : `${valueArray.length + 1}`) as
              | '04'
              | '05'
              | '06'
              | '07'
              | '08'
              | '09'
              | '10'
          }`
        ]
    : UNDPColorModule.sequentialColors[
        `neutralColorsx${
          (valueArray.length + 1 < 10
            ? `0${valueArray.length + 1}`
            : `${valueArray.length + 1}`) as
            | '04'
            | '05'
            | '06'
            | '07'
            | '08'
            | '09'
            | '10'
        }`
      ];
  const colorScale = xIndicatorMetaData.IsCategorical
    ? scaleOrdinal<number, string>().domain(valueArray).range(colorArray)
    : scaleThreshold<number, string>().domain(valueArray).range(colorArray);

  const sizeMax = sizeIndicatorMetaData
    ? maxBy(
        data,
        d =>
          d.data[
            d.data.findIndex(
              el => el.indicator === sizeIndicatorMetaData.DataKey,
            )
          ]?.value,
      )
    : undefined;
  const radiusScale =
    sizeIndicatorMetaData && sizeMax
      ? scaleSqrt()
          .domain([
            0,
            sizeMax.data[
              sizeMax.data.findIndex(
                el => el.indicator === sizeIndicatorMetaData.DataKey,
              )
            ].value as number,
          ])
          .range([0.25, 30])
          .nice()
      : undefined;
  useEffect(() => {
    const mapGSelect = select(mapG.current);
    const mapSvgSelect = select(mapSvg.current);
    const zoomBehaviour = zoom()
      .scaleExtent([1, 6])
      .translateExtent([
        [-20, 0],
        [svgWidth + 20, svgHeight],
      ])
      .on('zoom', ({ transform }) => {
        mapGSelect.attr('transform', transform);
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapSvgSelect.call(zoomBehaviour as any);
  }, [svgHeight, svgWidth]);
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
            style={{ fontSize: '0.9rem', color: '#AAA', marginBottom: '0' }}
          >
            {xIndicatorMetaData.FocusArea} Investment Case
          </p>
        ) : null}
      </div>
      <svg
        width='100%'
        height='100%'
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        ref={mapSvg}
      >
        <g ref={mapG}>
          {data.map((d, i: number) => {
            const index = (World as any).features.findIndex(
              (el: any) => d['Alpha-3 code'] === el.properties.ISO3,
            );
            const indicatorIndex = d.data.findIndex(
              el => xIndicatorMetaData.DataKey === el.indicator,
            );
            const val =
              indicatorIndex === -1 ? undefined : d.data[indicatorIndex].value;
            const color =
              val !== undefined && val !== null
                ? colorScale(
                    xIndicatorMetaData.IsCategorical ? Math.floor(val) : val,
                  )
                : UNDPColorModule.graphNoData;

            const regionOpacity =
              selectedRegions.length === 0 ||
              selectedRegions.indexOf(d.UNDP_region || '') !== -1;
            const incomeGroupOpacity =
              selectedIncomeGroups.length === 0 ||
              selectedIncomeGroups.indexOf(d['Income group']) !== -1;
            const countryOpacity =
              selectedCountries.length === 0 ||
              selectedCountries.indexOf(d['Country or Area']) !== -1;
            const countryGroupOpacity =
              selectedCountryGroup === 'All' ? true : d[selectedCountryGroup];

            const rowData: HoverRowDataType[] = [
              {
                title: xAxisIndicator,
                value: val === undefined || val === null ? 'NA' : val,
                type: 'color',
                color,
                prefix: xIndicatorMetaData?.LabelPrefix,
                suffix: xIndicatorMetaData?.LabelSuffix,
              },
            ];
            if (sizeIndicatorMetaData) {
              const sizeIndicatorIndex = d.data.findIndex(
                el => sizeIndicatorMetaData?.DataKey === el.indicator,
              );
              const sizeVal =
                sizeIndicatorIndex === -1
                  ? undefined
                  : d.data[sizeIndicatorIndex].value;
              rowData.push({
                title: sizeIndicator,
                value:
                  sizeVal !== undefined && sizeVal !== null ? sizeVal : 'NA',
                type: 'size',
                prefix: sizeIndicatorMetaData?.LabelPrefix,
                suffix: sizeIndicatorMetaData?.LabelSuffix,
              });
            }
            return (
              <g
                key={i}
                opacity={
                  selectedColor
                    ? selectedColor === color
                      ? 1
                      : 0.1
                    : regionOpacity &&
                      incomeGroupOpacity &&
                      countryOpacity &&
                      countryGroupOpacity
                    ? 1
                    : 0.1
                }
                onMouseEnter={event => {
                  setHoverData({
                    country: d['Country or Area'],
                    continent: d['Group 1'],
                    rows: rowData,
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseMove={event => {
                  setHoverData({
                    country: d['Country or Area'],
                    continent: d['Group 1'],
                    rows: rowData,
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseLeave={() => {
                  setHoverData(undefined);
                }}
              >
                {index === -1 || d['Country or Area'] === 'Antarctica'
                  ? null
                  : (World as any).features[index].geometry.type ===
                    'MultiPolygon'
                  ? (World as any).features[index].geometry.coordinates.map(
                      (el: any, j: number) => {
                        let masterPath = '';
                        el.forEach((geo: number[][]) => {
                          let path = ' M';
                          geo.forEach((c: number[], k: number) => {
                            const point = projection([c[0], c[1]]) as [
                              number,
                              number,
                            ];
                            if (k !== geo.length - 1)
                              path = `${path}${point[0]} ${point[1]}L`;
                            else path = `${path}${point[0]} ${point[1]}`;
                          });
                          masterPath += path;
                        });
                        return (
                          <path
                            key={j}
                            d={masterPath}
                            stroke='#AAA'
                            strokeWidth={0.25}
                            fill={color}
                          />
                        );
                      },
                    )
                  : (World as any).features[index].geometry.coordinates.map(
                      (el: any, j: number) => {
                        let path = 'M';
                        el.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [
                            number,
                            number,
                          ];
                          if (k !== el.length - 1)
                            path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        return (
                          <path
                            key={j}
                            d={path}
                            stroke='#AAA'
                            strokeWidth={0.25}
                            fill={color}
                          />
                        );
                      },
                    )}
              </g>
            );
          })}
          {(World as any).features.map((d: any, i: number) => {
            const index = data.findIndex(
              el => el['Alpha-3 code'] === d.properties.ISO3,
            );
            if (index !== -1 || d.properties.NAME === 'Antarctica') return null;
            return (
              <g key={i} opacity={!selectedColor ? 1 : 0.3}>
                {d.geometry.type === 'MultiPolygon'
                  ? d.geometry.coordinates.map((el: any, j: any) => {
                      let masterPath = '';
                      el.forEach((geo: number[][]) => {
                        let path = ' M';
                        geo.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [
                            number,
                            number,
                          ];
                          if (k !== geo.length - 1)
                            path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        masterPath += path;
                      });
                      return (
                        <path
                          key={j}
                          d={masterPath}
                          stroke='#AAA'
                          strokeWidth={0.25}
                          fill={UNDPColorModule.graphNoData}
                        />
                      );
                    })
                  : d.geometry.coordinates.map((el: any, j: number) => {
                      let path = 'M';
                      el.forEach((c: number[], k: number) => {
                        const point = projection([c[0], c[1]]) as [
                          number,
                          number,
                        ];
                        if (k !== el.length - 1)
                          path = `${path}${point[0]} ${point[1]}L`;
                        else path = `${path}${point[0]} ${point[1]}`;
                      });
                      return (
                        <path
                          key={j}
                          d={path}
                          stroke='#AAA'
                          strokeWidth={0.25}
                          fill={UNDPColorModule.graphNoData}
                        />
                      );
                    })}
              </g>
            );
          })}
          {hoverData
            ? (World as any).features
                .filter(
                  (d: any) =>
                    d.properties.ISO3 ===
                    data[
                      data.findIndex(
                        (el: DataType) =>
                          el['Country or Area'] === hoverData?.country,
                      )
                    ]['Alpha-3 code'],
                )
                .map((d: any, i: number) => (
                  <G key={i} opacity={!selectedColor ? 1 : 0}>
                    {d.geometry.type === 'MultiPolygon'
                      ? d.geometry.coordinates.map((el: any, j: any) => {
                          let masterPath = '';
                          el.forEach((geo: number[][]) => {
                            let path = ' M';
                            geo.forEach((c: number[], k: number) => {
                              const point = projection([c[0], c[1]]) as [
                                number,
                                number,
                              ];
                              if (k !== geo.length - 1)
                                path = `${path}${point[0]} ${point[1]}L`;
                              else path = `${path}${point[0]} ${point[1]}`;
                            });
                            masterPath += path;
                          });
                          return (
                            <path
                              key={j}
                              d={masterPath}
                              stroke='#212121'
                              opacity={1}
                              strokeWidth={1}
                              fillOpacity={0}
                              fill={UNDPColorModule.graphNoData}
                            />
                          );
                        })
                      : d.geometry.coordinates.map((el: any, j: number) => {
                          let path = 'M';
                          el.forEach((c: number[], k: number) => {
                            const point = projection([c[0], c[1]]) as [
                              number,
                              number,
                            ];
                            if (k !== el.length - 1)
                              path = `${path}${point[0]} ${point[1]}L`;
                            else path = `${path}${point[0]} ${point[1]}`;
                          });
                          return (
                            <path
                              key={j}
                              d={path}
                              stroke='#212121'
                              opacity={1}
                              strokeWidth={1}
                              fillOpacity={0}
                              fill='none'
                            />
                          );
                        })}
                  </G>
                ))
            : null}
          {sizeIndicatorMetaData ? (
            <>
              {data.map((d, i) => {
                const sizeIndicatorIndex = d.data.findIndex(
                  el => sizeIndicatorMetaData.DataKey === el.indicator,
                );
                const sizeVal =
                  sizeIndicatorIndex === -1
                    ? undefined
                    : d.data[sizeIndicatorIndex].value;
                const center = projection([
                  d['Longitude (average)'],
                  d['Latitude (average)'],
                ]) as [number, number];
                const indicatorIndex = d.data.findIndex(
                  el => xIndicatorMetaData.DataKey === el.indicator,
                );
                const val =
                  indicatorIndex === -1
                    ? undefined
                    : d.data[indicatorIndex].value;
                const color =
                  val !== undefined && val !== null
                    ? colorScale(
                        xIndicatorMetaData.IsCategorical
                          ? Math.floor(val)
                          : val,
                      )
                    : UNDPColorModule.graphNoData;

                const regionOpacity =
                  selectedRegions.length === 0 ||
                  selectedRegions.indexOf(d.UNDP_region || '') !== -1;
                const incomeGroupOpacity =
                  selectedIncomeGroups.length === 0 ||
                  selectedIncomeGroups.indexOf(d['Income group']) !== -1;
                const countryOpacity =
                  selectedCountries.length === 0 ||
                  selectedCountries.indexOf(d['Country or Area']) !== -1;
                const countryGroupOpacity =
                  selectedCountryGroup === 'All'
                    ? true
                    : d[selectedCountryGroup];

                const rowData: HoverRowDataType[] = [
                  {
                    title: xAxisIndicator,
                    value: val === undefined || val === null ? 'NA' : val,
                    type: 'color',
                    color,
                    prefix: xIndicatorMetaData?.LabelPrefix,
                    suffix: xIndicatorMetaData?.LabelSuffix,
                  },
                ];
                if (sizeIndicatorMetaData) {
                  rowData.push({
                    title: sizeIndicator,
                    value:
                      sizeVal !== undefined && sizeVal !== null
                        ? sizeVal
                        : 'NA',
                    type: 'size',
                    prefix: sizeIndicatorMetaData?.LabelPrefix,
                    suffix: sizeIndicatorMetaData?.LabelSuffix,
                  });
                }
                return (
                  <circle
                    key={i}
                    onMouseEnter={event => {
                      setHoverData({
                        country: d['Country or Area'],
                        continent: d['Group 1'],
                        rows: rowData,
                        xPosition: event.clientX,
                        yPosition: event.clientY,
                      });
                    }}
                    onMouseMove={event => {
                      setHoverData({
                        country: d['Country or Area'],
                        continent: d['Group 1'],
                        rows: rowData,
                        xPosition: event.clientX,
                        yPosition: event.clientY,
                      });
                    }}
                    onMouseLeave={() => {
                      setHoverData(undefined);
                    }}
                    cx={center[0]}
                    cy={center[1]}
                    r={
                      sizeVal !== undefined && sizeVal !== null && radiusScale
                        ? radiusScale(sizeVal)
                        : 0
                    }
                    stroke='#212121'
                    strokeWidth={1}
                    fill='none'
                    opacity={
                      hoverData
                        ? hoverData.country === d['Country or Area']
                          ? 1
                          : 0.1
                        : selectedColor
                        ? selectedColor === color
                          ? 1
                          : 0.1
                        : regionOpacity &&
                          incomeGroupOpacity &&
                          countryOpacity &&
                          countryGroupOpacity
                        ? 1
                        : 0.1
                    }
                  />
                );
              })}
            </>
          ) : null}
        </g>
      </svg>
      <div className='bivariate-legend-container'>
        <div className='univariate-legend-el'>
          {sizeIndicator && radiusScale ? (
            <div>
              <div className='univariate-map-legend-text'>
                {sizeIndicatorMetaData.Indicator}
              </div>
              <svg
                width='135'
                height='90'
                viewBox='0 0 175 100'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <text
                  fontSize={12}
                  fontWeight={700}
                  textAnchor='middle'
                  fill='#212121'
                  x={4}
                  y={95}
                >
                  0
                </text>
                <text
                  fontSize={12}
                  fontWeight={700}
                  textAnchor='middle'
                  fill='#212121'
                  x={130}
                  y={95}
                >
                  {format('~s')(radiusScale.invert(40))}
                </text>
                <path d='M4 41L130 0V80L4 41Z' fill='#E9ECF6' />
                <circle
                  cx='4'
                  cy='41'
                  r='0.25'
                  fill='white'
                  stroke='#212121'
                  strokeWidth='2'
                />
                <circle
                  cx='130'
                  cy='41'
                  r='40'
                  fill='white'
                  stroke='#212121'
                  strokeWidth='2'
                />
              </svg>
            </div>
          ) : null}
          <div className='univariate-map-color-legend-element'>
            <div>
              <div className='univariate-map-legend-text'>
                {xIndicatorMetaData.Indicator}
              </div>
              <svg width='320' height='30' viewBox={`0 0 ${320} ${30}`}>
                <g>
                  {valueArray.map((d, i) => (
                    <g
                      key={i}
                      onMouseOver={() => {
                        setSelectedColor(colorArray[i]);
                      }}
                      onMouseLeave={() => {
                        setSelectedColor(undefined);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {xIndicatorMetaData.colorScaleTooltip ? (
                        <title>{xIndicatorMetaData.colorScaleTooltip[i]}</title>
                      ) : null}
                      <rect
                        x={
                          xIndicatorMetaData.IsCategorical
                            ? (i * 320) / valueArray.length + 1
                            : (i * 320) / colorArray.length + 1
                        }
                        y={1}
                        width={
                          xIndicatorMetaData.IsCategorical
                            ? 320 / valueArray.length - 2
                            : 320 / colorArray.length - 2
                        }
                        height={8}
                        fill={colorArray[i]}
                        stroke={
                          selectedColor === colorArray[i]
                            ? '#212121'
                            : colorArray[i]
                        }
                      />
                      <text
                        x={
                          xIndicatorMetaData.IsCategorical
                            ? (i * 320) / valueArray.length +
                              160 / valueArray.length
                            : ((i + 1) * 320) / colorArray.length
                        }
                        y={25}
                        textAnchor='middle'
                        fontSize={12}
                        fill='#212121'
                      >
                        {Math.abs(d) < 1
                          ? d
                          : format('~s')(d)
                              .replace('G', ' bil')
                              .replace('M', ' mil')}
                      </text>
                    </g>
                  ))}
                  {xIndicatorMetaData.IsCategorical ? null : (
                    <g>
                      <rect
                        onMouseOver={() => {
                          setSelectedColor(colorArray[valueArray.length]);
                        }}
                        onMouseLeave={() => {
                          setSelectedColor(undefined);
                        }}
                        x={(valueArray.length * 320) / colorArray.length + 1}
                        y={1}
                        width={320 / colorArray.length - 2}
                        height={8}
                        fill={colorArray[valueArray.length]}
                        stroke={
                          selectedColor === colorArray[valueArray.length]
                            ? '#212121'
                            : colorArray[valueArray.length]
                        }
                        strokeWidth={1}
                        style={{ cursor: 'pointer' }}
                      />
                    </g>
                  )}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 0 1rem 2rem' }}>
        <p
          className='undp-typography'
          style={{ fontSize: '0.875rem', color: '#AAA', marginBottom: '0' }}
        >
          The designations employed and the presentation of material on this map
          do not imply the expression of any opinion whatsoever on the part of
          the Secretariat of the United Nations or UNDP concerning the legal
          status of any country, territory, city or area or its authorities, or
          concerning the delimitation of its frontiers or boundaries.
        </p>
      </div>
      {hoverData ? <Tooltip data={hoverData} /> : null}
    </>
  );
}
