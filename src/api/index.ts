import axios from 'axios';
import moment from 'moment';
import { Countries } from './countries';

export type Country = {
  _id?: number;
  name: string;
  iso2?: string;
  iso3?: string;
  lat?: number;
  long?: number;
  flag: string;
};

interface APIGlobal {
  updated: number | string | Date;
  cases: number | null;
  todayCases: number | null;
  deaths: number | null;
  todayDeaths: number | null;
  recovered: number | null;
  active: null;
  critical: number | null;
  casesPerOneMillion: number | null;
  deathsPerOneMillion: number | null;
  tests: number | null;
  testsPerOneMillion: number | null;
  affectedCountries: number | null;
}

interface APIHistorical {
  cases: { [key: string]: number };
  deaths: { [key: string]: number };
  recovered: { [key: string]: number };
}

export interface APIHistoricalRegion {
  country: string;
  timeline: APIHistorical;
}

export interface APICountry extends APIGlobal {
  countryInfo?: Country;
  country?: string;
  yesterdayCases?: number | null;
  yesterdayDeaths?: number | null;
  todayRecovered?: number | null;
}

interface APIDataReturn {
  data?: APICountry;
  error?: string;
}

const url = 'https://disease.sh/v2';

export function getCountries(): Country[] {
  return Countries;
}

/** 
 * Fetches data from the API.
 * if the country is not specified, it will return all countries.
*/
export async function fetchData(country?: string): Promise<APIDataReturn> {
  const query = `${url}${
    country?.toLowerCase() !== 'global' ? `/countries/${country}?allowNull=true` : '/all?allowNull=true'
  }`;
  try {
    // requesting todays data
    // prettier-ignore
    const { data: dataToday }: { data: APICountry } = await axios.get(`${query}`);
    dataToday.updated = new Date(dataToday.updated); // formating date field

    // requesting yesterdays data
    // prettier-ignore
    const { data: dataYesterday }: { data: APICountry } = await axios.get(`${query}&yesterday=true`);

    // reformating the data
    const data: APICountry = {
      ...dataToday,
      todayRecovered:
        (dataToday.recovered ? dataToday.recovered : 0) - (dataYesterday.recovered ? dataYesterday.recovered : 0),
      yesterdayCases: dataYesterday.todayCases,
      yesterdayDeaths: dataYesterday.todayDeaths,
    };

    if (!country || country.toLowerCase() === 'global') {
      data.countryInfo = {
        name: 'Global',
        flag: 'https://cdn.pixabay.com/photo/2016/12/07/15/46/global-1889726_960_720.png',
      };
    }

    // returning the data without errors
    return { data };
  } catch (error) {
    // error handling
    if (error.response=== 404) return { error: 'Server not responding' };
    else return { error: 'Unexpected exception' };
  }
}
/** 
 * Fetchs the historical data from the API.
*/
export async function fetchHistoryAll() {
  const jan = moment([2020, 0, 1]);
  const dateNow = moment(Date.now());
  const diff = dateNow.diff(jan, 'days');
  const query = `${url}/historical/all?lastdays=${diff}`;
  try {
    // requesting historical data
    // prettier-ignore
    const {data}: {data: APIHistorical} = await axios.get(`${query}`);

    // modifying data
    const all = { timeline: { ...data }, country: 'Global' } as APIHistoricalRegion;
    const daily = getDaily(data, 'Global');

    return { data: { all, daily } };
  } catch (error) {
    // error handling
    if (error.response === 404) return { error: 'Server not responding' };
    else return { error: 'Unexpected exception' };
  }
}

/** 
 * Fetches the historical data for a specific country.
*/
export async function fetchHistory(country: string) {
  const jan = moment([2020, 0, 1]);
  const dateNow = moment(Date.now());
  const diff = dateNow.diff(jan, 'days');
  const query = `${url}/historical/${country}?lastdays=${diff}`;

  try {
    // requesting historical data
    // prettier-ignore
    const {data:all}: {data: APIHistoricalRegion} = await axios.get(`${query}`);
    // eslint-disable-next-line
    Object.entries(all.timeline).map(([value, object], i) => {
      let emptyValue = true;
      if (value === 'cases')
        // eslint-disable-next-line
        Object.entries(object).map(([date, cases], i) => {
          console.log(object[date]);
          if (object[date] > 0) emptyValue = false;
          if (emptyValue) {
            delete all.timeline['cases'][date];
            delete all.timeline['deaths'][date];
            delete all.timeline['recovered'][date];
          }
        });
    });
    // modifying data
    const daily = getDaily(all.timeline, all.country);

    return { data: { all, daily } };
  } catch (error) {
    // error handling
    if (error.response === 404) return { error: 'Server not responding' };
    else return { error: 'Unexpected exception' };
  }
}

/** 
 * Maps the data to the daily format.
*/
function getDaily(data: APIHistorical, country: string): APIHistoricalRegion {
  let daily = { timeline: {}, country: country } as APIHistoricalRegion;
  Object.entries(data).map(async ([type, object]) => {
    let prevNum = 0;
    // eslint-disable-next-line
    Object.entries(object).map(([date, value]) => {
      daily.timeline[type as keyof typeof data] = {
        ...daily.timeline[type as keyof typeof data],
        [date]: (value as number) - prevNum,
      };
      prevNum = value as number;
    });
  });
  return daily;
}
