import React from "react";
import CountUp from "react-countup";
import {
  Card as Cards,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";

type Props = {
  heading: string;
  value: number;
  body?: string;
  date?: Date;
  children?: React.ReactNode;
  [key: string]: any;
};

const Card = ({ heading, value, body, date, children, ...rest }: Props) => {
  return (
    <CardContent>
      <Typography variant={"overline"} gutterBottom>
        LAST UPDATED ON {date?.toLocaleDateString()}
      </Typography>
      <Typography
        color="textSecondary"
        variant="h4"
        style={{ fontWeight: "bold" }}
        gutterBottom
      >
        {heading}
      </Typography>
      <Typography variant="h4">
        <CountUp start={0} end={value} duration={1.5} separator="," />
      </Typography>
      <Typography variant="body2" style={{ paddingTop: "10px" }}>
        {children}
      </Typography>
    </CardContent>
  );
};

export default Card;
