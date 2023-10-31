import styled from 'styled-components';
import { useRef, useState } from 'react';
import { DonutChart } from './CardComponents/DonutChart';
import { DotPlot } from './CardComponents/DotPlot';
import { ValueCard } from './CardComponents/ValueCard';
import { ValueCardDouble } from './CardComponents/ValueCardDouble';

const WrapperEl = styled.div`
  scroll-snap-type: x mandatory;
  scroll-padding: 0;
  scroll-padding-left: 0;
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
  user-select: none;
`;

export function AppTopCards() {
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
          graphTitle='Global deaths are attributed to non-communicable diseases (NCDs)'
          size={200}
          value={74}
          year={2022}
          note='Total deaths: 41 million'
          source='WHO NCD Key Facts'
          dotColors='var(--dark-red)'
        />
        <ValueCard
          value={8}
          graphTitle='Death caused by tobacco every year'
          source='WHO'
          labelFormat='.2'
          suffix='M'
        />
        <ValueCard
          value={1}
          graphTitle='People in the world have a mental disorder'
          source='WHO mental health Key Facts'
          suffix=' in 8 people'
          year={2022}
          labelFormat='.1'
        />
        <ValueCardDouble
          value={1.3}
          value2={93}
          suffix='M'
          suffix2='%'
          year={2022}
          year2={2022}
          labelFormat='.2'
          labelFormat2='.2'
          graphTitle='People die from road traffic crashes'
          graphTitle2='Deaths in Low- and Middle-income Countries'
          source='WHO road traffic injuries Key Facts'
        />
        <DonutChart
          graphTitle='Global population live in unhealthy air (where the WHO air quality guidelines are not met)'
          size={340}
          value={[99, 1]}
          colors={['var(--dark-red)', 'var(--gray-400)']}
          year={2022}
          source='WHO air pollution Key Facts'
        />
        <ValueCardDouble
          value={20}
          value2={1.7}
          suffix=''
          suffix2='B'
          year={2022}
          year2={2022}
          graphTitle='Number of neglected topical diseases'
          graphTitle2='People affected by one of these diseases'
          source='WHO NTDs Key Facts'
          labelFormat='.2'
          labelFormat2='.2'
        />
        <DotPlot
          graphTitle='People in the world risk of falling into poverty due to out-of-pocket payments'
          size={200}
          value={12}
          year={2022}
          note='Total number: 930 million'
          source='WHO Primary Health Care Key Facts, UN World population prospect 2022'
          dotColors='var(--dark-red)'
        />
        <DotPlot
          graphTitle='People in the world do not have access to basic medicines'
          size={200}
          value={25}
          year={2022}
          note='Total number: 2 billion'
          source='WHO Access to medicines Key Facts, UN World population prospect 2022'
          dotColors='var(--dark-red)'
        />
        <DonutChart
          graphTitle='People are moderately or severely food insecure'
          size={340}
          value={[29, 71]}
          colors={['var(--dark-red)', 'var(--gray-400)']}
          note='Total number: 2.3 billion'
          year={2022}
          source='Global Nutrition Report'
        />
      </WrapperEl>
    </div>
  );
}
