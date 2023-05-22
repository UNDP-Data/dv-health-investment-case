import styled from 'styled-components';
import { useRef, useState } from 'react';
import { DataType, IndicatorMetaDataType } from '../../Types';
import { ValueCard } from '../../CardComponents/ValueCard';
// import { DotPlot } from '../../CardComponents/DotPlot';

interface Props {
  data: DataType;
  indicators: IndicatorMetaDataType[];
}

const WrapperEl = styled.div`
  scroll-snap-type: x mandatory;
  scroll-padding: 0;
  scroll-padding-left: 0;
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
  user-select: none;
`;

export function CountrySummary(props: Props) {
  const { data, indicators } = props;
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(
    'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
  );
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className='margin-bottom-07'
      style={{
        cursor: `${cursor}, auto`,
      }}
      onClick={e => {
        if (WrapperRef.current) {
          if (e.clientX > window.innerWidth / 2)
            WrapperRef.current.scrollBy(50, 0);
          else WrapperRef.current.scrollBy(-50, 0);
        }
      }}
      onMouseMove={e => {
        if (e.clientX > window.innerWidth / 2)
          setCursor(
            'url(https://design.undp.org/static/media/arrow-right.125a0586.svg)',
          );
        else
          setCursor(
            'url(https://design.undp.org/static/media/arrow-left.14de54ea.svg)',
          );
      }}
    >
      <WrapperEl
        className='flex-div stat-container undp-scrollbar'
        ref={WrapperRef}
      >
        {/* {data.data.findIndex(el => el.indicator === 'tobacco_burden') !== -1 ? (
          <DotPlot
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden')
              ].Indicator
            }
            size={200}
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'tobacco_burden')
              ].value
            }
            year={2022}
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden')
              ].DataSourceName
            }
          />
        ) : null} */}
        {data.data.findIndex(el => el.indicator === 'tobacco_burden') !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'tobacco_burden')
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden')
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden')
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(el => el.indicator === 'tobacco_burden_GDP') !==
        -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'tobacco_burden_GDP')
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden_GDP')
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'tobacco_burden_GDP')
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(
          el => el.indicator === 'costs_per_adult_smoker',
        ) !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(
                  el => el.indicator === 'costs_per_adult_smoker',
                )
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'costs_per_adult_smoker',
                )
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'costs_per_adult_smoker',
                )
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(
          el => el.indicator === 'tobacco-attributable_deaths',
        ) !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(
                  el => el.indicator === 'tobacco-attributable_deaths',
                )
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'tobacco-attributable_deaths',
                )
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'tobacco-attributable_deaths',
                )
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(
          el => el.indicator === 'econ_productivity_losses',
        ) !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(
                  el => el.indicator === 'econ_productivity_losses',
                )
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'econ_productivity_losses',
                )
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'econ_productivity_losses',
                )
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(
          el => el.indicator === 'healthcare_expenditures',
        ) !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(
                  el => el.indicator === 'healthcare_expenditures',
                )
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'healthcare_expenditures',
                )
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'healthcare_expenditures',
                )
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(el => el.indicator === 'econ_losses_15years') !==
        -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(
                  el => el.indicator === 'econ_losses_15years',
                )
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'econ_losses_15years')
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'econ_losses_15years')
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(el => el.indicator === 'averted_deaths') !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'averted_deaths')
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'averted_deaths')
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'averted_deaths')
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(el => el.indicator === 'annual_deaths_averted') !==
        -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(
                  el => el.indicator === 'annual_deaths_averted',
                )
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'annual_deaths_averted')
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'annual_deaths_averted')
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(el => el.indicator === 'econ_benefits') !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'econ_benefits')
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'econ_benefits')
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'econ_benefits')
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(
          el => el.indicator === 'avoided_econ_productivity_losses',
        ) !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(
                  el => el.indicator === 'avoided_econ_productivity_losses',
                )
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'avoided_econ_productivity_losses',
                )
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'avoided_econ_productivity_losses',
                )
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(
          el => el.indicator === 'annual_avoided_econ_productivity_losses',
        ) !== -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(
                  el =>
                    el.indicator === 'annual_avoided_econ_productivity_losses',
                )
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'annual_avoided_econ_productivity_losses',
                )
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(
                  d => d.DataKey === 'annual_avoided_econ_productivity_losses',
                )
              ].DataSourceName
            }
          />
        ) : null}
        {data.data.findIndex(el => el.indicator === 'all_ROI_15years') !==
        -1 ? (
          <ValueCard
            value={
              data.data[
                data.data.findIndex(el => el.indicator === 'all_ROI_15years')
              ].value
            }
            year={2022}
            graphTitle={
              indicators[
                indicators.findIndex(d => d.DataKey === 'all_ROI_15years')
              ].Indicator
            }
            source={
              indicators[
                indicators.findIndex(d => d.DataKey === 'all_ROI_15years')
              ].DataSourceName
            }
          />
        ) : null}
      </WrapperEl>
    </div>
  );
}
