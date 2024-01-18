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
  BarGraph?: boolean;
  Sizing?: boolean;
  Color?: boolean;
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

export type KeyListTypeTobacco =
  | 'tobacco_reference_year'
  | 'country_total_health_expenditure'
  | 'government_total_health_expenditure'
  | 'country_NCD_spending'
  | 'government_NCD_spending'
  | 'adult_tobacco_use_prevalence_percent'
  | 'adult_cigarette_smoking_prevalence_percent'
  | 'tobacco_attributable_deaths'
  | 'percent_of_tobacco_attributable_deaths_that_are_premature'
  | 'econ_losses_15years'
  | 'tobacco_burden'
  | 'tobacco_burden_GDP'
  | 'tobacco_burden_per_capita'
  | 'costs_per_adult_smoker'
  | 'econ_productivity_losses'
  | 'econ_productivity_losses_per_capita'
  | 'healthcare_expenditures'
  | 'total_investment_15years'
  | 'all_ROI_15years'
  | 'cigarette_smoking_prevalence_decrease'
  | 'averted_deaths'
  | 'annual_deaths_averted'
  | 'deaths_averted_per_USD_10000_invested_in_interventions'
  | 'econ_productivity_losses_15years_decrease'
  | 'econ_benefits'
  | 'econ_benefits_per_capita'
  | 'avoided_econ_productivity_losses'
  | 'annual_avoided_econ_productivity_losses';

export type KeyListTypeNCD =
  | 'NCD_reference_year'
  | 'NCD_deaths'
  | 'NCD_deaths_per_1000'
  | 'NCD_deaths_percent'
  | 'risk_of_premature_NCD_death_percent'
  | 'econ_burden'
  | 'econ_burden_perc_of_GDP'
  | 'econ_burden_per_capita'
  | 'healthcare_costs'
  | 'healthcare_costs_perc'
  | 'healthcare_costs_per_capita'
  | 'healthcare_costs_gov'
  | 'productivity_losses_perc'
  | 'productivity_losses'
  | 'productivity_losses_per_capita'
  | '15y_hly_total'
  | '15y_deaths_averted_total'
  | '15y_strokes_averted_total'
  | '15y_IHD_averted_total'
  | '15y_econ_benefits_total'
  | '15y_econ_benefits_perc_of_GDP'
  | '15y_econ_benefits_per_capita'
  | '15y_ROI_tobacco'
  | '15y_ROI_alcohol'
  | '15y_ROI_salt'
  | '15y_ROI_physical_activity'
  | '15y_ROI_clinical'
  | '15y_recovered_econ_output_averted_deaths_perc'
  | '15y_recovered_econ_output_presenteeism_perc'
  | '15y_recovered_econ_output_absenteeism_perc';

export type KeyListTypeAll =
  // Tobacco
  | 'tobacco_reference_year'
  | 'country_total_health_expenditure'
  | 'government_total_health_expenditure'
  | 'country_NCD_spending'
  | 'government_NCD_spending'
  | 'adult_tobacco_use_prevalence_percent'
  | 'adult_cigarette_smoking_prevalence_percent'
  | 'tobacco_attributable_deaths'
  | 'percent_of_tobacco_attributable_deaths_that_are_premature'
  | 'econ_losses_15years'
  | 'tobacco_burden'
  | 'tobacco_burden_GDP'
  | 'tobacco_burden_per_capita'
  | 'costs_per_adult_smoker'
  | 'econ_productivity_losses'
  | 'econ_productivity_losses_per_capita'
  | 'healthcare_expenditures'
  | 'total_investment_15years'
  | 'all_ROI_15years'
  | 'cigarette_smoking_prevalence_decrease'
  | 'averted_deaths'
  | 'annual_deaths_averted'
  | 'deaths_averted_per_USD_10000_invested_in_interventions'
  | 'econ_productivity_losses_15years_decrease'
  | 'econ_benefits'
  | 'econ_benefits_per_capita'
  | 'avoided_econ_productivity_losses'
  | 'annual_avoided_econ_productivity_losses'
  // NCD
  | 'NCD_reference_year'
  | 'NCD_deaths'
  | 'NCD_deaths_per_1000'
  | 'NCD_deaths_percent'
  | 'risk_of_premature_NCD_death_percent'
  | 'econ_burden'
  | 'econ_burden_perc_of_GDP'
  | 'econ_burden_per_capita'
  | 'healthcare_costs'
  | 'healthcare_costs_perc'
  | 'healthcare_costs_per_capita'
  | 'healthcare_costs_gov'
  | 'productivity_losses_perc'
  | 'productivity_losses'
  | 'productivity_losses_per_capita'
  | '15y_hly_total'
  | '15y_deaths_averted_total'
  | '15y_strokes_averted_total'
  | '15y_IHD_averted_total'
  | '15y_econ_benefits_total'
  | '15y_econ_benefits_perc_of_GDP'
  | '15y_econ_benefits_per_capita'
  | '15y_ROI_tobacco'
  | '15y_ROI_alcohol'
  | '15y_ROI_salt'
  | '15y_ROI_physical_activity'
  | '15y_ROI_clinical'
  | '15y_recovered_econ_output_averted_deaths_perc'
  | '15y_recovered_econ_output_presenteeism_perc'
  | '15y_recovered_econ_output_absenteeism_perc';
