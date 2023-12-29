import styled from 'styled-components';
import { useRef, useState } from 'react';
import { DonutChart } from './CardComponents/DonutChart';
import { DotPlot } from './CardComponents/DotPlot';
import { ValueCard } from './CardComponents/ValueCard';
import { ValueCardDouble } from './CardComponents/ValueCardDouble';

const WrapperEl = styled.div`
  scroll-snap-type: x proximity;
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
        <DotPlot
          graphTitle='Global deaths attributed to non-communicable diseases (NCDs)'
          size={200}
          value={74}
          year={2023}
          note='Total deaths: 41 million'
          source='WHO Noncommunicable Diseases Key Facts'
          dotColors='var(--dark-red)'
        />
        <DonutChart
          graphTitle='Percent of global population deaths caused by tobacco use each year'
          size={340}
          year={2022}
          value={[13, 87]}
          colors={['var(--dark-red)', 'var(--gray-400)']}
          note='Total number: 8.7 million'
          source='WHO Report on the Global Tobacco Epidemic, UN World Population Prospects (2022)'
        />
        <DotPlot
          graphTitle='People in the world incurring catastrophic out-of-pocket health spending'
          size={200}
          value={12}
          year={2023}
          note='Total: 1.04 billion people'
          source='WHO and WB Tracking Universal Health Coverage 2023 Global Monitoring Report'
          dotColors='var(--dark-red)'
        />
        <ValueCard
          value={2}
          graphTitle='People in the world who do not have access to essential medicines'
          year={2023}
          source='OHCHR Access to Vaccines and Medicines'
          dataKey=''
          note='1 out of 4 people'
          suffix=' bil'
        />
        <ValueCard
          value={970}
          graphTitle='People in the world living with a mental health condition'
          year={2022}
          source='WHO Mental Health Key Facts'
          dataKey=''
          note='1 out of 8 people'
          suffix=' mil'
        />
        <ValueCardDouble
          value={1.3}
          value2={93}
          suffix=' mil'
          suffix2=' %'
          year={2022}
          year2={2022}
          dataKey2=''
          dataKey=''
          graphTitle='People die from road traffic crashes each year'
          graphTitle2='Percent of total road fatalities that occur in LMICs'
          source='WHO Road Traffic Injuries Key Facts'
        />
        <DonutChart
          graphTitle='Percent of global population breathing unhealthy air'
          size={340}
          year={2022}
          value={[99, 1]}
          colors={['var(--dark-red)', 'var(--gray-400)']}
          source='WHO Air Pollution Key Facts'
          note='of global population'
        />
        <ValueCardDouble
          value={20}
          value2={1.7}
          suffix=''
          suffix2=' bil'
          year={2022}
          year2={2022}
          graphTitle='Number of neglected tropical diseases (NTDs)'
          graphTitle2='People affected by an NTD'
          source='WHO NTDs Key Facts'
          dataKey=''
          dataKey2=''
        />
        <DonutChart
          graphTitle='Percent of global population that is moderately or severely food insecure'
          size={340}
          value={[29, 71]}
          colors={['var(--dark-red)', 'var(--gray-400)']}
          note='Total number: 2.3 billion'
          source='Global Nutrition Report (2022)'
        />
      </WrapperEl>
    </div>
  );
}
