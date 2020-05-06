import React from "react";
import { SimpleDailyData } from "../../typings/API";
import { Grid, Card as Cards } from "@material-ui/core";
import { Card } from "../@common";

interface Props {
  data: SimpleDailyData;
}

interface CardData {
  [key: string]: {
    heading: string;
    value: number;
    body: any;
    className: any;
    options: {
      [key: string]: any;
    };
  };
}

// date={new Date(lastUpdate)}
//         heading="Infected"
//         body="Total number of
//               infected patients of COVID-19"
//         className={cx(styles.card, styles.confirmed)}
//         xs={12}
//         md={3}

class DataCardModule extends React.Component<Props> {
  renderData = (items: string[], data: CardData, date: Date) => {
    return items.map((item) => {
      return this.renderCard(
        data[item].heading,
        data[item].body,
        data[item].value,
        date,
        data[item].heading.split(" ").join("_"),
        data[item].className,
        data[item].options
      );
    });
  };
  renderCard = (
    heading: string,
    text: React.ReactNode,
    value: number,
    date: Date,
    key: string = heading,
    className: any,
    options: any
  ) => {
    // console.log(...rest);
    // rest should have xs classname
    return (
      <Grid {...options} item key={key} className={className} component={Cards}>
        <Card heading={heading} date={date} value={value}>
          {text}
        </Card>
      </Grid>
    );
  };
}

export default DataCardModule;
