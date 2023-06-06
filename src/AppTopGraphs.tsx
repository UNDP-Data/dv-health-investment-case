import styled from 'styled-components';
import { useRef, useState } from 'react';
import { DotPlot } from './CardComponents/DotPlot';
import { ValueCardDouble } from './CardComponents/ValueCardDouble';
import { ValueCard } from './CardComponents/ValueCard';
import { DonutChart } from './CardComponents/DonutChart';

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
          graphTitle='Global deaths are attributed to non-communicable diseases (NCDs)'
          size={200}
          value={74}
          year={2022}
          note='Total deaths: 41 million'
          source='WHO NCD stats'
          dotColors='var(--dark-red)'
        />
        <DonutChart
          graphTitle='NCD deaths in Low- and Middle-income Countries'
          size={340}
          value={[77, 23]}
          colors={['var(--blue-600)', 'var(--gray-400)']}
          year={2022}
          note='31.6 million'
          source='WHO NCD stats'
        />
        <DonutChart
          graphTitle='Premature NCD deaths (before age 70)'
          size={340}
          value={[33, 66]}
          colors={['var(--dark-red)', 'var(--gray-400)']}
          year={2022}
          note='13.5 million'
          source='WHO NCD stats'
        />
        {/* <ValueCard
          value={33.3}
          graphTitle='Premature NCD deaths (before age 70)'
          source='WHO NCD stats'
          suffix='%'
          year={2022}
        /> */}
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
          graphTitle2='Deaths in Low- and Middle-income Countries (LMICs)'
          source='WHO road traffic injuries stats'
        />
        <DotPlot
          graphTitle='Global population live in unhealthy air (where the WHO air quality guidelines are not met)'
          size={200}
          value={99}
          year={2022}
          source='WHO air pollution stats'
          dotColors='var(--dark-red)'
        />
        <ValueCard
          value={1}
          graphTitle='People in the world have a mental disorder'
          source='WHO mental health stats'
          suffix=' in 8 people'
          year={2022}
          labelFormat='.1'
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
          source='WHO NTDs stats'
          labelFormat='.2'
          labelFormat2='.2'
        />
        <DotPlot
          graphTitle='People in the world risk of falling into poverty due to out-of-pocket payments'
          size={200}
          value={11.7}
          year={2022}
          note='Total number: 930 million'
          source='WHO Primary Health Care stats, UN World population prospect 2022'
          dotColors='var(--dark-red)'
        />
        <DotPlot
          graphTitle='People in the world do not have access to basic medicines'
          size={200}
          value={25.2}
          year={2022}
          note='Total number: 2 billion'
          source='WHO Access to medicines stats, UN World population prospect 2022'
          dotColors='var(--dark-red)'
        />
        <DotPlot
          graphTitle='People are moderately or severely food insecure'
          size={200}
          value={29}
          year={2022}
          note='Total number: 2.3 billion'
          source='Global Nutrition report'
          dotColors='var(--dark-red)'
        />
      </WrapperEl>
    </div>
  );
}
