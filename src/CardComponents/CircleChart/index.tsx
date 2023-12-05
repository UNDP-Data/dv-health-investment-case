import { format } from 'd3-format';
import styled from 'styled-components';

interface Props {
  isPercentage: boolean;
  valuePrimary: number;
  valueSecondary: number;
  graphTitle?: string;
  graphDescription?: string;
  year?: string | number;
  note?: string;
  source?: string;
  labelPrimary: string;
  labelSecondary: string;
  colorPrimary?: string;
  colorSecondary?: string;
  size: number;
  suffix?: string;
  prefix?: string;
  valueOnTop: number;
  labelFormat?: string;
  valueBottom?: number;
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
    isPercentage,
    valuePrimary,
    valueSecondary,
    valueOnTop,
    valueBottom,
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
    prefix,
    labelFormat,
  } = props;

  const labelHeight = 32;
  const radiusPrimary = size / 2;
  const areaPrimary = radiusPrimary ** 2 * Math.PI;
  const areaSecondry = isPercentage
    ? (areaPrimary * valuePrimary) / 100
    : areaPrimary / valuePrimary;
  const radiusSecondary = Math.sqrt(areaSecondry / Math.PI);
  return (
    <StatCardsEl>
      {graphTitle && year ? (
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
          {prefix}
          {Math.abs(valueOnTop) < 1
            ? valueOnTop
            : format(labelFormat || '')(valueOnTop)}{' '}
          {suffix}
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
          {/* Primary circle */}
          <circle cx={0} cy={0} r={radiusPrimary} fill={colorPrimary} />
          <LabelEl
            x={0}
            y={0 - radiusPrimary - 8}
            style={{ fill: 'var(--black)' }}
          >
            {labelPrimary}
          </LabelEl>
          {!isPercentage ? (
            <LabelEl
              x={0}
              y={0 - radiusPrimary - 24}
              style={{ fill: 'var(--black)', fontWeight: '600' }}
            >
              {format('.3s')(valueSecondary)
                .replace('G', ' Bil')
                .replace('M', ' Mil')}
            </LabelEl>
          ) : null}
          {/* Secondary circle */}
          <circle
            cx={0}
            cy={radiusPrimary - radiusSecondary}
            r={radiusSecondary}
            fill={colorSecondary}
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
            y={radiusPrimary - radiusSecondary * 2 - 26}
            style={{ fill: 'var(--white)', fontWeight: '600' }}
          >
            {valueBottom
              ? format('.3s')(valueBottom)
                  .replace('G', ' Bil')
                  .replace('M', ' Mil')
              : null}
          </LabelEl>
          {isPercentage ? (
            <LabelEl
              x={0}
              y={radiusPrimary - radiusSecondary * 2 - 24}
              style={{ fill: 'var(--white)', fontWeight: '600' }}
            >
              {' '}
              {format('.2s')(valuePrimary)}%
            </LabelEl>
          ) : null}
        </g>
      </svg>
      {source ? (
        <SourceEl className='margin-top-05'>Source: {source}</SourceEl>
      ) : null}
    </StatCardsEl>
  );
}
