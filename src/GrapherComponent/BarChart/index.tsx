import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DataType, IndicatorMetaDataType } from '../../Types';
import { Graph } from './Graph';

interface Props {
  data: DataType[];
  indicators: IndicatorMetaDataType[];
  focusArea: string;
}

const GraphDiv = styled.div`
  flex-grow: 1;
  overflow: hidden;
  @media (max-width: 960px) {
    height: 70vw;
    max-height: 31.25rem;
  }
`;

export function BarChart(props: Props) {
  const { data, indicators, focusArea } = props;

  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);
  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setSvgHeight(graphDiv.current.clientHeight);
      setSvgWidth(graphDiv.current.clientWidth);
    }
  }, [graphDiv]);
  return (
    <GraphDiv ref={graphDiv}>
      {svgHeight && svgWidth ? (
        <Graph
          data={data}
          indicators={indicators}
          svgWidth={svgWidth}
          svgHeight={svgHeight}
          focusArea={focusArea}
        />
      ) : null}
    </GraphDiv>
  );
}
