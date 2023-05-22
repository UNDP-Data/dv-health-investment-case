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
          graphTitle='Deaths related to noncommunicable diseases (NCDs)'
          size={200}
          value={74}
          year={2022}
          source='WHO'
          dotColors='var(--dark-red)'
        />
        <ValueCard
          value={41}
          suffix='M'
          year={2022}
          graphTitle='People die from non-communicable diseases (NCDs) each year'
          source='WHO'
        />
        <DotPlot
          graphTitle='NCD deaths in Low- and Middle-income Countries (LMICs)'
          size={200}
          value={77}
          year={2022}
          source='WHO'
          dotColors='var(--dark-red)'
        />
        <ValueCard
          value={17.9}
          year={2022}
          suffix='M'
          graphTitle='People die from heart disease each year, making it the primary cause of death among NCDs'
          source='WHO'
        />
        <DotPlot
          graphTitle='Premature NCD deaths (before age 70)'
          size={200}
          value={33.3}
          year={2022}
          source='WHO'
          dotColors='var(--dark-red)'
        />
      </WrapperEl>
    </div>
  );
}
