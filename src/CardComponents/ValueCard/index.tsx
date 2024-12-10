import styled from 'styled-components';
import { customFormat } from '../../Utils/CustomFormat';
import { IndicatorMetaDataType } from '../../Types';

interface Props {
  year?: string | number;
  value: number;
  graphTitle: string;
  graphDescription?: string;
  suffix?: string;
  prefix?: string;
  source: string;
  sourceLink?: string;
  note?: string;
  dataKey?: string;
  indicators: IndicatorMetaDataType[];
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
  font-size: 0.875rem !important;
  color: var(--gray-600);
`;

const StatEl = styled.h3`
  font-size: 4.375rem !important;
  line-height: 1 !important;
  text-shadow: none !important;
  -webkit-text-stroke: 2px var(--black) !important;
  color: var(--gray-200) !important;
  letter-spacing: 0.05rem !important;
  margin-top: 0 !important;
  margin-bottom: 0.5rem !important;
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
const NoteEl = styled.span`
  font-size: 1.6rem !important;
  line-height: 1.09 !important;
  text-shadow: none !important;
  -webkit-text-stroke: 0px var(--black) !important;
  color: var(--black) !important;
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
`;

export function ValueCard(props: Props) {
  const {
    year,
    value,
    graphTitle,
    suffix,
    source,
    sourceLink,
    prefix,
    note,
    graphDescription,
    dataKey,
    indicators,
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
        <StatEl>
          {prefix || ''}
          {customFormat(
            value,
            indicators.findIndex(d => d.DataKey === dataKey) === -1
              ? false
              : indicators[indicators.findIndex(d => d.DataKey === dataKey)]
                  .IsYear,
            indicators.findIndex(d => d.DataKey === dataKey) === -1
              ? false
              : indicators[indicators.findIndex(d => d.DataKey === dataKey)]
                  .IsPeopleValue,
          )}
          {suffix || ''} {year ? <YearEl>({year})</YearEl> : null}
        </StatEl>
        {note && note !== '' ? <NoteEl>{note}</NoteEl> : null}
      </div>
      {source && source !== '' ? (
        <SourceEl className='margin-top-05'>
          Source:{' '}
          {sourceLink ? (
            <a
              className='undp-style'
              style={{ color: 'var(--gray-600)' }}
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
      ) : null}
    </StatCardsEl>
  );
}
