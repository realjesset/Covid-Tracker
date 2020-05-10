import { API_Data, SimplifiedDailyData } from "./API";
import axios from "axios";
import { Countries } from "./countries";

const url = "https://disease.sh/v2";

interface FetchReturn {
  data: SimplifiedDailyData | null;
  error: string | null;
}

export async function fetchData(
  country: string | null = null
): Promise<FetchReturn> {
  try {
    if (country && country !== "Global") {
      const { data }: { data: API_Data } = await axios.get(
        `${url}/countries/${country}`
      );
      return { data: convertToSimpleData(data), error: null };
    } else {
      const { data }: { data: API_Data } = await axios.get(`${url}/all`);

      return { data: convertToSimpleData(data), error: null };
    }
  } catch (error) {
    if (error.response && error.response === "404") {
      return { data: null, error: "Error while fetching data" };
    } else {
      return { data: null, error: "Unexpected error" };
    }
  }
}

export function getCountries() {
  return Countries;
}

function convertToSimpleData(oldData: API_Data) {
  const data: SimplifiedDailyData = {
    country: oldData.country,
    cases: oldData.cases,
    deaths: oldData.deaths,
    recovered: oldData.recovered,
    active: oldData.active,
    tests: oldData.tests,
    todayCases: oldData.todayCases,
    todayDeaths: oldData.todayDeaths,
    updated: new Date(oldData.updated || Date.now()),
  };
  return data;
}
