import { Tabs } from 'antd';
import WorldEl from './World';
import CountryEl from './Country';

interface Props {
  focusArea: string;
}

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
      <Tabs
        defaultActiveKey='worldData'
        className='undp-tabs'
        items={mainTabs.map(d => ({
          label: d.label,
          key: d.key,
          children: d.children,
        }))}
      />
    </div>
  );
}
