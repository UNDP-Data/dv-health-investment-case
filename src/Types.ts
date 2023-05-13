export interface CountryGroupDataTypeFromFile {
  'Alpha-3 code-1': string;
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

export interface CountryDataFromCSV {
  ISO_code: string;
  WHO_region: string;
  modelling_year: string;
  reference_year: string;
  total_population: string;
  total_population_source: string;
  adult_population: string;
  adult_population_source: string;
  GDP_USD: string;
  GDP_source: string;
  GDP_per_capita: string;
  Country_total_health_expenditure: string;
  Government_total_health_expenditure: string;
  Country_NCD_spending: string;
  Government_NCD_spending: string;
  Country_total_health_expenditure_year: string;
  Government_total_health_expenditure_year: string;
  Country_NCD_spending_year: string;
  Government_NCD_spending_year: string;
  USD_exchange_rate: string;
  USD_exchange_rate_source: string;
  adult_tobacco_use_prevalence_percent: string;
  adult_cigarette_smoking_prevalence_percent: string;
  adult_tobacco_smoking_prevalence_percent: string;
  adult_tobacco_use_prevalence_number: string;
  adult_cigarette_smoking_prevalence_number: string;
  adult_tobacco_smoking_prevalence_number: string;
  year_of_prevalence_data: string;
  prevelance_data_source: string;
  tobacco_burden: string;
  tobacco_burden_GDP: string;
  costs_per_adult_smoker: string;
  tobacco_attributable_deaths: string;
  percent_of_tobacco_attributable_deaths_that_are_premature: string;
  econ_productivity_losses: string;
  econ_productivity_losses_per_capita: string;
  healthcare_expenditures: string;
  tobacco_burden_per_capita: string;
  econ_losses_15years: string;
  econ_productivity_losses_15years: string;
  total_investment_15years: string;
  averted_deaths: string;
  annual_deaths_averted: string;
  Deaths_averted_per_USD_10000_invested_in_interventions: string;
  percent_reduction_premature_mortality_2030: string;
  econ_benefits: string;
  econ_benefits_per_capita: string;
  avoided_econ_productivity_losses: string;
  annual_avoided_econ_productivity_losses: string;
  econ_productivity_losses_15years_decrease: string;
  cigarette_smoking_prevalence_change: string;
  all_ROI_15years: string;
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
  WHO_region?: string;
  modelling_year?: string;
  reference_year?: string;
  total_population_source?: string;
  adult_population_source?: string;
  GDP_source?: string;
  Country_total_health_expenditure_year?: string;
  Government_total_health_expenditure_year?: string;
  USD_exchange_rate_source?: string;
  year_of_prevalence_data?: string;
  prevelance_data_source?: string;
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
  Themes: string;
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
  BarGraph?: boolean;
  Sizing?: boolean;
  Color?: boolean;
}

export interface IndicatorMetaDataWithYear extends IndicatorMetaDataType {
  years: number[];
}
export interface HoverRowDataType {
  title?: string;
  value?: string | number;
  prefix?: string;
  suffix?: string;
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

export type KeyListType =
  | 'total_population'
  | 'adult_population'
  | 'GDP_USD'
  | 'GDP_per_capita'
  | 'Country_total_health_expenditure'
  | 'Government_total_health_expenditure'
  | 'Country_NCD_spending'
  | 'Government_NCD_spending'
  | 'USD_exchange_rate'
  | 'adult_tobacco_use_prevalence_percent'
  | 'adult_cigarette_smoking_prevalence_percent'
  | 'adult_tobacco_smoking_prevalence_percent'
  | 'adult_tobacco_use_prevalence_number'
  | 'adult_cigarette_smoking_prevalence_number'
  | 'adult_tobacco_smoking_prevalence_number'
  | 'tobacco_burden'
  | 'tobacco_burden_GDP'
  | 'costs_per_adult_smoker'
  | 'tobacco_attributable_deaths'
  | 'percent_of_tobacco_attributable_deaths_that_are_premature'
  | 'econ_productivity_losses'
  | 'econ_productivity_losses_per_capita'
  | 'healthcare_expenditures'
  | 'tobacco_burden_per_capita'
  | 'econ_losses_15years'
  | 'econ_productivity_losses_15years'
  | 'total_investment_15years'
  | 'averted_deaths'
  | 'annual_deaths_averted'
  | 'Deaths_averted_per_USD_10000_invested_in_interventions'
  | 'percent_reduction_premature_mortality_2030'
  | 'econ_benefits'
  | 'econ_benefits_per_capita'
  | 'avoided_econ_productivity_losses'
  | 'annual_avoided_econ_productivity_losses'
  | 'econ_productivity_losses_15years_decrease'
  | 'cigarette_smoking_prevalence_change'
  | 'all_ROI_15years';
