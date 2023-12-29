import { KeyListTypeAll, KeyListTypeNCD, KeyListTypeTobacco } from './Types';

export const CONTINENTS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export const MAX_TEXT_LENGTH = 100;

export const TRUNCATE_MAX_TEXT_LENGTH = 125;

export const DEFAULT_VALUES_TOBACCO = {
  firstMetric:
    'Percentage of annual tobacco-attributable deaths that are premature',
  secondMetric: 'Total spending on health in country',
  colorMetric: 'Continents',
};
export const DEFAULT_VALUES_NCD = {
  firstMetric: 'Annual NCD deaths, per 1000 population',
  secondMetric: 'Annual economic burden of NCDs, % of GDP',
  colorMetric: 'Continents',
};
export const DEFAULT_VALUES_ALL = {
  firstMetric:
    'Percentage of annual tobacco-attributable deaths that are premature',
  secondMetric: '',
  colorMetric: 'Continents',
};

export const INCOME_GROUPS = [
  'Low income',
  'Lower middle income',
  'Upper middle income',
  'High income',
];

export const KEYS_FROM_DATA_TOBACCO: KeyListTypeTobacco[] = [
  'tobacco_reference_year',
  'country_total_health_expenditure',
  'government_total_health_expenditure',
  'country_NCD_spending',
  'government_NCD_spending',
  'adult_tobacco_use_prevalence_percent',
  'adult_cigarette_smoking_prevalence_percent',
  'tobacco_attributable_deaths',
  'percent_of_tobacco_attributable_deaths_that_are_premature',
  'econ_losses_15years',
  'tobacco_burden',
  'tobacco_burden_GDP',
  'tobacco_burden_per_capita',
  'costs_per_adult_smoker',
  'econ_productivity_losses',
  'econ_productivity_losses_per_capita',
  'healthcare_expenditures',
  'total_investment_15years',
  'all_ROI_15years',
  'cigarette_smoking_prevalence_decrease',
  'averted_deaths',
  'annual_deaths_averted',
  'deaths_averted_per_USD_10000_invested_in_interventions',
  'econ_productivity_losses_15years_decrease',
  'econ_benefits',
  'econ_benefits_per_capita',
  'avoided_econ_productivity_losses',
  'annual_avoided_econ_productivity_losses',
];

export const KEY_WITH_PERCENT_VALUE_TOBACCO = [
  'adult_tobacco_use_prevalence_percent',
  'adult_cigarette_smoking_prevalence_percent',
  'adult_tobacco_use_prevalence_percent',
  'percent_of_tobacco_attributable_deaths_that_are_premature',
  'econ_productivity_losses_15years_decrease',
  'cigarette_smoking_prevalence_decrease',
  'tobacco_burden_GDP',
];

export const KEYS_FROM_DATA_NCD: KeyListTypeNCD[] = [
  'NCD_reference_year',
  'NCD_deaths',
  'NCD_deaths_per_1000',
  'NCD_deaths_percent',
  'risk_of_premature_NCD_death_percent',
  'econ_burden',
  'econ_burden_perc_of_GDP',
  'econ_burden_per_capita',
  'healthcare_costs',
  'healthcare_costs_perc',
  'healthcare_costs_per_capita',
  'healthcare_costs_gov',
  'productivity_losses_perc',
  'productivity_losses',
  'productivity_losses_per_capita',
  '15y_hly_total',
  '15y_deaths_averted_total',
  '15y_strokes_averted_total',
  '15y_IHD_averted_total',
  '15y_econ_benefits_total',
  '15y_econ_benefits_perc_of_GDP',
  '15y_econ_benefits_per_capita',
  '15y_ROI_tobacco',
  '15y_ROI_alcohol',
  '15y_ROI_salt',
  '15y_ROI_physical_activity',
  '15y_ROI_clinical',
  '15y_recovered_econ_output_averted_deaths_perc',
  '15y_recovered_econ_output_presenteeism_perc',
  '15y_recovered_econ_output_absenteeism_perc',
];

export const KEY_WITH_PERCENT_VALUE_NCD = [
  'NCD_deaths_percent',
  'risk_of_premature_NCD_death_percent',
  'econ_burden_perc_of_GDP',
  'productivity_losses_perc',
  '15y_econ_benefits_perc_of_GDP',
  '15y_recovered_econ_output_averted_deaths_perc',
  '15y_recovered_econ_output_presenteeism_perc',
  '15y_recovered_econ_output_absenteeism_perc',
];

export const KEYS_FROM_DATA_ALL: KeyListTypeAll[] = [
  // Tobacco
  'tobacco_reference_year',
  'country_total_health_expenditure',
  'government_total_health_expenditure',
  'country_NCD_spending',
  'government_NCD_spending',
  'adult_tobacco_use_prevalence_percent',
  'adult_cigarette_smoking_prevalence_percent',
  'tobacco_attributable_deaths',
  'percent_of_tobacco_attributable_deaths_that_are_premature',
  'econ_losses_15years',
  'tobacco_burden',
  'tobacco_burden_GDP',
  'tobacco_burden_per_capita',
  'costs_per_adult_smoker',
  'econ_productivity_losses',
  'econ_productivity_losses_per_capita',
  'healthcare_expenditures',
  'total_investment_15years',
  'all_ROI_15years',
  'cigarette_smoking_prevalence_decrease',
  'averted_deaths',
  'annual_deaths_averted',
  'deaths_averted_per_USD_10000_invested_in_interventions',
  'econ_productivity_losses_15years_decrease',
  'econ_benefits',
  'econ_benefits_per_capita',
  'avoided_econ_productivity_losses',
  'annual_avoided_econ_productivity_losses',
  // NCD
  'NCD_reference_year',
  'NCD_deaths',
  'NCD_deaths_per_1000',
  'NCD_deaths_percent',
  'risk_of_premature_NCD_death_percent',
  'econ_burden',
  'econ_burden_perc_of_GDP',
  'econ_burden_per_capita',
  'healthcare_costs',
  'healthcare_costs_perc',
  'healthcare_costs_per_capita',
  'healthcare_costs_gov',
  'productivity_losses_perc',
  'productivity_losses',
  'productivity_losses_per_capita',
  '15y_hly_total',
  '15y_deaths_averted_total',
  '15y_strokes_averted_total',
  '15y_IHD_averted_total',
  '15y_econ_benefits_total',
  '15y_econ_benefits_perc_of_GDP',
  '15y_econ_benefits_per_capita',
  '15y_ROI_tobacco',
  '15y_ROI_alcohol',
  '15y_ROI_salt',
  '15y_ROI_physical_activity',
  '15y_ROI_clinical',
  '15y_recovered_econ_output_averted_deaths_perc',
  '15y_recovered_econ_output_presenteeism_perc',
  '15y_recovered_econ_output_absenteeism_perc',
];

export const KEY_WITH_PERCENT_VALUE_ALL = [
  // Tobacco
  'adult_tobacco_use_prevalence_percent',
  'adult_cigarette_smoking_prevalence_percent',
  'adult_tobacco_use_prevalence_percent',
  'percent_of_tobacco_attributable_deaths_that_are_premature',
  'econ_productivity_losses_15years_decrease',
  'cigarette_smoking_prevalence_decrease',
  'tobacco_burden_GDP',
  // NCD
  'NCD_deaths_percent',
  'risk_of_premature_NCD_death_percent',
  'econ_burden_perc_of_GDP',
  'productivity_losses_perc',
  '15y_econ_benefits_perc_of_GDP',
  '15y_recovered_econ_output_averted_deaths_perc',
  '15y_recovered_econ_output_presenteeism_perc',
  '15y_recovered_econ_output_absenteeism_perc',
  'healthcare_costs_perc',
];

export const KEY_WITH_PEOPLE_VALUE = [
  // Tobacco
  'tobacco_attributable_deaths',
  'annual_deaths_averted',
  'averted_deaths',
  // NCD
  'NCD_deaths',
  'NCD_deaths_per_1000',
  '15y_deaths_averted_total',
  '15y_hly_total',
  '15y_strokes_averted_total',
  '15y_IHD_averted_total',
  'deaths_averted_per_USD_10000_invested_in_interventions',
];

export const KEY_WITH_YEAR_VALUE = [
  'NCD_reference_year',
  'tobacco_reference_year',
];
