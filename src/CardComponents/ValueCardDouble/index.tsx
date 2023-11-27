import styled from 'styled-components';
import { format } from 'd3-format';

interface Props {
  year?: string | number;
  value: number;
  graphTitle: string;
  graphDescription?: string;
  suffix?: string;
  prefix?: string;
  labelFormat?: string;
  source: string;
  year2?: string | number;
  value2: number;
  graphTitle2: string;
  graphDescription2?: string;
  suffix2?: string;
  prefix2?: string;
  labelFormat2?: string;
}

const StatCardsEl = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 1;
  flex-basis: 26.5rem;
  min-width: 26.5rem;
  min-height: 22.5rem;
  background-color: var(--gray-200);
  justify-content: space-between;
  font-size: 1.25rem;
  color: var(--black);
  transition: 300ms all;
  height: auto !important;
  scroll-snap-align: start;
`;

const SourceEl = styled.div`
  font-size: 1rem;
  color: var(--gray-500);
`;

const StatEl = styled.h3`
  font-size: 4.375rem !important;
  line-height: 1 !important;
  text-shadow: none !important;
  -webkit-text-stroke: 2px var(--black) !important;
  color: var(--gray-200) !important;
  letter-spacing: 0.05rem !important;
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
  font-family: var(--fontFamilyHeadings) !important;
`;

const YearEl = styled.span`
  font-size: 1.6rem !important;
  line-height: 1.09 !important;
  text-shadow: none !important;
  -webkit-text-stroke: 0px var(--black) !important;
  color: var(--gray-500) !important;
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
`;

export function ValueCardDouble(props: Props) {
  const {
    year,
    value,
    graphTitle,
    suffix,
    source,
    prefix,
    labelFormat,
    graphDescription,
    year2,
    value2,
    graphTitle2,
    suffix2,
    prefix2,
    labelFormat2,
    graphDescription2,
  } = props;

  return (
    <StatCardsEl>
      <p className='undp-typography margin-bottom-00'>{graphTitle}</p>
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
          flexGrow: 1,
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {year ? (
          <StatEl>
            {prefix || ''}{' '}
            {Math.abs(value) < 1
              ? value
              : format(labelFormat || '.3s')(value)
                  .replace('G', 'B')
                  .replace('M', 'Mil')}
            {suffix || ''} <YearEl>({year})</YearEl>
          </StatEl>
        ) : null}
      </div>
      <p className='undp-typography margin-bottom-00'>{graphTitle2}</p>
      {graphDescription2 ? (
        <p
          className='undp-typography small-font margin-bottom-00'
          style={{ color: 'var(--gray-500)' }}
        >
          {graphDescription2}
        </p>
      ) : null}
      <div
        style={{
          flexGrow: 1,
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {year2 ? (
          <StatEl>
            {prefix2 || ''}{' '}
            {Math.abs(value2) < 1
              ? value2
              : format(labelFormat2 || '.3s')(value2)
                  .replace('G', 'Bil')
                  .replace('M', 'Mil')}
            {suffix2 || ''} <YearEl>({year2})</YearEl>
          </StatEl>
        ) : null}
      </div>
      {source && source !== '' ? (
        <SourceEl className='margin-top-05'>Source: {source}</SourceEl>
      ) : null}
    </StatCardsEl>
  );
}
