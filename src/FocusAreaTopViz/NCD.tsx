import { ValueCard } from '../TopGraphComponents/ValueCard';

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
        <ValueCard
          title='Global deaths attributed to NCDs each year'
          number='41 million'
          year={2019}
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
          title='Premature NCD deaths before age 70 each year'
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
