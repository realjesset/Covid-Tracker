/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import styles from "./footer.module.scss";

import { ThemeContext } from "../../contexts/";

import { Grid, Icon } from "@material-ui/core";
import { BrightnessHigh, NightsStay, FavoriteSharp } from "@material-ui/icons";

const Footer = () => {
  const { currentTheme, setTheme } = useContext(ThemeContext);

  return (
    <React.Fragment>
      <Grid className={styles.container} container justify="center" spacing={1}>
        <Grid item sm={12} xs={12}>
          <Icon
            onClick={() =>
              setTheme(
                currentTheme === "lightTheme" ? "darkTheme" : "lightTheme"
              )
            }
          >
            {currentTheme === "lightTheme" ? (
              <NightsStay />
            ) : (
              <BrightnessHigh />
            )}
          </Icon>
        </Grid>
        <Grid item sm={12} xs={12}>
          made with ♥ by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/GliderCodes/Covid-Tracker"
          >
            Glider
          </a>
        </Grid>
        <Grid item className={styles.Data} sm={12} xs={12}>
          Data from{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.worldometers.info/coronavirus"
          >
            WorldOMeter
          </a>{" "}
          and{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://coronavirus.jhu.edu/us-map"
          >
            JHUCSSE
          </a>
        </Grid>
        <Grid container item sm={12} xs={12} spacing={1}>
          <Grid item sm={12} xs={12}>
            Stay Home, Stay Safe
          </Grid>
          <Grid item sm={12} xs={12}>
            <Icon color="primary">
              <FavoriteSharp />
            </Icon>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Footer;
