import styled from 'styled-components';
import { useRef, useState } from 'react';
import { DataType, IndicatorMetaDataType } from '../../Types';
import { ValueCard } from '../../CardComponents/ValueCard';
import { ValueCardDouble } from '../../CardComponents/ValueCardDouble';
import { CircleChartTobacco } from '../../CardComponents/CircleChart/Tobacco';

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

export function TobaccoSummary(props: Props) {
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
          el => el.indicator === 'tobacco_burden' && 'tobacco_burden_GDP',
        ) !== -1 ? (
          <ValueCardDouble
            suffix2='%'
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'tobacco_burden')
              ].value
            }
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden')
              ].Indicator
            }
            value2={
              data.data[
                data.data.findIndex(el => el.indicator === 'tobacco_burden_GDP')
              ].value
            }
            graphTitle2={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden_GDP')
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden_GDP')
              ].DataSourceName
            }
            indicators={indicators}
          />
        ) : null}
        {data.data.findIndex(el => el.indicator === 'averted_deaths') !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'averted_deaths')
              ].value
            }
            dataKey='averted_deaths'
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'averted_deaths')
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'averted_deaths')
              ].DataSourceName
            }
            indicators={indicators}
          />
        ) : null}
        {data.data.findIndex(
          el => el.indicator === 'econ_losses_15years' && 'econ_benefits',
        ) !== -1 ? (
          <CircleChartTobacco
            graphTitle='Tobacco-related economic losses over 15 years if no intervention vs total economic benefits from interventions, in USD'
            valuePrimary={
              data.data[
                data.data.findIndex(
                  el => el.indicator === 'econ_losses_15years',
                )
              ].value
            }
            valueSecondary={
              data.data[
                data.data.findIndex(el => el.indicator === 'econ_benefits')
              ].value
            }
            valueTertiary={
              data.data[
                data.data.findIndex(
                  el => el.indicator === 'total_investment_15years',
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
        Year that the modelling of the tobacco control investment case refers
        to: {data.tobacco_reference_year}
      </div>
    </div>
  );
}
