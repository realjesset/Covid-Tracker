import { Url } from "url";

export type API_Global_Value_Detail = {
  value: number;
  detail: Url | null;
};
export type API_Global_Data = [
  {
    confirmed: API_Global_Value_Detail;
    recovered: API_Global_Value_Detail;
    deaths: API_Global_Value_Detail;
    lastUpdate: Date;
  }
];

export type API_Data = {
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

export type SimplifiedDailyData = {
  cases: number;
  active: number;
  deaths: number;
  country?: string | null;
  recovered: number;
  updated: Date;
  todayCases: number;
  todayDeaths: number;
  tests?: number;
};
