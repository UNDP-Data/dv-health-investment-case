export interface CountryGroupDataTypeFromFile {
  'Alpha-3 code': string;
  'Country or Area': string;
  'Group 1': string;
  'Group 2': string;
  LDC: boolean;
  LLDC: boolean;
  'Latitude (average)': string;
  'Longitude (average)': string;
  SIDS: boolean;
  'Income group': string;
}

export interface CountryGroupDataType {
  'Alpha-3 code': string;
  'Country or Area': string;
  'Group 1': string;
  'Group 2': string;
  LDC: boolean;
  LLDC: boolean;
  'Latitude (average)': number;
  'Longitude (average)': number;
  SIDS: boolean;
  'Income group': string;
}

export interface IndicatorDataType {
  indicator: string;
  value: number;
}

export interface DataType extends CountryGroupDataType {
  data: IndicatorDataType[];
  UNDP_region?: string;
  NCD_reference_year?: string;
  tobacco_reference_year?: string;
  GDP_USD?: number;
  GDP_USD_NCD?: number;
}

export interface IndicatorOptionsDataType {
  'Data source link': string;
  'Data source name': string;
  Indicator: string;
  'Indicator Description': string;
  'Time period': string;
  Year: string;
  Categorical: boolean;
}

export interface IndicatorMetaDataType {
  FocusArea: string;
  Indicator: string;
  IndicatorDescription: string;
  DataKey: string;
  DataSourceName: string;
  DataSourceLink?: string;
  LabelSuffix?: string;
  LabelPrefix?: string;
  LabelFormat?: string;
  BinningRange5: number[];
  BinningRangeLarge: number[];
  Categories: number[];
  CategorizeByRanking?: boolean;
  IsCategorical?: boolean;
  colorScaleTooltip?: string[];
  IsDivergent?: boolean;
  ScatterPlot?: boolean;
  Map?: boolean;
  MapColor?: string;
  BarGraph?: boolean;
  Sizing?: boolean;
  Color?: boolean;
  IsPercent: boolean;
  IsPeopleValue: boolean;
  IsYear: boolean;
}

export interface IndicatorMetaDataWithYear extends IndicatorMetaDataType {
  years: number[];
}
export interface HoverRowDataType {
  suffix?: string | number | undefined;
  title?: string;
  value?: string | number;
  prefix?: string;
  type: 'x-axis' | 'y-axis' | 'color' | 'size';
  year?: number;
  color?: string;
}

export interface HoverDataType {
  country: string;
  continent: string;
  rows: HoverRowDataType[];
  xPosition: number;
  yPosition: number;
}

export interface CtxDataType {
  graphType: 'scatterPlot' | 'map' | 'barGraph' | 'dataList';
  selectedRegions: string[];
  selectedCountries: string[];
  selectedIncomeGroups: string[];
  selectedCountryGroup: 'All' | 'SIDS' | 'LLDC' | 'LDC';
  xAxisIndicator: string;
  yAxisIndicator?: string;
  dataListCountry?: string;
  colorIndicator: string;
  sizeIndicator?: string;
  showLabel: boolean;
  showSource: boolean;
  reverseOrder: boolean;
  verticalBarLayout: boolean;
  updateGraphType: (
    _d: 'scatterPlot' | 'map' | 'barGraph' | 'dataList',
  ) => void;
  updateSelectedRegions: (_d: string[]) => void;
  updateSelectedCountries: (_d: string[]) => void;
  updateSelectedIncomeGroups: (_d: string[]) => void;
  updateSelectedCountryGroup: (_d: 'All' | 'SIDS' | 'LLDC' | 'LDC') => void;
  updateXAxisIndicator: (_d: string) => void;
  updateYAxisIndicator: (_d?: string) => void;
  updateColorIndicator: (_d?: string) => void;
  updateSizeIndicator: (_d?: string) => void;
  updateDataListCountry: (_d: string) => void;
  updateShowSource: (_d: boolean) => void;
  updateShowLabel: (_d: boolean) => void;
  updateReverseOrder: (_d: boolean) => void;
  updateBarLayout: (_d: boolean) => void;
}
