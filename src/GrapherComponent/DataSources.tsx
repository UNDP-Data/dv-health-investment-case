import { useContext } from 'react';

import { CtxDataType, DataType, IndicatorMetaDataType } from '../Types';
import Context from '../Context/Context';
import { DataSourceListItem } from '../Components/DataSourceListItem';

interface Props {
  indicators: IndicatorMetaDataType[];
  data: DataType[];
}

export function DataSources(props: Props) {
  const { indicators, data } = props;
  const {
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    colorIndicator,
  } = useContext(Context) as CtxDataType;

  const xIndicatorMetaData =
    indicators[indicators.findIndex(d => d.Indicator === xAxisIndicator)];

  const yIndicatorMetaData =
    indicators[indicators.findIndex(d => d.Indicator === yAxisIndicator)];

  const sizeIndicatorMetaData =
    indicators[indicators.findIndex(d => d.Indicator === sizeIndicator)];

  const colorIndicatorMetaData =
    indicators[indicators.findIndex(d => d.Indicator === colorIndicator)];

  return (
    <div className='undp-scrollbar'>
      <DataSourceListItem indicatorData={xIndicatorMetaData} data={data} />
      {graphType !== 'barGraph' && yIndicatorMetaData ? (
        <>
          <hr className='undp-style' />
          <DataSourceListItem indicatorData={yIndicatorMetaData} data={data} />
        </>
      ) : null}
      {graphType !== 'map' && colorIndicatorMetaData ? (
        <>
          <hr className='undp-style' />
          <DataSourceListItem
            indicatorData={colorIndicatorMetaData}
            data={data}
          />
        </>
      ) : null}
      {(graphType === 'scatterPlot' || graphType === 'map') &&
      sizeIndicatorMetaData ? (
        <>
          <hr className='undp-style' />
          <DataSourceListItem
            indicatorData={sizeIndicatorMetaData}
            data={data}
          />
        </>
      ) : null}
    </div>
  );
}
