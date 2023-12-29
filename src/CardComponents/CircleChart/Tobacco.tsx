import { format } from 'd3-format';
import styled from 'styled-components';

interface Props {
  valuePrimary: number;
  valueSecondary: number;
  valueTertiary: number;
  graphTitle?: string;
  graphDescription?: string;
  year?: string | number;
  source?: string;
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
  font-size: 0.62rem;
  letter-spacing: 0.04rem;
`;

const SourceEl = styled.div`
  font-size: 1rem;
  color: var(--gray-500);
`;

export function CircleChartTobacco(props: Props) {
  const {
    valuePrimary,
    valueSecondary,
    valueTertiary,
    graphTitle,
    year,
    source,
    graphDescription,
    size,
  } = props;

  // Calculate the maximum value and assign colors and sizes accordingly
  const values = [
    {
      value: valuePrimary,
      color: 'var(--blue-600)',
      label: 'Losses if no intervention',
    }, // Default color for primary
    { value: valueSecondary, color: '#02A38A', label: 'Economic benefits' }, // Default color for secondary
    {
      value: valueTertiary,
      color: '#5DD4F0',
      label: 'Intervention costs',
    }, // Default color for tertiary
  ];

  // Sort values to find the primary, secondary, and tertiary
  values.sort((a, b) => b.value - a.value);

  // Assign dynamic colors and sizes based on sorted values
  const [maxValue, midValue, minValue] = values;

  // Adjusting areas and radii
  const labelHeight = 32;
  const fixedRadius = size / 2;
  const areaPrimary = fixedRadius ** 2 * Math.PI;
  const areaSecondary = (midValue.value / maxValue.value) * areaPrimary;
  const radiusSecondary = Math.sqrt(areaSecondary / Math.PI);
  const areaTertiary = (minValue.value / maxValue.value) * areaPrimary;
  const radiusTertiary = Math.sqrt(areaTertiary / Math.PI);

  function formatValue(value: number) {
    return format('.3s')(value).replace('G', ' bil').replace('M', ' mil');
  }

  const formattedPrimaryValue = formatValue(valuePrimary);
  const formattedSecondaryValue = valueSecondary
    ? formatValue(valueSecondary)
    : null;

  const formattedTertiaryValue = valueTertiary
    ? formatValue(valueTertiary)
    : null;

  const secondaryCircleYPosition = fixedRadius - radiusSecondary;
  const tertiaryCircleYPosition = fixedRadius - radiusTertiary;

  return (
    <StatCardsEl>
      {graphTitle ? (
        <p className='undp-typography margin-bottom-00'>
          {graphTitle}
          {year ? <span className='undp-typography'> ({year})</span> : null}
        </p>
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
          <circle cx={0} cy={0} r={fixedRadius} fill={maxValue.color} />
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
              {maxValue.label}
            </LabelEl>
          </g>
          {/* Secondary circle */}
          <circle
            cx={0}
            cy={secondaryCircleYPosition}
            r={radiusSecondary}
            fill={midValue.color}
          />
          <LabelEl
            x={0}
            y={secondaryCircleYPosition - radiusSecondary - 22}
            style={{ fill: 'var(--white)', fontWeight: '600' }}
          >
            {formattedSecondaryValue}
          </LabelEl>
          <LabelEl
            x={0}
            y={secondaryCircleYPosition - radiusSecondary - 10}
            style={{ fill: 'var(--white)', fontWeight: '400' }}
          >
            {midValue.label}
          </LabelEl>
          {/* Tertiary circle */}
          <circle
            cx={0}
            cy={tertiaryCircleYPosition}
            r={radiusTertiary}
            fill={minValue.color}
          />
          <LabelEl
            x={0}
            y={tertiaryCircleYPosition - radiusTertiary - 22}
            style={{ fill: 'var(--white)', fontWeight: '600' }}
          >
            {formattedTertiaryValue}
          </LabelEl>
          <LabelEl
            x={0}
            y={tertiaryCircleYPosition - radiusTertiary - 10}
            style={{ fill: 'var(--white)', fontWeight: '400' }}
          >
            {minValue.label}
          </LabelEl>
        </g>
      </svg>
      {source ? (
        <SourceEl className='margin-top-05'>Source: {source}</SourceEl>
      ) : null}
    </StatCardsEl>
  );
}
