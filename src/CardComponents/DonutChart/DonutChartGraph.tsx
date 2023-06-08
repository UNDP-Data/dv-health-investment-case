import { arc, pie, PieArcDatum } from 'd3-shape';

interface Props {
  data: number[];
  colors: string[];
  svgWidth: number;
  svgHeight: number;
  valueDonut?: number;
  noteDonut?: string;
  suffix: string;
}

export function DonutChartGraph(props: Props) {
  const { data, colors, svgWidth, svgHeight, valueDonut, noteDonut, suffix } =
    props;

  const createPie = pie<number>()
    .value(d => d)
    .sort(null)(data) as PieArcDatum<number>[];

  const createArc = arc<PieArcDatum<number>>()
    .innerRadius(svgWidth / 2.4)
    .outerRadius(svgWidth / 2);

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${svgWidth / 2} ${svgHeight / 2})`}>
        {createPie.map((datum, i) => (
          <g key={i} className='arc'>
            <path
              className='arc'
              d={createArc(datum)!}
              fill={colors[i % colors.length]}
            />
            {datum.value}
          </g>
        ))}
        <text
          x={0}
          y={0}
          textAnchor='middle'
          fontSize='2.813rem'
          fontWeight='bold'
          style={{ fill: 'var(--black)' }}
        >
          {/* {datum.value} */}
          {valueDonut}
          {suffix}
        </text>
        <text
          x={0}
          y={0 + 30}
          textAnchor='middle'
          fontSize='1.25rem'
          fontWeight='bold'
          style={{ fill: 'var(--black)' }}
        >
          {noteDonut}
        </text>
      </g>
    </svg>
  );
}
