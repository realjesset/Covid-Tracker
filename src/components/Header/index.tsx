import React from "react";
import styles from "./header.module.scss";

import { logo } from "../../assets";
import { RenderButton, RenderNotificaion } from "../common";

import { LocalCafeOutlined } from "@material-ui/icons";
import { Grid, Typography, Link } from "@material-ui/core";

const Header: React.FC = (props) => {
  return (
    <React.Fragment>
      <RenderNotificaion message="Cool amazing feature" />
      <Grid container className={styles.container} spacing={0}>
        <Grid item className={styles.titleContainer} xs={12} sm={6}>
          <Typography className={styles.title} variant="h4">
            <img src={logo} alt="logo" className={styles.logo} />
            COVID-19 Tracker
          </Typography>
        </Grid>
        <Grid item className={styles.btnContainer} sm={6}>
          <Link
            href="https://ko-fi.com/glider"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RenderButton variant="outlined" startIcon={<LocalCafeOutlined />}>
              <span>Buy me a coffee</span>
            </RenderButton>
          </Link>
        </Grid>
        <Grid item className={styles.subtitleContainer} xs={12} sm={12}>
          <Typography className={styles.subtitle} variant="body1">
            Track Coronavirus COVID-19 outbreak
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Header;
