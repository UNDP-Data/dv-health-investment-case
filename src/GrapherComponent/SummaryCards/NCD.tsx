import styled from 'styled-components';
import { useRef, useState } from 'react';
import { DataType, IndicatorMetaDataType } from '../../Types';
import { ValueCard } from '../../CardComponents/ValueCard';
import { ValueCardDouble } from '../../CardComponents/ValueCardDouble';
import { CircleChart } from '../../CardComponents/CircleChart';
// import { DotPlot } from '../../CardComponents/DotPlot';

interface Props {
  data: DataType;
  indicators: IndicatorMetaDataType[];
}

const WrapperEl = styled.div`
  scroll-snap-type: x mandatory;
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
            WrapperRef.current.scrollBy(50, 0);
          else WrapperRef.current.scrollBy(-50, 0);
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
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'tobacco_burden')
              ].value
            }
            year={data.reference_year}
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
            year2={data.reference_year}
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden_GDP')
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(el => el.indicator === 'averted_deaths') !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'averted_deaths')
              ].value
            }
            year={data.reference_year}
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
          />
        ) : null}
        {data.data.findIndex(
          el => el.indicator === 'all_ROI_15years' && 'econ_benefits',
        ) !== -1 ? (
          <CircleChart
            valuePrimary={
              data.data[
                data.data.findIndex(el => el.indicator === 'all_ROI_15years')
              ].value
            }
            valueSecondary={
              data.data[
                data.data.findIndex(el => el.indicator === 'econ_benefits')
              ].value
            }
            graphTitle='Return-on-investment over 15 years if all interventions are implemented'
            year={2022}
            labelPrimary='Benefits'
            labelSecondary='Investment'
            colorPrimary='var(--blue-600)'
            colorSecondary='transparent'
            size={200}
            suffix=' : 1'
          />
        ) : null}
      </WrapperEl>
    </div>
  );
}
