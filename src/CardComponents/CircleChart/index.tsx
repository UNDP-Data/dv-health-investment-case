import { format } from 'd3-format';
import styled from 'styled-components';

interface Props {
  valuePrimary: number;
  valueSecondary: number;
  graphTitle?: string;
  graphDescription?: string;
  year: number;
  note?: string;
  source?: string;
  labelPrimary: string;
  labelSecondary: string;
  colorPrimary?: string;
  colorSecondary?: string;
  size: number;
  suffix: string;
}

const StatCardsEl = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  flex-grow: 1;
  flex-basis: 22.5rem;
  min-width: 22.5rem;
  min-height: 22.5rem;
  background-color: var(--gray-200);
  font-size: 1.25rem;
  color: var(--black);
  transition: 300ms all;
  height: auto !important;
  scroll-snap-align: start;
`;

const LabelEl = styled.text`
  dominant-baseline: middle;
  text-anchor: middle;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.05rem;
`;

const SourceEl = styled.div`
  font-size: 1rem;
  color: var(--gray-500);
`;

export function CircleChart(props: Props) {
  const {
    valuePrimary,
    valueSecondary,
    graphTitle,
    note,
    year,
    source,
    graphDescription,
    labelPrimary,
    labelSecondary,
    colorPrimary,
    colorSecondary,
    size,
    suffix,
  } = props;

  const labelHeight = 32;
  const radiusPrimary = size / 2;
  const areaPrimary = radiusPrimary ** 2 * Math.PI;
  const radiusSecondary = Math.sqrt(areaPrimary / valuePrimary / Math.PI);
  return (
    <StatCardsEl>
      {graphTitle ? (
        <p className='undp-typography margin-bottom-00'>
          {graphTitle} ({year})
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
      <div>
        <h2 className='undp-typography bold margin-bottom-05 margin-top-05'>
          {valuePrimary} {suffix}
        </h2>
        {note ? <p className='undp-typography bold'>{note}</p> : null}
      </div>
      <svg
        style={{
          maxWidth: '15rem',
          margin: 'auto',
          width: '100%',
        }}
        viewBox={`0 0 ${size} ${size + labelHeight * 2}`}
      >
        <g
          transform={`translate(${radiusPrimary},${
            radiusPrimary + labelHeight * 2
          })`}
        >
          <circle cx={0} cy={0} r={radiusPrimary} fill={colorPrimary} />
          <circle
            cx={0}
            cy={radiusPrimary - radiusSecondary}
            r={radiusSecondary}
            stroke={colorSecondary}
            strokeWidth={1.5}
            fill='transparent'
            strokeDasharray='6,4'
          />
          <LabelEl
            x={0}
            y={radiusPrimary - radiusSecondary * 2 - 10}
            style={{ fill: 'var(--white)' }}
          >
            {labelSecondary}
          </LabelEl>
          <LabelEl
            x={0}
            y={0 - radiusPrimary - 8}
            style={{ fill: 'var(--black)' }}
          >
            {labelPrimary}
          </LabelEl>
          <LabelEl
            x={0}
            y={0 - radiusPrimary - 24}
            style={{ fill: 'var(--black)', fontWeight: '600' }}
          >
            {format('.3s')(valueSecondary).replace('G', 'B')}
          </LabelEl>
        </g>
      </svg>
      {source ? (
        <SourceEl className='margin-top-05'>Source: {source}</SourceEl>
      ) : null}
    </StatCardsEl>
  );
}
