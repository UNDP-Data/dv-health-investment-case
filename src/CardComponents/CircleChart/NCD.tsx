import styled from 'styled-components';
import { customFormat } from '../../Utils/CustomFormat';

interface Props {
  valuePrimary: number;
  dataKeyPrimary: string;
  valueSecondary: number;
  dataKeySecondary: string;
  graphTitle?: string;
  graphDescription?: string;
  year?: string | number;
  source?: string;
  colorPrimary?: string;
  colorSecondary?: string;
  size: number;
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
  font-size: 0.65rem;
  letter-spacing: 0.05rem;
`;

const SourceEl = styled.div`
  font-size: 1rem;
  color: var(--gray-500);
`;

export function CircleChartNCD(props: Props) {
  const {
    valuePrimary,
    dataKeyPrimary,
    valueSecondary,
    dataKeySecondary,
    graphTitle,
    year,
    source,
    graphDescription,
    colorPrimary = 'var(--blue-600)',
    colorSecondary = 'var(--blue-300)',
    size,
  } = props;

  const labelHeight = 32;
  const fixedRadius = size / 2;
  const areaPrimary = fixedRadius ** 2 * Math.PI;
  const areaSecondary = (valueSecondary / valuePrimary) * areaPrimary;
  const radiusSecondary = Math.sqrt(areaSecondary / Math.PI);

  const formattedPrimaryValue = customFormat(valuePrimary, dataKeyPrimary);
  const formattedSecondaryValue = customFormat(
    valueSecondary,
    dataKeySecondary,
  );

  const secondaryCircleYPosition = fixedRadius - radiusSecondary;

  return (
    <StatCardsEl>
      {graphTitle ? (
        <p className='undp-typography margin-bottom-00'>
          {graphTitle}
          {year ? <span className='undp-typography'> ({year})</span> : null}
        </p>
      ) : null}
      {valueSecondary ? (
        <h2 className='undp-typography margin-bottom-00'>
          ${formattedSecondaryValue}
        </h2>
      ) : null}
      {graphDescription && (
        <p
          className='undp-typography small-font margin-bottom-00'
          style={{ color: 'var(--gray-500)' }}
        >
          {graphDescription}
        </p>
      )}
      <svg
        style={{
          maxWidth: '15rem',
          margin: 'auto',
          width: '100%',
        }}
        viewBox={`0 0 ${size} ${size + labelHeight * 2}`}
      >
        <g
          transform={`translate(${fixedRadius},${
            fixedRadius + labelHeight * 2
          })`}
        >
          {/* Primary circle */}
          <circle cx={0} cy={0} r={fixedRadius} fill={colorPrimary} />
          <g>
            <LabelEl
              x={0}
              y={0 - fixedRadius - 22}
              style={{ fill: 'var(--black)', fontWeight: '600' }}
            >
              {formattedPrimaryValue}
            </LabelEl>
            <LabelEl
              x={0}
              y={0 - fixedRadius - 10}
              style={{ fill: 'var(--black)', fontWeight: '400' }}
            >
              GDP
            </LabelEl>
          </g>
          {/* Secondary circle */}
          <circle
            cx={0}
            cy={secondaryCircleYPosition}
            r={radiusSecondary}
            fill={colorSecondary}
          />
          <LabelEl
            x={0}
            y={secondaryCircleYPosition - radiusSecondary - 22}
            style={{ fill: 'var(--white)', fontWeight: '600' }}
          >
            {formattedSecondaryValue} (
            {customFormat((valueSecondary / valuePrimary) * 100, '')}%)
          </LabelEl>
          <LabelEl
            x={0}
            y={secondaryCircleYPosition - radiusSecondary - 10}
            style={{ fill: 'var(--white)', fontWeight: '400' }}
          >
            Benefits
          </LabelEl>
        </g>
      </svg>
      {source ? (
        <SourceEl className='margin-top-05'>Source: {source}</SourceEl>
      ) : null}
    </StatCardsEl>
  );
}
