import { Countries } from "./countries";
import { DailyData, SimpleDailyData } from "./../typings/API";
import axios from "axios";

const url = "https://disease.sh/v2";

// export const fetchData = async () => {
//   try {
//     const {
//       data: { confirmed, recovered, deaths, lastUpdate },
//     } = (await axios.get(url)) as { data: API_Global_Data };

//     return { confirmed, recovered, deaths, lastUpdate };
//   } catch (error) {}
// };

export const fetchDailyData = async (): Promise<SimpleDailyData> => {
  try {
    const { data }: { data: DailyData } = await axios.get(`${url}/all`);

    const modifiedData: SimpleDailyData = {
      cases: data.cases,
      todayCases: data.todayCases,
      deaths: data.deaths,
      todayDeaths: data.todayDeaths,
      recovered: data.recovered,
      active: data.active,
      updatedDate: data.updated,
      tests: data.tests,
      country: data.country || null,
    };

    return modifiedData;
  } catch (error) {
    return error;
  }
};

export const getAllCountries = () => {
  return Countries.map((country) => ({
    [country.name]: { iso2: country.iso2, iso3: country.iso3 },
  }));
};

// export async function getCountryDailyReport(country) {
//   try {
//     const {data} = await axios.get("https://disease.sh/v2/countries/" + country)
//     if (data && data.todayCases === 0) {}
//   } catch (error) {

//   }
// }

// const getCountryFromApi = async () => {
//   try {
//     const { data } = await axios.get("https://covid19.mathdro.id/api/countries");
//     return data;
//   } catch (error) {}
// };
