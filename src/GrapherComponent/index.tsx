import { useContext } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { CtxDataType, DataType, IndicatorMetaDataType } from '../Types';
import {
  ScatterPlotIcon,
  BarGraphIcon,
  MapIcon,
  Logo,
  DualAxesChartIcon,
} from '../Icons';
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
}

const IconEl = styled.div`
  display: inline;
  @media (max-width: 980px) {
    display: none;
  }
`;

export function GrapherComponent(props: Props) {
  const { data, indicators, regions, countries } = props;
  const { graphType, showSource, updateGraphType, updateShowSource } =
    useContext(Context) as CtxDataType;
  const queryParams = new URLSearchParams(window.location.search);
  return (
    <div className='margin-top-06 margin-bottom-06'>
      <div className='flex-div flex-space-between flex-vert-align-center margin-bottom-05 flex-wrap'>
        <div className='flex-div flex-vert-align-center'>
          <Logo height={75} />
          <div>
            <h3
              className='undp-typography margin-bottom-00'
              style={{ color: 'var(--blue-600)' }}
            >
              Health Investment Case
            </h3>
            <h6 className='undp-typography margin-bottom-00'>
              Exploring national health investment cases
            </h6>
          </div>
        </div>
      </div>
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
            >
              <IconEl>
                <BarGraphIcon
                  size={48}
                  fill={
                    graphType === 'barGraph'
                      ? 'var(--blue-600)'
                      : 'var(--gray-500)'
                  }
                />
              </IconEl>
              Ranks
            </button>
            <button
              type='button'
              className={`tabs-for-graphing-interface${
                graphType === 'dataList' ? ' selected' : ''
              }`}
              onClick={() => {
                updateGraphType('dataList');
              }}
            >
              <IconEl>
                <DualAxesChartIcon
                  size={48}
                  fill={
                    graphType === 'dataList'
                      ? 'var(--blue-600)'
                      : 'var(--gray-500)'
                  }
                />
              </IconEl>
              Data List
            </button>
            <button
              type='button'
              className={`tabs-for-graphing-interface${
                graphType === 'scatterPlot' ? ' selected' : ''
              }`}
              onClick={() => {
                updateGraphType('scatterPlot');
              }}
            >
              <IconEl>
                <ScatterPlotIcon
                  size={48}
                  fill={
                    graphType === 'scatterPlot'
                      ? 'var(--blue-600)'
                      : 'var(--gray-500)'
                  }
                />
              </IconEl>
              Correlation
            </button>
            <button
              type='button'
              className={`tabs-for-graphing-interface${
                graphType === 'map' ? ' selected' : ''
              }`}
              onClick={() => {
                updateGraphType('map');
              }}
            >
              <IconEl>
                <MapIcon
                  size={48}
                  fill={
                    graphType === 'map' ? 'var(--blue-600)' : 'var(--gray-500)'
                  }
                />
              </IconEl>
              Maps
            </button>
          </div>
        )}
        <div className='graph-container'>
          {queryParams.get('showSettings') === 'false' ? null : (
            <Settings
              indicators={indicators}
              regions={regions}
              countries={countries}
            />
          )}
          <Graph data={data} indicators={indicators} countries={countries} />
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
      <div className='flex-div flex-space-between flex-vert-align-center margin-bottom-05 flex-wrap'>
        <div className='flex-div flex-vert-align-center'>
          <Logo height={75} />
          <div>
            <h3
              className='undp-typography margin-bottom-00'
              style={{ color: 'var(--blue-600)' }}
            >
              Health Investment Case
            </h3>
            <h6 className='undp-typography margin-bottom-00'>
              Exploring national health investment cases for {countrySelected}
            </h6>
          </div>
        </div>
      </div>
      <div className='dashboard-container'>
        <div className='tabs-for-graphing-interface-container'>
          <button
            type='button'
            className='tabs-for-graphing-interface selected'
          >
            <IconEl>
              <DualAxesChartIcon size={48} fill='var(--blue-600)' />
            </IconEl>
            Data List
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
