import { useContext } from 'react';
import styled from 'styled-components';
import { BarChart3, List, Map, ScatterChart } from 'lucide-react';
import { Modal } from 'antd';
import { CtxDataType, DataType, IndicatorMetaDataType } from '../Types';
import Context from '../Context/Context';
import { Settings } from './Settings';
import { Graph } from './Graph';
import { DataSources } from './DataSources';
import { DataListForCountry } from './DataList/DataListForCountry';

interface Props {
  data: DataType[];
  indicators: IndicatorMetaDataType[];
  regions: string[];
  countries: string[];
  focusArea: string;
}

const TabText = styled.div`
  width: 100%;
  font-family: var(--fontFamily);
  font-size: 0.875rem !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function GrapherComponent(props: Props) {
  const { data, indicators, regions, countries, focusArea } = props;
  const { graphType, showSource, updateGraphType, updateShowSource } =
    useContext(Context) as CtxDataType;
  const queryParams = new URLSearchParams(window.location.search);
  return (
    <div className='margin-top-02 margin-bottom-06'>
      <div className='dashboard-container'>
        {queryParams.get('showSettings') === 'false' ? null : (
          <div className='tabs-for-graphing-interface-container'>
            <button
              type='button'
              className={`tabs-for-graphing-interface${
                graphType === 'barGraph' ? ' selected' : ''
              }`}
              onClick={() => {
                updateGraphType('barGraph');
              }}
              style={{
                flexWrap: 'wrap',
              }}
              title='Ranks'
            >
              <BarChart3
                size={40}
                strokeWidth={1.25}
                color={
                  graphType === 'barGraph'
                    ? 'var(--blue-600)'
                    : 'var(--gray-500)'
                }
              />
              <TabText>Ranks</TabText>
            </button>
            <button
              type='button'
              className={`tabs-for-graphing-interface${
                graphType === 'dataList' ? ' selected' : ''
              }`}
              onClick={() => {
                updateGraphType('dataList');
              }}
              style={{
                flexWrap: 'wrap',
              }}
              title='Data List'
            >
              <List
                size={40}
                strokeWidth={1.25}
                stroke={
                  graphType === 'dataList'
                    ? 'var(--blue-600)'
                    : 'var(--gray-500)'
                }
              />
              <TabText>Data List</TabText>
            </button>
            {focusArea !== 'All' ? (
              <button
                type='button'
                className={`tabs-for-graphing-interface${
                  graphType === 'scatterPlot' ? ' selected' : ''
                }`}
                onClick={() => {
                  updateGraphType('scatterPlot');
                }}
                style={{
                  flexWrap: 'wrap',
                }}
                title='Correlation'
              >
                <ScatterChart
                  size={40}
                  strokeWidth={1.25}
                  stroke={
                    graphType === 'scatterPlot'
                      ? 'var(--blue-600)'
                      : 'var(--gray-500)'
                  }
                />
                <TabText>Correlation</TabText>
              </button>
            ) : null}
            <button
              type='button'
              className={`tabs-for-graphing-interface${
                graphType === 'map' ? ' selected' : ''
              }`}
              onClick={() => {
                updateGraphType('map');
              }}
              style={{
                flexWrap: 'wrap',
              }}
              title='Maps'
            >
              <Map
                size={40}
                strokeWidth={1.25}
                stroke={
                  graphType === 'map' ? 'var(--blue-600)' : 'var(--gray-500)'
                }
              />
              <TabText>Maps</TabText>
            </button>
          </div>
        )}
        <div className='graph-container'>
          {queryParams.get('showSettings') === 'false' ? null : (
            <Settings
              indicators={indicators}
              regions={regions}
              countries={countries}
              focusArea={focusArea}
            />
          )}
          <Graph
            data={data}
            indicators={indicators}
            countries={countries}
            focusArea={focusArea}
          />
        </div>
      </div>
      <Modal
        open={showSource}
        className='undp-modal'
        title='Data Sources'
        onOk={() => {
          updateShowSource(false);
        }}
        onCancel={() => {
          updateShowSource(false);
        }}
        width='75%'
      >
        <DataSources indicators={indicators} data={data} />
      </Modal>
    </div>
  );
}

interface CountryProps {
  data: DataType[];
  indicators: IndicatorMetaDataType[];
  countrySelected: string;
}
export function GrapherComponentForCountry(props: CountryProps) {
  const { data, indicators, countrySelected } = props;
  return (
    <div className='margin-top-06 margin-bottom-06'>
      <div className='dashboard-container'>
        <div className='tabs-for-graphing-interface-container'>
          <button
            type='button'
            className='tabs-for-graphing-interface selected'
            style={{
              flexWrap: 'wrap',
            }}
            title='Data List'
          >
            <List size={40} strokeWidth={1.25} stroke='var(--blue-600)' />
            <TabText>Data List</TabText>
          </button>
        </div>
        <div className='graph-container'>
          <DataListForCountry
            data={data}
            indicators={indicators}
            country={countrySelected}
          />
        </div>
      </div>
    </div>
  );
}
