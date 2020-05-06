import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { SimpleDailyData } from "../../typings/API";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.scss";

const Chart = (props) => {
  const [dailyData, setDailyData] = useState<SimpleDailyData>();

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();

    console.log(dailyData);
  }, []);

  // const lineChart = dailyData[0] ? (
  //   <Line
  //     data={{
  //       labels: dailyData.map((data) => data.date),
  //       datasets: [
  //         {
  //           data: dailyData.map((data) => data.confirmed),
  //           label: "Infected",
  //           borderColor: "#3333ff",
  //           fill: true,
  //         },
  //         {
  //           data: dailyData.map((data) => data.deaths),
  //           label: "Deaths",
  //           borderColor: "red",
  //           backgroundColor: "rgba(255,0,0,0.5)",
  //           fill: true,
  //         },
  //       ],
  //     }}
  //   ></Line>
  // ) : null;

  return <div className={styles.container}></div>;
};

export default Chart;
