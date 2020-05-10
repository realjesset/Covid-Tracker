/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";

import { Grid, Typography, Button, Switch, Container } from "@material-ui/core";
import styles from "./Footer.module.scss";
import { ThemeContext } from "../../Theme/ThemeProvider";

const Footer = (props) => {
  const { currentTheme, setTheme } = useContext(ThemeContext);
  console.log(currentTheme);
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
        <Grid item sm={12} xs={12}>
          <Button
            variant="contained"
            onClick={() =>
              setTheme(
                currentTheme === "lightTheme" ? "darkTheme" : "lightTheme"
              )
            }
          >
            Dark Mode
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Footer;
