import { Url } from "url";

export type API_Global_Value_Detail = {
  value: number;
  detail: Url;
};
export type API_Global_Data = {
  confirmed: API_Global_Value_Detail;
  recovered: API_Global_Value_Detail;
  deaths: API_Global_Value_Detail;
  lastUpdate: string;
};

export type DailyData = {
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  affectedCountries: number;
  country?: string;
};

export type SimpleDailyData = {
  cases: number;
  active?: number;
  deaths: number;
  country?: string | null;
  recovered: number;
  updatedDate: string | number;
  todayCases?: number;
  todayDeaths?: number;
  tests?: number;
};
