import { DataType, IndicatorMetaDataType } from '../../Types';
import { TobaccoSummary } from './Tobacco';
import { NCDSummary } from './NCD';
// import { DotPlot } from '../../CardComponents/DotPlot';

interface Props {
  data: DataType;
  indicators: IndicatorMetaDataType[];
  focusArea: string;
}

export function CountrySummary(props: Props) {
  const { data, indicators, focusArea } = props;
  return (
    <div>
      {focusArea === 'Tobacco_control' ? (
        <TobaccoSummary data={data} indicators={indicators} />
      ) : focusArea === 'NCD' ? (
        <NCDSummary data={data} indicators={indicators} />
      ) : null}
    </div>
  );
}
