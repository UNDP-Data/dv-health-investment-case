import { CSVLink } from 'react-csv';
import { DataType, IndicatorMetaDataType } from '../Types';
import DownloadExcel from './DownloadExcel';

interface Props {
  indicatorData: IndicatorMetaDataType;
  data: DataType[];
}

const dataTable = (data: DataType[], indicator: IndicatorMetaDataType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const table: any = [];
  data.forEach(d => {
    const country = d['Country or Area'];
    const countryCode = d['Alpha-3 code'];
    const value =
      d.data[
        d.data.findIndex(el => el.indicator === indicator.DataKey)
      ]?.value.toFixed(2);
    // Check if value exists before adding to the table
    if (value !== undefined && value !== null) {
      table.push({
        country,
        countryCode,
        value,
      });
    }
  });
  return table;
};

const dataTableForExcel = (
  data: DataType[],
  indicator: IndicatorMetaDataType,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const table: any = data
    .map(d => {
      const country = d['Country or Area'];
      const countryCode = d['Alpha-3 code'];
      const value =
        d.data[d.data.findIndex(el => el.indicator === indicator.DataKey)]
          ?.value;

      // Return null if value does not exist
      if (value === undefined || value === null) {
        return null;
      }

      return {
        country,
        countryCode,
        value,
      };
    })
    .filter(row => row !== null); // Filter out the null values
  return table;
};

export function DataSourceListItem(props: Props) {
  const { indicatorData, data } = props;

  return (
    <div className='padding-top-07 padding-bottom-05'>
      <h5 className='bold undp-typography'>{indicatorData.Indicator}</h5>
      <div
        className='flex-div margin-bottom-07'
        style={{ alignItems: 'baseline' }}
      >
        <h6
          className='undp-typography margin-top-00 margin-bottom-00'
          style={{ width: '15%', flexShrink: 0 }}
        >
          Description
        </h6>
        <div>{indicatorData.IndicatorDescription}</div>
      </div>
      <div
        className='flex-div margin-bottom-07'
        style={{ alignItems: 'baseline' }}
      >
        <h6
          className='undp-typography margin-top-00 margin-bottom-00'
          style={{ width: '15%', flexShrink: 0 }}
        >
          Data Link
        </h6>
        {indicatorData.DataSourceLink !== '' &&
        indicatorData.DataSourceLink !== undefined ? (
          <div>
            {indicatorData.DataSourceLink.split(';').map((d, i) => (
              <div key={i}>
                <a href={d} target='_blank' rel='noreferrer'>
                  {d}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
      <div className='flex-div margin-bottom-00 gap-07'>
        <DownloadExcel
          data={dataTableForExcel(data, indicatorData)}
          indicatorTitle={indicatorData.Indicator}
        />
        <CSVLink
          headers={[
            { label: 'Country or Area', key: 'country' },
            { label: 'Alpha-3 code', key: 'countryCode' },
            { label: indicatorData.Indicator, key: 'value' },
          ]}
          enclosingCharacter=''
          separator=';'
          data={dataTable(data, indicatorData)}
          filename={`${indicatorData.Indicator.replaceAll(',', '').replaceAll(
            '.',
            ' ',
          )}.csv`}
          asyncOnClick
          target='_blank'
          style={{ backgroundImage: 'none' }}
        >
          <div className='undp-button button-tertiary button-arrow'>
            Download Data as CSV
          </div>
        </CSVLink>
      </div>
    </div>
  );
}
