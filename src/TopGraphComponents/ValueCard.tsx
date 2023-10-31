import styled from 'styled-components';

interface Props {
  number: string | number;
  title: string;
  year?: number;
  source?: string;
  note?: string;
}

const StatEl = styled.h3`
  width: 100%;
  font-size: 4.375rem !important;
  line-height: 0.9 !important;
  text-shadow: none !important;
  -webkit-text-stroke: 2px var(--black) !important;
  color: var(--gray-200) !important;
  letter-spacing: 0.05rem !important;
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
  font-family: var(--fontFamilyHeadings) !important;
`;

const SourceEl = styled.div`
  font-size: 1rem;
  color: var(--gray-500);
`;

const YearEl = styled.span`
  font-size: 1.5rem !important;
  line-height: 1.09 !important;
  text-shadow: none !important;
  -webkit-text-stroke: 0px var(--black) !important;
  color: var(--gray-500) !important;
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
`;

export function ValueCard(props: Props) {
  const { number, title, year, source, note } = props;
  return (
    <div style={{ flexGrow: 1, display: 'flex' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          flexWrap: 'wrap',
          lineHeight: '1.3',
        }}
      >
        <StatEl className='undp-typography bold margin-bottom-03'>
          {number}
          {year ? <YearEl> ({year})</YearEl> : null}
        </StatEl>
        {note ? <p className='undp-typography bold'>{note}</p> : null}
        <p className='undp-typography large-font margin-bottom-00'>{title}</p>
        {source ? (
          <SourceEl className='margin-top-05'>Source: {source}</SourceEl>
        ) : null}
      </div>
    </div>
  );
}
