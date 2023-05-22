import styled from 'styled-components';
import { useRef, useState } from 'react';
import { DotPlot } from './CardComponents/DotPlot';
import { ValueCard } from './CardComponents/ValueCard';

const WrapperEl = styled.div`
  scroll-snap-type: x mandatory;
  scroll-padding: 0;
  scroll-padding-left: 0;
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
  user-select: none;
`;

export function AppTopGraphs() {
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(
    'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
  );
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className='margin-bottom-07 undp-container'
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
        <DotPlot
          graphTitle='Tobacco Burden'
          size={200}
          value={20}
          year={2023}
          source='WHO'
        />
        <ValueCard
          value={20}
          year={2023}
          graphTitle='Tobacco Burden'
          graphDescription='Tobacco Burden'
          source='WHO'
        />
        <ValueCard
          value={20}
          year={2023}
          graphTitle='Tobacco Burden'
          graphDescription='Tobacco Burden'
          source='WHO'
        />
        <ValueCard
          value={20}
          year={2023}
          graphTitle='Tobacco Burden'
          graphDescription='Tobacco Burden'
          source='WHO'
        />
        <ValueCard
          value={20}
          year={2023}
          graphTitle='Tobacco Burden'
          graphDescription='Tobacco Burden'
          source='WHO'
        />
        <ValueCard
          value={20}
          year={2023}
          graphTitle='Tobacco Burden'
          graphDescription='Tobacco Burden'
          source='WHO'
        />
        <ValueCard
          value={20}
          year={2023}
          graphTitle='Tobacco Burden'
          graphDescription='Tobacco Burden'
          source='WHO'
        />
      </WrapperEl>
    </div>
  );
}
