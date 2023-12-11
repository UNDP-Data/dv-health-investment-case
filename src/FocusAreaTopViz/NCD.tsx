import { ValueCard } from '../TopGraphComponents/ValueCard';
import { DotPlot } from '../TopGraphComponents/DotPlot';

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
          year={2019}
          note='Total deaths: 41 million'
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
        <ValueCard
          title='Premature NCD deaths before age 70'
          number='17 million'
          year={2019}
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
          title='Premature deaths from NCDs occurring in LMICs'
          number='86 %'
          year={2019}
          source='WHO NCD Key Facts'
        />
      </div>
    </div>
  );
}

export default NCDViz;
