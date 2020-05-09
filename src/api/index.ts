import { API_Data, SimplifiedDailyData } from "./API";
import axios from "axios";
import { Countries } from "./countries";
import file, { fstat } from "fs";

const url = "https://disease.sh/v2";

export async function fetchGlobalData(): Promise<SimplifiedDailyData | void> {
  try {
    const { data } = (await axios.get(`${url}/all`)) as { data: API_Data };
    const modifidied: SimplifiedDailyData = {
      cases: data.cases,
      deaths: data.deaths,
      recovered: data.recovered,
      updated: new Date(data.updated || Date.now()),
      active: data.active,
      tests: data.tests,
      todayCases: data.todayCases,
      todayDeaths: data.todayDeaths,
    };
    return modifidied;
  } catch (error) {
    console.log(error);
    if (error.response && error.response === "404") {
      alert("Fetching of data not found");
    } else {
      alert("Unexpected error");
    }
  }
}

export function getCountries() {
  return Countries;
}

export async function getCountryData(
  country: string
): Promise<SimplifiedDailyData | void> {
  try {
    const { data } = (await axios.get(`${url}/${country}`)) as {
      data: API_Data;
    };
    const modifidied: SimplifiedDailyData = {
      country: data.country,
      cases: data.cases,
      deaths: data.deaths,
      recovered: data.recovered,
      updated: new Date(data.updated || Date.now()),
      active: data.active,
      tests: data.tests,
      todayCases: data.todayCases,
      todayDeaths: data.todayDeaths,
    };
    return modifidied;
  } catch (error) {
    console.log(error);
    if (error.response && error.response === "404") {
      alert("Fetching of data not found");
    } else {
      alert("Unexpected error");
    }
  }
}
