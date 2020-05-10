/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";

import {
  Grid,
  Typography,
  Button,
  Switch,
  createStyles,
  makeStyles,
  Icon,
} from "@material-ui/core";
import { BrightnessHigh, NightsStay, FavoriteSharp } from "@material-ui/icons";
import { heartIcon } from "../../assets";
import styles from "./Footer.module.scss";
import { ThemeContext } from "../../Theme/ThemeProvider";

const useStyles = makeStyles((theme) =>
  createStyles({
    themeBtn: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const Footer = (props) => {
  const { currentTheme, setTheme } = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid className={styles.container} container justify="center" spacing={2}>
        <Grid item sm={12} xs={12}>
          <Icon
            onClick={() =>
              setTheme(
                currentTheme === "lightTheme" ? "darkTheme" : "lightTheme"
              )
            }
          >
            {currentTheme === "lightTheme" ? (
              <BrightnessHigh />
            ) : (
              <NightsStay />
            )}
          </Icon>
          {/* <Button
            className={classes.themeBtn}
            variant="contained"
            startIcon={
              currentTheme === "lightTheme" ? (
                <BrightnessHigh />
              ) : (
                <NightsStay />
              )
            }
            onClick={() =>
              setTheme(
                currentTheme === "lightTheme" ? "darkTheme" : "lightTheme"
              )
            }
          ></Button> */}
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
