import { ValueCard } from '../TopGraphComponents/ValueCard';
import { DonutChart } from '../TopGraphComponents/DonutChart';

function MentalHealthViz() {
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
          title='People in the world living with a mental health condition (1 in 8)'
          number='970 Million'
          year={2019}
        />
        <ValueCard
          title='Increase in major depressive disorders over one year during the COVID-19 pandemic'
          number='28%'
          year={2020}
          source='WHO'
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
          graphTitle='Proportion of WHO Member States with a stand-alone mental health policy or plan'
          size={340}
          value={[75, 25]}
          colors={['var(--dark-green)', 'var(--gray-400)']}
          note='WHO Member States'
          year={2020}
          source='WHO'
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
        <DonutChart
          graphTitle='Proportion of WHO Member States with mental health integrated into primary health care'
          size={340}
          value={[25, 75]}
          colors={['var(--dark-red)', 'var(--gray-400)']}
          note='Total: 49 countries'
          year={2020}
          source='WHO'
        />
      </div>
    </div>
  );
}

export default MentalHealthViz;
