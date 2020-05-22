/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import { APIHistoricalRegion } from "../../api";

import { Line, Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import moment from "moment";
import millify from "millify";
import { useTheme, Theme } from "@material-ui/core";

type ChartProps = {
  type: "bar" | "line";
  linearLog?: "linear" | "logarithmic";
  label?: "All" | "Cases" | "Deaths" | "Recovered";
  all: APIHistoricalRegion;
  daily: APIHistoricalRegion;
  styles?: string;
};

type LineData = {
  data: number[];
  label: string;
  borderColor: string;
  pointBackgroundColor: string;
  hoverBackgroundColor: string;
  fill: boolean;
  pointRadius: number;
  pointHitRadius: number;
  backgroundColor: string;
};

const RenderChart: React.FC<ChartProps> = ({
  type,
  linearLog = "linear",
  label,
  all,
  daily,
  styles,
  children,
}) => {
  const { palette }: Theme = useTheme();
  let allCases = {} as LineData,
    allRecovered = {} as LineData,
    allDeaths = {} as LineData;
  if (all.timeline || daily.timeline) {
    allCases = {
      data: Object.entries(all.timeline.cases).map(([date, value]) => value),
      label: "Cases",
      pointBackgroundColor: "#d6e019",
      hoverBackgroundColor: "#d6e019",
      borderColor: "#d6e019",
      fill: true,
      pointRadius: 0,
      pointHitRadius: 10,
      backgroundColor:
        palette.type === "dark"
          ? "rgba(77, 77, 77, 0.2)"
          : "rgba(209, 205, 205, 0.2)",
    };

    allDeaths = {
      data: Object.entries(all.timeline.deaths).map(([date, value]) => value),
      label: "Deaths",
      borderColor: "#f74848",
      pointBackgroundColor: "#f74848",
      hoverBackgroundColor: "#f74848",
      fill: true,
      pointRadius: 0,
      pointHitRadius: 10,
      backgroundColor:
        palette.type === "dark"
          ? "rgba(77, 77, 77, 0.2)"
          : "rgba(209, 205, 205, 0.2)",
    };

    allRecovered = {
      data: Object.entries(all.timeline.recovered).map(
        ([date, value]) => value
      ),
      label: "Recovered",
      borderColor: "#68f760",
      pointBackgroundColor: "#68f760",
      hoverBackgroundColor: "#68f760",
      fill: true,
      pointRadius: 0,
      pointHitRadius: 10,
      backgroundColor:
        palette.type === "dark"
          ? "rgba(77, 77, 77, 0.2)"
          : "rgba(209, 205, 205, 0.2)",
    };
  }

  const options = (title: string): ChartOptions => ({
    legend: { position: "top", fullWidth: true, align: "center" },
    maintainAspectRatio: false,
    // tooltips: {
    //   backgroundColor: palette.type === 'dark' ? palette.divider : palette.divider,
    //   bodyFontColor: palette.text.primary,
    //   titleFontColor: palette.text.primary,
    //   footerFontColor: palette.text.secondary,
    // },
    scales: {
      yAxes: [
        {
          type: linearLog,
          gridLines: {
            drawBorder: true,
            color: palette.divider,
          },
          ticks: {
            autoSkip: true,
            min: 0,
            padding: 5,
            autoSkipPadding: 10,
            callback(value) {
              return millify(value as number);
            },
          },
          scaleLabel: {
            display: true,
            labelString: "Cases",
            fontSize: 15,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: true,
            color: palette.divider,
          },

          ticks: {
            padding: 10,
            fontSize: 14,
            autoSkipPadding: 5,
          },
        },
      ],
    },
  });
  const LineChart = () => {
    return all.timeline ? (
      <Line
        data={{
          labels: Object.entries(all.timeline.cases).map(
            ([date]) => `${moment(date).format("MMM Do")}`
          ),
          datasets:
            label === "All"
              ? [allCases, allRecovered, allDeaths]
              : label === "Cases"
              ? [allCases]
              : label === "Recovered"
              ? [allRecovered]
              : [allDeaths],
        }}
        options={options("Cases")}
      />
    ) : null;
  };

  const BarChart = () => {
    return daily.timeline && label && label !== "All" ? (
      <Bar
        options={options("Daily")}
        data={{
          labels: Object.entries(daily.timeline.cases).map(
            ([date]) => `${moment(date).format("MMM Do")}`
          ),
          datasets: [
            {
              label: label || "Cases",
              data: Object.entries(
                daily.timeline[
                  label.toLowerCase() as keyof typeof daily.timeline
                ]
              ).map(([date, value]) => value),
              backgroundColor: palette.text.secondary,
              fill: true,
              pointRadius: 0,
              pointHitRadius: 20,
              maxBarThickness: 10,
            },
          ],
        }}
      />
    ) : null;
  };

  return (
    <React.Fragment>
      {type === "line" ? <LineChart /> : <BarChart />}
    </React.Fragment>
  );
};

export default RenderChart;
