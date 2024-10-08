import styled from 'styled-components';
import { useRef, useState } from 'react';
import { DataType, IndicatorMetaDataType } from '../../Types';
import { ValueCard } from '../../CardComponents/ValueCard';
import { ValueCardDouble } from '../../CardComponents/ValueCardDouble';
import { CircleChartNCD } from '../../CardComponents/CircleChart/NCD';

interface Props {
  data: DataType;
  indicators: IndicatorMetaDataType[];
}

const WrapperEl = styled.div`
  scroll-snap-type: x proximity;
  scroll-padding: 0;
  scroll-padding-left: 0;
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
  user-select: none;
`;

export function NCDSummary(props: Props) {
  const { data, indicators } = props;
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(
    'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
  );
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className='margin-bottom-07'
      style={{
        cursor: `${cursor}, auto`,
      }}
      onClick={e => {
        if (WrapperRef.current) {
          if (e.clientX > window.innerWidth / 2)
            WrapperRef.current.scrollBy(360, 0);
          else WrapperRef.current.scrollBy(-360, 0);
        }
      }}
      onMouseMove={e => {
        if (e.clientX > window.innerWidth / 2)
          setCursor(
            'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
          );
        else
          setCursor(
            'url(https://design.undp.org/static/media/arrow-left.14de54ea.svg)',
          );
      }}
    >
      <WrapperEl
        className='flex-div stat-container undp-scrollbar'
        ref={WrapperRef}
      >
        {data.data.findIndex(
          el => el.indicator === 'econ_burden' && 'econ_burden_GDP',
        ) !== -1 ? (
          <ValueCardDouble
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'econ_burden')
              ].value
            }
            dataKey='econ_burden'
            dataKey2='econ_burden_perc_of_GDP'
            graphTitle={
              indicators[indicators.findIndex(d => d.DataKey === 'econ_burden')]
                .Indicator
            }
            value2={
              data.data[
                data.data.findIndex(
                  el => el.indicator === 'econ_burden_perc_of_GDP',
                )
              ].value
            }
            graphTitle2={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'econ_burden_perc_of_GDP',
                )
              ].Indicator
            }
            prefix='$'
            suffix2='%'
            source={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'econ_burden_perc_of_GDP',
                )
              ].DataSourceName
            }
            indicators={indicators}
          />
        ) : null}
        {data.data.findIndex(
          el => el.indicator === '15y_deaths_averted_total',
        ) !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(
                  el => el.indicator === '15y_deaths_averted_total',
                )
              ].value
            }
            dataKey='15y_deaths_averted_total'
            graphTitle={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === '15y_deaths_averted_total',
                )
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === '15y_deaths_averted_total',
                )
              ].DataSourceName
            }
            indicators={indicators}
          />
        ) : null}
        {data.data.findIndex(
          el => el.indicator === '15y_econ_benefits_total' && data.GDP_USD_NCD,
        ) !== -1 && data.GDP_USD_NCD ? (
          <CircleChartNCD
            graphTitle='Total economic benefits over 15 years from implementing all interventions, in USD'
            valuePrimary={data.GDP_USD_NCD}
            valueSecondary={
              data.data[
                data.data.findIndex(
                  el => el.indicator === '15y_econ_benefits_total',
                )
              ].value
            }
            size={200}
          />
        ) : null}
      </WrapperEl>
      <div
        className='undp-typography italics'
        style={{
          fontSize: '1rem',
          color: 'var(--gray-500)',
        }}
      >
        Year that the modelling of the NCD investment case refers to:{' '}
        {data.NCD_reference_year}
      </div>
    </div>
  );
}
