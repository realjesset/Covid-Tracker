import React, { Component } from "react";

import { Grid, Typography, Button, Switch, Container } from "@material-ui/core";
import styles from "./Header.module.scss";

const Header = (props) => {
  return (
    <React.Fragment>
      <Grid
        className={styles.container}
        container
        justify="center"
        sm={12}
        xs={12}
        spacing={0}
      >
        <Grid item sm={12}>
          <Typography className={styles.title} variant="h4">
            <span role="img">🦠</span> COVID-19 Tracker
            <br></br>
            <Typography className={styles.subtitle} variant="body1">
              Track Coronavirus COVID-19 outbreak
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
