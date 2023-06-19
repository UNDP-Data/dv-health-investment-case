import { KeyListType } from './Types';

export const CONTINENTS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export const MAX_TEXT_LENGTH = 100;

export const TRUNCATE_MAX_TEXT_LENGTH = 125;

export const DEFAULT_VALUES = {
  firstMetric:
    'Percentage of annual tobacco-attributable deaths that are premature',
  secondMetric: 'Annual economic produtivity losses per capita, in USD',
  colorMetric: 'Continents',
};

export const INCOME_GROUPS = [
  'Low income',
  'Lower middle income',
  'Upper middle income',
  'High income',
];

export const HDI_LEVELS = ['Low', 'Medium', 'High', 'Very High'];

export const KEYS_FROM_DATA: KeyListType[] = [
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
];

export const KEY_WITH_PERCENT_VALUE = [
  'adult_tobacco_use_prevalence_percent',
  'adult_cigarette_smoking_prevalence_percent',
  'adult_tobacco_smoking_prevalence_percent',
  'percent_of_tobacco_attributable_deaths_that_are_premature',
  'percent_reduction_premature_mortality_2030',
  'econ_productivity_losses_15years_decrease',
  'cigarette_smoking_prevalence_change',
  'tobacco_burden_GDP',
];
