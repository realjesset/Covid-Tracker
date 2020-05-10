import React from "react";
import styles from "./DataCards.module.scss";

import { Grid } from "@material-ui/core";
import { Card, Title } from "../@common";
import { SimplifiedDailyData } from "../../api/API";
import { WaveTopBottomLoading } from "react-loadingg";
import { deathsIcon, activeIcon, recoveredIcon, casesIcon } from "../../assets";

interface Props {
  data: SimplifiedDailyData;
  loading: boolean;
}

interface Data {
  active: { title: string; value: number; footer: string; svg: JSX.Element };
  cases: { title: string; value: number; footer: string; svg: JSX.Element };
  deaths: { title: string; value: number; footer: string; svg: JSX.Element };
  recovered: { title: string; value: number; footer: string; svg: JSX.Element };
  todayCases: {
    title: string;
    value: number;
    footer: string;
    badge: boolean;
  };
  todayDeaths: {
    title: string;
    value: number;
    footer: string;
    badge: boolean;
  };
}

class DataCards extends React.Component<Props> {
  renderCards = (data: Data) => {
    return Object.entries(data).map((value) => (
      <Grid key={value[0]} item xs={12} sm={6}>
        <Card
          title={value[1].title}
          value={value[1].value}
          footer={value[1].footer}
          chip={value[1].badge || false}
          key={value[0]}
          style={[styles[value[0]]] || null}
          svg={value[1].svg || null}
        />
      </Grid>
    ));
  };

  renderData = (data) => {
    return {
      todayCases: {
        title: "Cases",
        value: data.todayCases,
        footer: "New confirmed cases of COVID-19",
        badge: true,
      },
      todayDeaths: {
        title: "Deaths",
        value: data.todayDeaths,
        footer: "New Deaths caused by COVID-19",
        badge: true,
      },
      cases: {
        title: "Cases",
        value: data.cases,
        footer: "Total confirmed cases",
        svg: <img src={casesIcon} alt="cases"></img>,
      },
      active: {
        title: "Active Cases",
        value: data.active,
        footer: "On-going COVID-19 cases",
        svg: <img src={activeIcon} alt="active"></img>,
      },
      recovered: {
        title: "Recovered",
        value: data.recovered,
        footer: "Patients Recovered from COVID-19",
        svg: <img src={recoveredIcon} alt="recovered"></img>,
      },
      deaths: {
        title: "Deaths",
        value: data.deaths,
        footer: "Deaths caused by COVID-19",
        svg: <img src={deathsIcon} alt="deaths"></img>,
      },
    };
  };

  render() {
    const { data: info, loading } = this.props;
    const data = this.renderData(info);
    if (loading) return <WaveTopBottomLoading />;
    return (
      <React.Fragment>
        <Title country={info.country || "Global"} date={info.updated} />
        <Grid
          className={styles.container}
          container
          xs={12}
          sm={12}
          spacing={2}
        >
          {this.renderCards(data)}
        </Grid>
      </React.Fragment>
    );
  }
}

export default DataCards;
