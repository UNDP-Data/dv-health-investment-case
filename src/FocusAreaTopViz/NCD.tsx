import { ValueCard } from '../TopGraphComponents/ValueCard';
import { DotPlot } from '../TopGraphComponents/DotPlot';
import { DonutChart } from '../TopGraphComponents/DonutChart';

function NCDViz() {
  return (
    <div
      className='flex-div flex-wrap flex-hor-align-center'
      style={{ gap: 'var(--spacing-09)', width: '100%' }}
    >
      <div
        className='flex-div'
        style={{
          flexDirection: 'column',
          width: 'calc(33.33% - 2rem)',
          flexGrow: 1,
          flexBasis: '20rem',
          gap: 'var(--spacing-09)',
        }}
      >
        <DotPlot
          graphTitle='Global deaths are attributed to non-communicable diseases (NCDs)'
          size={200}
          value={74}
          year={2022}
          note='Total deaths: 41 Mil'
          source='WHO NCD Key Facts'
          dotColor='var(--dark-red)'
        />
      </div>
      <div
        className='flex-div'
        style={{
          flexDirection: 'column',
          width: 'calc(33.33% - 2rem)',
          flexGrow: 1,
          flexBasis: '20rem',
          gap: 'var(--spacing-09)',
        }}
      >
        <DonutChart
          graphTitle='Proportion of NCD deaths in LMICs'
          size={340}
          value={[77, 23]}
          colors={['var(--dark-red)', 'var(--gray-400)']}
          note='Total number: 31.6 Mil'
          year={2019}
          source='WHO NCD Key Facts'
        />
      </div>
      <div
        className='flex-div'
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: 'calc(33.33% - 2rem)',
          flexGrow: 1,
          flexBasis: '20rem',
          gap: 'var(--spacing-09)',
        }}
      >
        <ValueCard
          title='Premature NCD deaths before age 70'
          number='17 Mil'
          year={2019}
        />
        <ValueCard
          title='of these premature deaths occur in LMICs'
          number='86%'
          year={2019}
          source='WHO NCD Key Facts'
        />
      </div>
    </div>
  );
}

export default NCDViz;
