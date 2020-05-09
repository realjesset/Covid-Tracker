import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Card, Title } from "../@common";
import styles from "./DataCards.module.scss";
import icon from "./recovered.svg";
import { WaveTopBottomLoading } from "react-loadingg";

interface Props {
  country: string;
  date: Date;
  data: Data;
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
  componentDidMount() {}

  renderCards = (data: Data) => {
    return Object.entries(data).map((value) => (
      <Grid key={value[0]} item xs={12} sm={4}>
        <Card
          title={value[1].title}
          value={value[1].value}
          footer={value[1].footer}
          chip={value[1].badge || false}
          key={value[0]}
          style={[styles[value[0]]]}
          svg={value[1].svg || null}
        />
      </Grid>
    ));
  };

  render() {
    const { country, date, data } = this.props;
    if (!date) return <WaveTopBottomLoading />;
    return (
      <React.Fragment>
        <Title country={country} date={date} />
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
