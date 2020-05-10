import React from "react";
import { Typography } from "@material-ui/core";

const Title = ({ country, date }: { country: string; date: Date }) => {
  return (
    <React.Fragment>
      <Typography
        color="textPrimary"
        variant="h3"
        style={{
          fontFamily: "Quicksand",
          fontWeight: "bold",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {country ? country : "Global"}
      </Typography>
      <Typography
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        color="textSecondary"
        variant="overline"
      >
        last updated on{" "}
        {date.getDate().toString().length === 1
          ? "0" + date.getDate()
          : date.getDate()}
        /
        {date.getMonth().toString().length === 1
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1}
        /{date.getFullYear()}
      </Typography>
    </React.Fragment>
  );
};

export default Title;
