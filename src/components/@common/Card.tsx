/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {
  Card as CardComponent,
  Grid,
  Chip,
  CardContent,
  Typography,
  Avatar,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { red, purple, grey, deepPurple } from "@material-ui/core/colors";
import cx from "classnames";
import Count from "react-countup";

type CardProps = {
  title: string;
  value: number;
  footer?: string;
  svg?: JSX.Element;
  style?: string[];
  chip?: boolean;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    card: {
      padding: "20px 20px",
      margin: "0 5%",
      marginTop: "10px",
      borderRadius: "15px",
      borderBottomLeftRadius: "unset",
      borderBottomRightRadius: "unset",
      boxShadow: "0 0px 20px 0.2px rgba(0, 0, 0, 0.2)",
    },

    cardContent: {
      padding: "0px 0px !important",
    },
    badge: {
      float: "right",
      fontWeight: "bold",
      color: theme.palette.type === "dark" ? purple[400] : purple[400],
      background: theme.palette.type === "dark" ? grey[300] : grey[200],
    },
    side_icon: {
      float: "right",
      width: "fit-content",
    },
    icon: {
      color: "red",
    },
    value: {
      lineHeight: 1.15,
      fontFamily: "Quicksand",
      fontWeight: "bolder",
    },
  })
);

const Card = (props: CardProps) => {
  if (!props.title) return null;

  const classes = useStyles();
  const { title, value, footer, svg, style = [], chip } = props;
  return (
    <Grid item>
      <CardComponent className={cx(classes.card, ...style)}>
        <span className={classes.side_icon}>
          {" "}
          {chip ? (
            <Chip
              variant="default"
              size="small"
              label="New"
              className={classes.badge}
            ></Chip>
          ) : (
            svg
          )}
        </span>

        <CardContent className={classes.cardContent}>
          <Typography color="textSecondary" variant="overline" gutterBottom>
            {title}
          </Typography>

          <Typography color="textPrimary" variant="h3">
            <Count
              start={0}
              end={value}
              duration={1.5}
              separator=","
              className={classes.value}
            ></Count>
          </Typography>
          {/* <Typography color="textSecondary" variant="body2">
            {footer}
          </Typography> */}
        </CardContent>
      </CardComponent>
    </Grid>
  );
};

export default Card;
