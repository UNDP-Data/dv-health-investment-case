import styled from 'styled-components';
import { useRef, useState } from 'react';
import { DataType, IndicatorMetaDataType } from '../../Types';
import { ValueCard } from '../../CardComponents/ValueCard';
import { DotPlot } from '../../CardComponents/DotPlot';

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

export function CountrySummary(props: Props) {
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
        {data.data.findIndex(el => el.indicator === 'tobacco_burden') !== -1 ? (
          <DotPlot
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden')
              ].Indicator
            }
            size={200}
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'tobacco_burden')
              ].value
            }
            year={2023}
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden')
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(el => el.indicator === 'tobacco_burden') !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'tobacco_burden')
              ].value
            }
            year={2023}
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden')
              ].Indicator
            }
            graphDescription={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden')
              ].IndicatorDescription
            }
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden')
              ].DataSourceName
            }
          />
        ) : null}
      </WrapperEl>
    </div>
  );
}
