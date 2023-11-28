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
          title='people in the world use tobacco'
          number='1.3 Billion'
          year={2022}
        />
        <ValueCard
          title='deaths are attributed to tobacco each year'
          number='8 Mil'
          year={2022}
        />
        <ValueCard
          title='countries have ratified the WHO FCTC '
          number='182'
          year={2022}
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
        <DotPlot
          graphTitle='People used tobacco'
          value={22.3}
          size={200}
          year={2020}
          source='WHO'
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
        <DotPlot
          graphTitle='Tobacco users live in LMICs'
          value={80}
          size={200}
          year={2022}
          source='WHO'
          dotColor='var(--blue-600)'
        />
      </div>
    </div>
  );
}

export default TobaccoViz;
