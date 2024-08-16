import { Tabs } from 'antd';
import styled from 'styled-components';
import WorldEl from './World';
import CountryEl from './Country';

interface Props {
  focusArea: string;
}

const CustomTabContentHolder = styled.div`
  .undp-tabs .ant-tabs-content-holder {
    padding: 2.5rem 0rem 0rem 0rem;
`;

export function App(props: Props) {
  const { focusArea } = props;
  const mainTabs = [
    {
      key: 'worldData',
      label: 'World Data',
      children: <WorldEl focusArea={focusArea} />,
    },
    {
      key: 'countryProfile',
      label: 'Country Profiles',
      children: <CountryEl focusArea={focusArea} />,
    },
  ];
  return (
    <div className='undp-container'>
      <CustomTabContentHolder>
        <Tabs
          defaultActiveKey='worldData'
          className='undp-tabs'
          items={mainTabs.map(d => ({
            label: d.label,
            key: d.key,
            children: d.children,
          }))}
        />
      </CustomTabContentHolder>
    </div>
  );
}
