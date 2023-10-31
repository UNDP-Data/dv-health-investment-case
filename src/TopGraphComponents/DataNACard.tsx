import styled from 'styled-components';

interface Props {
  graphTitle: string;
}

const StatEl = styled.h3`
  font-size: 4.375rem !important;
  line-height: 0.75 !important;
  text-shadow: none !important;
  -webkit-text-stroke: 2px var(--black) !important;
  color: var(--gray-300) !important;
  letter-spacing: 0.05rem !important;
  margin-top: 0 !important;
  margin-bottom: 1rem !important;
  font-family: var(--fontFamilyHeadings) !important;
`;

export function DataNACard(props: Props) {
  const { graphTitle } = props;
  return (
    <div
      className='flex-div gap-02'
      style={{
        flexGrow: 1,
        flexDirection: 'column',
        minHeight: '15rem',
      }}
    >
      <p className='undp-typography margin-bottom-00'>{graphTitle}</p>
      <div
        style={{
          flexGrow: 1,
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <StatEl>Data NA</StatEl>
      </div>
    </div>
  );
}
