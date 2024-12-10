import styled from 'styled-components';
import { DonutChartGraph } from './DonutChartGraph';

interface Props {
  value: number[];
  year?: number;
  colors: string[];
  note?: string;
  size: number;
  graphTitle?: string;
  source: string;
  sourceLink?: string;
  graphDescription?: string;
}

const StatCardsEl = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  flex-grow: 1;
  flex-basis: 26.5rem;
  min-width: 26.5rem;
  min-height: 22.5rem;
  background-color: var(--gray-200);
  font-size: 1.25rem;
  color: var(--black);
  transition: 300ms all;
  height: auto !important;
  scroll-snap-align: start;
`;

const SourceEl = styled.div`
  font-size: 0.875rem !important;
  color: var(--gray-600);
`;

export function DonutChart(props: Props) {
  const {
    value,
    colors,
    size,
    graphTitle,
    year,
    source,
    sourceLink,
    graphDescription,
    note,
  } = props;
  return (
    <StatCardsEl>
      {graphTitle ? (
        <p className='undp-typography margin-bottom-05'>
          {graphTitle}
          {year ? (
            <span className='undp-typography margin-bottom-05'> ({year})</span>
          ) : null}
        </p>
      ) : null}
      {graphDescription ? (
        <p
          className='undp-typography small-font margin-bottom-00'
          style={{ color: 'var(--gray-500)' }}
        >
          {graphDescription}
        </p>
      ) : null}
      <div
        style={{
          margin: 'auto',
          textAlign: 'center',
          width: 'fit-content',
        }}
      >
        <DonutChartGraph
          data={value}
          colors={colors}
          svgWidth={size}
          svgHeight={size}
          valueDonut={value[0]}
          suffix='%'
          noteDonut={note}
        />
      </div>
      <SourceEl className='margin-top-05'>
        Source:{' '}
        {sourceLink ? (
          <a
            className='undp-style'
            style={{
              color: 'var(--gray-600)',
              fontSize: '0.875rem',
            }}
            href={sourceLink}
            target='_blank'
            rel='noopener noreferrer'
          >
            {source}
          </a>
        ) : (
          source
        )}
      </SourceEl>
    </StatCardsEl>
  );
}
