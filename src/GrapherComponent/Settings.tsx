import { useContext, useEffect, useState } from 'react';
import { Select, Radio, Checkbox } from 'antd';
import domtoimage from 'dom-to-image';
import sortBy from 'lodash.sortby';
import { Database, FileDown } from 'lucide-react';
import { CtxDataType, IndicatorMetaDataType } from '../Types';
import Context from '../Context/Context';
import {
  DEFAULT_VALUES_TOBACCO,
  DEFAULT_VALUES_NCD,
  INCOME_GROUPS,
  DEFAULT_VALUES_ALL,
} from '../Constants';
import { ChevronDown, ChevronLeft } from '../Icons';

interface Props {
  indicators: IndicatorMetaDataType[];
  regions: string[];
  countries: string[];
  focusArea: string;
}

export function Settings(props: Props) {
  const { indicators, regions, countries, focusArea } = props;
  const {
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    showLabel,
    selectedCountryGroup,
    selectedCountries,
    selectedIncomeGroups,
    selectedRegions,
    reverseOrder,
    updateSelectedCountryGroup,
    updateColorIndicator,
    updateXAxisIndicator,
    updateYAxisIndicator,
    updateSizeIndicator,
    updateSelectedRegions,
    updateSelectedCountries,
    updateSelectedIncomeGroups,
    updateShowLabel,
    updateShowSource,
    updateReverseOrder,
    verticalBarLayout,
    updateBarLayout,
    dataListCountry,
    updateDataListCountry,
  } = useContext(Context) as CtxDataType;
  const options =
    focusArea === 'All'
      ? graphType === 'map'
        ? sortBy(
            indicators.filter(d => d.Map),
            d => d.Indicator,
          ).map(d => d.Indicator)
        : sortBy(
            indicators.filter(d => d.BarGraph),
            d => d.Indicator,
          ).map(d => d.Indicator)
      : graphType === 'scatterPlot'
      ? sortBy(
          indicators.filter(d => d.ScatterPlot),
          d => d.Indicator,
        ).map(d => d.Indicator)
      : graphType === 'map'
      ? sortBy(
          indicators.filter(d => d.Map),
          d => d.Indicator,
        ).map(d => d.Indicator)
      : sortBy(
          indicators.filter(d => d.BarGraph),
          d => d.Indicator,
        ).map(d => d.Indicator);
  const sizeOptions = indicators.filter(d => d.Sizing).map(d => d.Indicator);
  const colorOptions = indicators
    .filter(d => d.IsCategorical)
    .map(d => d.Indicator);
  colorOptions.unshift('Income Groups');
  colorOptions.unshift('Continents');
  const optionsTobacco =
    graphType === 'scatterPlot'
      ? sortBy(
          indicators.filter(
            d => d.ScatterPlot && d.FocusArea === 'Tobacco control',
          ),
          d => d.Indicator,
        ).map(d => d.Indicator)
      : graphType === 'map'
      ? sortBy(
          indicators.filter(d => d.Map && d.FocusArea === 'Tobacco control'),
          d => d.Indicator,
        ).map(d => d.Indicator)
      : sortBy(
          indicators.filter(
            d => d.BarGraph && d.FocusArea === 'Tobacco control',
          ),
          d => d.Indicator,
        ).map(d => d.Indicator);
  const sizeOptionsTobacco = indicators
    .filter(d => d.Sizing && d.FocusArea === 'Tobacco control')
    .map(d => d.Indicator);
  const optionsNCD =
    graphType === 'scatterPlot'
      ? sortBy(
          indicators.filter(d => d.ScatterPlot && d.FocusArea === 'NCDs'),
          d => d.Indicator,
        ).map(d => d.Indicator)
      : graphType === 'map'
      ? sortBy(
          indicators.filter(d => d.Map && d.FocusArea === 'NCDs'),
          d => d.Indicator,
        ).map(d => d.Indicator)
      : sortBy(
          indicators.filter(d => d.BarGraph && d.FocusArea === 'NCDs'),
          d => d.Indicator,
        ).map(d => d.Indicator);
  const sizeOptionsNCD = indicators
    .filter(d => d.Sizing && d.FocusArea === 'NCDs')
    .map(d => d.Indicator);
  const [settingExpanded, setSettingsExpanded] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(true);
  useEffect(() => {
    const opts =
      graphType === 'scatterPlot'
        ? indicators.filter(d => d.ScatterPlot).map(d => d.Indicator)
        : graphType === 'map'
        ? indicators.filter(d => d.Map).map(d => d.Indicator)
        : indicators.filter(d => d.BarGraph).map(d => d.Indicator);
    if (opts.findIndex(d => d === xAxisIndicator) === -1) {
      updateXAxisIndicator(options[0]);
    }
    if (
      opts.findIndex(d => d === yAxisIndicator) === -1 &&
      graphType === 'scatterPlot'
    ) {
      updateYAxisIndicator(options[0]);
    }
  }, [graphType]);
  return (
    <div className='undp-scrollbar settings-container'>
      {graphType !== 'dataList' ? (
        <>
          <div className='settings-sections-container'>
            <div className='settings-sections-options-container'>
              <div className='settings-option-div'>
                <p className='label'>
                  {graphType === 'scatterPlot'
                    ? 'X-Axis'
                    : graphType === 'map'
                    ? 'Primary Indicator to color region'
                    : 'Primary Indicator'}
                </p>
                <Select
                  showSearch
                  className='undp-select'
                  placeholder='Please select'
                  maxTagCount='responsive'
                  value={xAxisIndicator}
                  onChange={d => {
                    updateXAxisIndicator(d);
                  }}
                  defaultValue={
                    focusArea === 'Tobacco'
                      ? DEFAULT_VALUES_TOBACCO.firstMetric
                      : focusArea === 'NCD'
                      ? DEFAULT_VALUES_NCD.firstMetric
                      : DEFAULT_VALUES_ALL.firstMetric
                  }
                >
                  {focusArea === 'All' ? (
                    <>
                      <Select.OptGroup label='Tobacco control'>
                        {optionsTobacco.map(d => (
                          <Select.Option className='undp-select-option' key={d}>
                            {d}
                          </Select.Option>
                        ))}
                      </Select.OptGroup>
                      <Select.OptGroup label='NCDs'>
                        {optionsNCD.map(d => (
                          <Select.Option className='undp-select-option' key={d}>
                            {d}
                          </Select.Option>
                        ))}
                      </Select.OptGroup>
                    </>
                  ) : (
                    options.map(d => (
                      <Select.Option className='undp-select-option' key={d}>
                        {d}
                      </Select.Option>
                    ))
                  )}
                </Select>
              </div>
              {graphType === 'scatterPlot' ? (
                <div className='settings-option-div'>
                  <p className='label'>Y-Axis</p>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    value={yAxisIndicator}
                    className='undp-select'
                    placeholder='Please select'
                    onChange={d => {
                      updateYAxisIndicator(d);
                    }}
                    defaultValue={
                      focusArea === 'Tobacco'
                        ? DEFAULT_VALUES_TOBACCO.secondMetric
                        : focusArea === 'NCD'
                        ? DEFAULT_VALUES_NCD.secondMetric
                        : DEFAULT_VALUES_ALL.secondMetric
                    }
                    listHeight={400}
                  >
                    {focusArea === 'All' ? (
                      <>
                        <Select.OptGroup label='Tobacco control'>
                          {optionsTobacco.map(d => (
                            <Select.Option
                              className='undp-select-option'
                              key={d}
                            >
                              {d}
                            </Select.Option>
                          ))}
                        </Select.OptGroup>
                        <Select.OptGroup label='NCDs'>
                          {optionsNCD.map(d => (
                            <Select.Option
                              className='undp-select-option'
                              key={d}
                            >
                              {d}
                            </Select.Option>
                          ))}
                        </Select.OptGroup>
                      </>
                    ) : (
                      options.map(d => (
                        <Select.Option className='undp-select-option' key={d}>
                          {d}
                        </Select.Option>
                      ))
                    )}
                  </Select>
                </div>
              ) : graphType === 'map' && focusArea !== 'All' ? (
                <div className='settings-option-div'>
                  <p className='label'>Secondary Indicator (optional)</p>
                  <Select
                    showSearch
                    allowClear
                    clearIcon={<div className='clearIcon' />}
                    style={{ width: '100%' }}
                    className='undp-select'
                    value={yAxisIndicator}
                    placeholder='Please select'
                    onChange={d => {
                      updateYAxisIndicator(d);
                    }}
                    defaultValue={
                      focusArea === 'Tobacco'
                        ? DEFAULT_VALUES_TOBACCO.secondMetric
                        : focusArea === 'NCD'
                        ? DEFAULT_VALUES_NCD.secondMetric
                        : DEFAULT_VALUES_ALL.secondMetric
                    }
                    listHeight={400}
                  >
                    <Select.OptGroup label='Tobacco control'>
                      {optionsTobacco.map(d => (
                        <Select.Option className='undp-select-option' key={d}>
                          {d}
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                    <Select.OptGroup label='NCDs'>
                      {optionsNCD.map(d => (
                        <Select.Option className='undp-select-option' key={d}>
                          {d}
                        </Select.Option>
                      ))}
                    </Select.OptGroup>
                  </Select>
                </div>
              ) : null}
              {(graphType === 'map' && focusArea !== 'All') ||
              graphType === 'scatterPlot' ? (
                <div className='settings-option-div'>
                  <p className='label'>
                    {graphType === 'map'
                      ? 'Choose an indicator to overlay'
                      : 'Size By'}{' '}
                    (optional)
                  </p>
                  <Select
                    allowClear
                    clearIcon={<div className='clearIcon' />}
                    showSearch
                    style={{ width: '100%' }}
                    className='undp-select'
                    placeholder='Size By'
                    onChange={d => {
                      updateSizeIndicator(d);
                    }}
                    listHeight={400}
                  >
                    {focusArea === 'All' ? (
                      <>
                        <Select.OptGroup label='Tobacco control'>
                          {sizeOptionsTobacco.map(d => (
                            <Select.Option
                              className='undp-select-option'
                              key={d}
                            >
                              {d}
                            </Select.Option>
                          ))}
                        </Select.OptGroup>
                        <Select.OptGroup label='NCDs'>
                          {sizeOptionsNCD.map(d => (
                            <Select.Option
                              className='undp-select-option'
                              key={d}
                            >
                              {d}
                            </Select.Option>
                          ))}
                        </Select.OptGroup>
                      </>
                    ) : (
                      sizeOptions.map(d => (
                        <Select.Option className='undp-select-option' key={d}>
                          {d}
                        </Select.Option>
                      ))
                    )}
                  </Select>
                </div>
              ) : null}
              {graphType === 'barGraph' || graphType === 'scatterPlot' ? (
                <div className='settings-option-div'>
                  <p className='label'>Color By</p>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder='Color By'
                    className='undp-select'
                    onChange={d => {
                      updateColorIndicator(d);
                    }}
                    defaultValue={
                      focusArea === 'Tobacco'
                        ? DEFAULT_VALUES_TOBACCO.colorMetric
                        : focusArea === 'NCD'
                        ? DEFAULT_VALUES_NCD.colorMetric
                        : DEFAULT_VALUES_ALL.colorMetric
                    }
                  >
                    {colorOptions.map(d => (
                      <Select.Option className='undp-select-option' key={d}>
                        {d}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              ) : null}
              <div className='flex-div flex-wrap margin-top-02 margin-bottom-02 gap-04'>
                <button
                  className='undp-button button-tertiary'
                  type='button'
                  style={{ color: 'var(--blue-600)', padding: 0 }}
                  onClick={() => {
                    updateShowSource(true);
                  }}
                >
                  <Database
                    stroke='var(--blue-600)'
                    style={{ marginRight: '0.25rem' }}
                    strokeWidth={2}
                  />
                  Data Details
                </button>
                <button
                  className='undp-button button-tertiary'
                  type='button'
                  style={{ color: 'var(--blue-600)', padding: 0 }}
                  onClick={() => {
                    const node = document.getElementById(
                      'graph-node',
                    ) as HTMLElement;
                    domtoimage
                      .toPng(node, { height: node.scrollHeight })
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      .then((dataUrl: any) => {
                        const link = document.createElement('a');
                        link.download = 'graph.png';
                        link.href = dataUrl;
                        link.click();
                      });
                  }}
                >
                  <FileDown
                    strokeWidth={2}
                    stroke='var(--blue-600)'
                    style={{ marginRight: '0.25rem' }}
                  />
                  Download Graph
                </button>
              </div>
              <p className='label' style={{ color: 'var(--gray-600)' }}>
                These data may not be comparable across different types of
                health investment cases
              </p>
            </div>
          </div>
          {graphType !== 'map' ? (
            <div className='settings-sections-container'>
              <button
                type='button'
                aria-label='Expand or collapse settings'
                className='settings-sections-container-title'
                onClick={() => {
                  setSettingsExpanded(!settingExpanded);
                }}
              >
                <div>
                  {settingExpanded ? (
                    <ChevronDown fill='#212121' size={24} />
                  ) : (
                    <ChevronLeft fill='#212121' size={24} />
                  )}
                </div>
                <h6 className='undp-typography margin-bottom-00'>
                  Settings & Options
                </h6>
              </button>
              <div
                className='settings-sections-options-container'
                style={{ display: settingExpanded ? 'flex' : 'none' }}
              >
                {graphType === 'scatterPlot' ? (
                  <Checkbox
                    style={{ margin: 0 }}
                    className='undp-checkbox'
                    checked={showLabel}
                    onChange={e => {
                      updateShowLabel(e.target.checked);
                    }}
                  >
                    Show Label
                  </Checkbox>
                ) : null}
                {graphType === 'barGraph' ? (
                  <>
                    <Checkbox
                      style={{ margin: 0 }}
                      className='undp-checkbox'
                      checked={!verticalBarLayout}
                      onChange={e => {
                        updateBarLayout(!e.target.checked);
                      }}
                    >
                      Show Horizontal
                    </Checkbox>
                    <Checkbox
                      style={{ margin: 0 }}
                      className='undp-checkbox'
                      disabled={!verticalBarLayout}
                      checked={reverseOrder}
                      onChange={e => {
                        updateReverseOrder(e.target.checked);
                      }}
                    >
                      Show Largest First
                    </Checkbox>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
          <div className='settings-sections-container'>
            <button
              type='button'
              aria-label='Expand or collapse filters'
              className='settings-sections-container-title'
              onClick={() => {
                setFilterExpanded(!filterExpanded);
              }}
            >
              <div>
                {filterExpanded ? (
                  <ChevronDown fill='#212121' size={24} />
                ) : (
                  <ChevronLeft fill='#212121' size={24} />
                )}
              </div>
              <h6 className='undp-typography margin-bottom-00'>
                Filter or Highlight By
              </h6>
            </button>
            <div
              className='settings-sections-options-container'
              style={{ display: filterExpanded ? 'flex' : 'none' }}
            >
              <div className='settings-option-div'>
                <p className='label'>UNDP Region</p>
                <Select
                  mode='multiple'
                  allowClear
                  style={{ width: '100%' }}
                  maxTagCount='responsive'
                  clearIcon={<div className='clearIcon' />}
                  className='undp-select'
                  placeholder='Filter By Regions'
                  value={selectedRegions}
                  onChange={(d: string[]) => {
                    updateSelectedRegions(d);
                  }}
                >
                  {regions.map(d => (
                    <Select.Option className='undp-select-option' key={d}>
                      {d}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className='settings-option-div'>
                <p className='label'>Income Group</p>
                <Select
                  className='undp-select'
                  mode='multiple'
                  maxTagCount='responsive'
                  allowClear
                  clearIcon={<div className='clearIcon' />}
                  style={{ width: '100%' }}
                  placeholder='Filter By Income Group'
                  value={selectedIncomeGroups}
                  onChange={(d: string[]) => {
                    updateSelectedIncomeGroups(d);
                  }}
                >
                  {INCOME_GROUPS.map(d => (
                    <Select.Option className='undp-select-option' key={d}>
                      {d}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className='settings-option-div'>
                <p className='label'>Country Groups</p>
                <Radio.Group
                  onChange={d => {
                    updateSelectedCountryGroup(d.target.value);
                  }}
                  value={selectedCountryGroup}
                >
                  <Radio className='undp-radio' value='All'>
                    All
                  </Radio>
                  <Radio className='undp-radio' value='LDC'>
                    LDC
                  </Radio>
                  <Radio className='undp-radio' value='LLDC'>
                    LLDC
                  </Radio>
                  <Radio className='undp-radio' value='SIDS'>
                    SIDS
                  </Radio>
                </Radio.Group>
              </div>
              <div className='settings-option-div'>
                <p className='label'>Countries</p>
                <Select
                  className='undp-select'
                  mode='multiple'
                  maxTagCount='responsive'
                  allowClear
                  clearIcon={<div className='clearIcon' />}
                  style={{ width: '100%' }}
                  value={selectedCountries}
                  placeholder='Filter By Countries'
                  onChange={(d: string[]) => {
                    updateSelectedCountries(d);
                  }}
                >
                  {countries.map(d => (
                    <Select.Option className='undp-select-option' key={d}>
                      {d}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='settings-sections-container'>
          <div className='settings-sections-options-container'>
            <div className='settings-option-div'>
              <div className='settings-option-div'>
                <p className='label'>Select a Country</p>
                <Select
                  showSearch
                  className='undp-select'
                  placeholder='Please select a country'
                  value={dataListCountry}
                  onChange={d => {
                    updateDataListCountry(d);
                  }}
                >
                  {countries.map(d => (
                    <Select.Option className='undp-select-option' key={d}>
                      {d}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <p
                className='label'
                style={{ color: 'var(--gray-600)', paddingTop: '0.5rem' }}
              >
                These data may not be comparable across different types of
                health investment cases
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
