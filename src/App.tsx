import { Tabs } from 'antd';
import WorldEl from './World';
import CountryEl from './Country';

export function App() {
  const mainTabs = [
    {
      key: 'worldData',
      label: 'World Data',
      children: <WorldEl />,
    },
    {
      key: 'countryProfile',
      label: 'Country Profiles',
      children: <CountryEl />,
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
