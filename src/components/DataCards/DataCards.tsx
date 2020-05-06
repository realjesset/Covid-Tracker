import React from "react";

import { Grid } from "@material-ui/core";
import cx from "classnames";

// ---- Modules ----

import { DataCardModule } from "../@modules";

import styles from "./DataCards.module.scss";

class DataCards extends DataCardModule {
  // getCards(data: {}) {
  //   return Object.keys(data).map((item, index) => "hello");
  // }
  render() {
    const {
      data: { cases, deaths, recovered, updatedDate },
    } = this.props;

    const data = getData(cases, deaths, recovered);

    if (!cases) return <h1>loading</h1>;
    else
      return (
        <div className={styles.container}>
          <Grid container spacing={3} justify="center">
            {this.renderData(
              ["cases", "recovered", "deaths"],
              data,
              new Date(updatedDate)
            )}
          </Grid>
        </div>
      );
  }
}

function getData(cases: number, recovered: number, deaths: number) {
  let data = {
    cases: {
      heading: "Confirmed Cases",
      value: cases,
      body: (
        <p>
          Total number of infected patients of <strong>COVID-19</strong>
        </p>
      ),
      className: cx(styles.card, styles.confirmed),
      options: {
        xs: 12,
        md: 3,
      },
    },
    recovered: {
      heading: "Recovered Patients",
      value: recovered,
      body: (
        <p>
          Number of patients recovered from <strong>COVID-19</strong>
        </p>
      ),
      className: cx(styles.card, styles.recovered),
      options: {
        xs: 12,
        md: 3,
      },
    },
    deaths: {
      heading: "Total Deaths",
      value: deaths,
      body: (
        <p>
          Total deaths caused by <strong>COVID-19</strong>{" "}
        </p>
      ),
      className: cx(styles.card, styles.deaths),
      options: {
        xs: 12,
        md: 3,
      },
    },
  };
  return data;
}

export default DataCards;
