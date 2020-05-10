import React from "react";

import { Grid, Typography } from "@material-ui/core";
import styles from "./Header.module.scss";
import { logo } from "../../assets";

const Header = (props) => {
  return (
    <React.Fragment>
      <Grid className={styles.container} container justify="center" spacing={0}>
        <Grid item sm={12}>
          <Typography className={styles.title} variant="h4">
            <img
              src={logo}
              alt="idk"
              style={{
                width: 45,
                height: 45,
                float: "inherit",
                verticalAlign: "top",
              }}
            />
            COVID-19 Tracker
            <br></br>
          </Typography>
          <Typography className={styles.subtitle} variant="body1">
            Track Coronavirus COVID-19 outbreak
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
