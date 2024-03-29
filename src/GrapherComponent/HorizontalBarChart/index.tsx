import { useEffect, useRef, useState } from 'react';
import { DataType, IndicatorMetaDataType } from '../../Types';
import { Graph } from './Graph';

interface Props {
  data: DataType[];
  indicators: IndicatorMetaDataType[];
  focusArea: string;
}

export function HorizontalBarChart(props: Props) {
  const { data, indicators, focusArea } = props;

  const [svgWidth, setSvgWidth] = useState(0);
  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <div ref={graphDiv} style={{ flexGrow: 1 }}>
      {svgWidth ? (
        <Graph
          data={data}
          indicators={indicators}
          svgWidth={svgWidth}
          focusArea={focusArea}
        />
      ) : null}
    </div>
  );
}
