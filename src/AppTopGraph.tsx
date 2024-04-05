import TobaccoViz from './FocusAreaTopViz/Tobacco';
import NCDViz from './FocusAreaTopViz/NCD';
import MentalHealthViz from './FocusAreaTopViz/MentalHealth';

interface Props {
  focusArea: string;
}

function AppTopGraph(props: Props) {
  const { focusArea } = props;
  return (
    <div
      className='undp-container padding-bottom-09 padding-top-09'
      style={{ backgroundColor: 'var(--gray-300)' }}
    >
      <div
        className='flex-div flex-wrap flex-hor-align-center gap-00'
        style={{ maxWidth: '1392px', margin: 'auto' }}
      >
        {focusArea === 'Tobacco_control' ? (
          <TobaccoViz />
        ) : focusArea === 'NCD' ? (
          <NCDViz />
        ) : focusArea === 'MentalHealth' ? (
          <MentalHealthViz />
        ) : null}
      </div>
    </div>
  );
}

export default AppTopGraph;
