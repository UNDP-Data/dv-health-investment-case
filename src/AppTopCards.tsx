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
          valueText='41 million'
          value={74}
          year={2023}
          note='74 out of 100 people'
          source='WHO Noncommunicable Diseases Key Facts'
          dotColors='var(--dark-red)'
          sourceLink='https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases'
        />
        <DonutChart
          graphTitle='Percent of global population deaths caused by tobacco use each year'
          size={340}
          value={[16, 84]}
          colors={['var(--dark-red)', 'var(--gray-400)']}
          note='Total deaths: 8.7 million'
          source='WHO Report on the Global Tobacco Epidemic (2023)'
          sourceLink='https://www.who.int/publications/i/item/9789240077164'
        />
        <DotPlot
          graphTitle='People in the world incurring catastrophic out-of-pocket health spending'
          size={200}
          value={12}
          valueText='1.04 billion'
          note='13 out of 100 people'
          source='WHO and WB Tracking Universal Health Coverage 2023 Global Monitoring Report (2023)'
          dotColors='var(--dark-red)'
          sourceLink='https://www.who.int/publications/i/item/9789240080379'
        />
        <DotPlot
          graphTitle='People in the world who do not have access to essential health services'
          size={200}
          value={57}
          valueText='4.5 billion'
          note='57 out of 100 people'
          source='WHO and WB Tracking Universal Health Coverage 2023 Global Monitoring Report (2023)'
          dotColors='var(--dark-red)'
          sourceLink='https://www.who.int/publications/i/item/9789240080379'
        />
        <ValueCard
          value={970}
          graphTitle='People in the world living with a mental health condition'
          source='WHO Mental Health (2022)'
          dataKey=''
          note='1 out of 8 people'
          suffix=' million'
          indicators={[]}
          sourceLink='https://www.who.int/health-topics/mental-health#tab=tab_2'
        />
        <ValueCardDouble
          value={1.2}
          value2={92}
          suffix=' million'
          suffix2=' %'
          graphTitle='People who have died from road traffic crashes each year'
          graphTitle2='Percent of total road fatalities that occur in LMICs'
          source='WHO Road Traffic Injuries Key Facts (2023)'
          indicators={[]}
          sourceLink='https://www.who.int/news-room/fact-sheets/detail/road-traffic-injuries'
        />
        <DonutChart
          graphTitle='Percent of global population breathing unhealthy air'
          size={340}
          value={[99, 1]}
          colors={['var(--dark-red)', 'var(--gray-400)']}
          source='WHO Ambient Air Pollution Key Facts (2024)'
          sourceLink='https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health'
        />
        <ValueCardDouble
          value={22}
          value2={1.6}
          suffix=''
          suffix2=' billion'
          graphTitle='Number of neglected tropical diseases (NTDs)'
          graphTitle2='People affected by an NTD'
          source='WHO NTDs (2024)'
          indicators={[]}
          sourceLink='https://www.who.int/health-topics/neglected-tropical-diseases#tab=tab_1'
        />
        <DonutChart
          graphTitle='Percent of global population that is moderately or severely food insecure'
          size={340}
          value={[29, 71]}
          colors={['var(--dark-red)', 'var(--gray-400)']}
          note='Total: 2.3 billion people'
          source='Global Nutrition Report (2022)'
          sourceLink='https://globalnutritionreport.org/reports/2022-global-nutrition-report/'
        />
      </WrapperEl>
    </div>
  );
}
