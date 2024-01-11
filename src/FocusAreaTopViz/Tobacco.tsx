import { ValueCard } from '../TopGraphComponents/ValueCard';
import { DotPlot } from '../TopGraphComponents/DotPlot';

function TobaccoViz() {
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
          title='People in the world use tobacco'
          number='1.3 billion'
          source='WHO 2023'
        />
        <ValueCard
          title='Deaths are attributed to tobacco each year'
          number='8.7 million'
          source='WHO 2023'
        />
        <ValueCard
          title='Countries have ratified the WHO FCTC'
          number='183'
          source='WHO FCTC 2023'
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
        <DotPlot
          graphTitle='People use tobacco globally'
          value={22.3}
          size={200}
          year={2020}
          dotColor='var(--dark-red)'
          source='WHO 2023'
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
        <DotPlot
          graphTitle='Tobacco users live in LMICs'
          value={80}
          size={200}
          year={2023}
          source='WHO 2023'
          dotColor='var(--blue-600)'
        />
      </div>
    </div>
  );
}

export default TobaccoViz;
