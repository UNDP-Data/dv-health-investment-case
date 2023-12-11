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

export const HDI_LEVELS = ['Low', 'Medium', 'High', 'Very High'];

export const KEYS_FROM_DATA_TOBACCO: KeyListTypeTobacco[] = [
  'adult_tobacco_use_prevalence_percent',
  'adult_cigarette_smoking_prevalence_percent',
  'tobacco_burden',
  'tobacco_burden_GDP',
  'costs_per_adult_smoker',
  'tobacco_attributable_deaths',
  'percent_of_tobacco_attributable_deaths_that_are_premature',
  'econ_productivity_losses',
  'econ_productivity_losses_per_capita',
  'healthcare_expenditures',
  'tobacco_burden_per_capita',
  'econ_losses_15years',
  'econ_productivity_losses_15years',
  'total_investment_15years',
  'averted_deaths',
  'annual_deaths_averted',
  'Deaths_averted_per_USD_10000_invested_in_interventions',
  'percent_reduction_premature_mortality_2030',
  'econ_benefits',
  'econ_benefits_per_capita',
  'avoided_econ_productivity_losses',
  'annual_avoided_econ_productivity_losses',
  'econ_productivity_losses_15years_decrease',
  'cigarette_smoking_prevalence_change',
  'all_ROI_15years',
];

export const KEY_WITH_PERCENT_VALUE_TOBACCO = [
  'adult_tobacco_use_prevalence_percent',
  'adult_cigarette_smoking_prevalence_percent',
  'adult_tobacco_smoking_prevalence_percent',
  'percent_of_tobacco_attributable_deaths_that_are_premature',
  'percent_reduction_premature_mortality_2030',
  'econ_productivity_losses_15years_decrease',
  'cigarette_smoking_prevalence_change',
  'tobacco_burden_GDP',
];

export const KEYS_FROM_DATA_NCD: KeyListTypeNCD[] = [
  'ncd_reference_year',
  'GDP_USD',
  'NCD_deaths',
  'NCD_deaths_per_1000',
  'NCD_deaths_percent',
  'risk_of_premature_NCD_death_percent',
  'econ_burden',
  'econ_burden_perc_of_GDP',
  'econ_burden_per_capita',
  'healthcare_costs',
  'healthcare_costs_per_capita',
  'healthcare_costs_gov',
  'productivity_losses_perc',
  'productivity_losses',
  'productivity_losses_per_capita',
  '15y_cost_all_interventions',
  '15y_cost_all_interventions_per_capita',
  '15y_hly_total',
  '15y_hly_tobacco',
  '15y_deaths_averted_total',
  '15y_strokes_averted_total',
  '15y_IHD_averted_total',
  '15y_econ_benefits_total',
  '15y_ROI_tobacco',
  '15y_ROI_alcohol',
  '15y_ROI_salt',
  '15y_ROI_physicalActivity',
  '15y_ROI_clinical',
  '15y_econ_benefits_perc_of_GDP',
  '15y_econ_benefits_per_capita',
  '15y_recovered_econ_output_avertedDeaths_perc',
  '15y_recovered_econ_output_presenteeism_perc',
  '15y_recovered_econ_output_absenteeism_perc',
];

export const KEY_WITH_PERCENT_VALUE_NCD = [
  'NCD_deaths_percent',
  'risk_of_premature_NCD_death_percent',
  'econ_burden_perc_of_GDP',
  'productivity_losses_perc',
  '15y_econ_benefits_perc_of_GDP',
  '15y_recovered_econ_output_avertedDeaths_perc',
  '15y_recovered_econ_output_presenteeism_perc',
  '15y_recovered_econ_output_absenteeism_perc',
];

export const KEYS_FROM_DATA_ALL: KeyListTypeAll[] = [
  // Tobacco
  'tobacco_reference_year',
  'total_population',
  'adult_population',
  'GDP_USD',
  'GDP_per_capita',
  'Country_total_health_expenditure',
  'Government_total_health_expenditure',
  'Country_NCD_spending',
  'Government_NCD_spending',
  'USD_exchange_rate',
  'adult_tobacco_use_prevalence_percent',
  'adult_cigarette_smoking_prevalence_percent',
  'adult_tobacco_smoking_prevalence_percent',
  'adult_tobacco_use_prevalence_number',
  'adult_cigarette_smoking_prevalence_number',
  'adult_tobacco_smoking_prevalence_number',
  'tobacco_burden',
  'tobacco_burden_GDP',
  'costs_per_adult_smoker',
  'tobacco_attributable_deaths',
  'percent_of_tobacco_attributable_deaths_that_are_premature',
  'econ_productivity_losses',
  'econ_productivity_losses_per_capita',
  'healthcare_expenditures',
  'tobacco_burden_per_capita',
  'econ_losses_15years',
  'econ_productivity_losses_15years',
  'total_investment_15years',
  'averted_deaths',
  'annual_deaths_averted',
  'Deaths_averted_per_USD_10000_invested_in_interventions',
  'percent_reduction_premature_mortality_2030',
  'econ_benefits',
  'econ_benefits_per_capita',
  'avoided_econ_productivity_losses',
  'annual_avoided_econ_productivity_losses',
  'econ_productivity_losses_15years_decrease',
  'cigarette_smoking_prevalence_change',
  'all_ROI_15years',
  // NCD
  'ncd_reference_year',
  'GDP_USD',
  'NCD_deaths',
  'NCD_deaths_per_1000',
  'NCD_deaths_percent',
  'risk_of_premature_NCD_death_percent',
  'econ_burden',
  'econ_burden_perc_of_GDP',
  'econ_burden_per_capita',
  'healthcare_costs',
  'healthcare_costs_per_capita',
  'healthcare_costs_gov',
  'productivity_losses_perc',
  'productivity_losses',
  'productivity_losses_per_capita',
  '15y_cost_all_interventions',
  '15y_cost_all_interventions_per_capita',
  '15y_hly_total',
  '15y_hly_tobacco',
  '15y_deaths_averted_total',
  '15y_strokes_averted_total',
  '15y_IHD_averted_total',
  '15y_econ_benefits_total',
  '15y_ROI_tobacco',
  '15y_ROI_alcohol',
  '15y_ROI_salt',
  '15y_ROI_physicalActivity',
  '15y_ROI_clinical',
  '15y_econ_benefits_perc_of_GDP',
  '15y_econ_benefits_per_capita',
  '15y_recovered_econ_output_avertedDeaths_perc',
  '15y_recovered_econ_output_presenteeism_perc',
  '15y_recovered_econ_output_absenteeism_perc',
];

export const KEY_WITH_PERCENT_VALUE_ALL = [
  // Tobacco
  'adult_tobacco_use_prevalence_percent',
  'adult_cigarette_smoking_prevalence_percent',
  'adult_tobacco_smoking_prevalence_percent',
  'percent_of_tobacco_attributable_deaths_that_are_premature',
  'percent_reduction_premature_mortality_2030',
  'econ_productivity_losses_15years_decrease',
  'cigarette_smoking_prevalence_change',
  'tobacco_burden_GDP',
  // NCD
  'NCD_deaths_percent',
  'risk_of_premature_NCD_death_percent',
  'econ_burden_perc_of_GDP',
  'productivity_losses_perc',
  '15y_econ_benefits_perc_of_GDP',
  '15y_recovered_econ_output_avertedDeaths_perc',
  '15y_recovered_econ_output_presenteeism_perc',
  '15y_recovered_econ_output_absenteeism_perc',
];
