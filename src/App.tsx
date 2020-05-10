import React from "react";

// ---- Components ----
import { Home } from "./components";
// ---- Common Components ----
// import { ThemeButton } from "./components/@common";
// ---- Style ----
import styles from "./App.module.scss";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
// ---- Dependencies ----
import { Switch, Route } from "react-router-dom";
import ThemeProvider from "./Theme/ThemeProvider";

// import { SimplifiedDailyData } from "./typings/API";

class App extends React.Component {
  changeTheme = (dark: boolean) => {
    return createMuiTheme({
      palette: {
        type: dark ? "dark" : "light",
        primary: {
          light: "#b39ddb",
          main: "#B39DDB",
          dark: "#7e57c2",
        },
        background: {
          default: dark ? "#000000" : "#fafafa",
          paper: dark ? "#1f1f1f" : "#fff",
        },
      },
      // breakpoints: {
      //   values: {
      //     xs: 890,
      //     sm: 900,
      //     md: 960,
      //     lg: 1280,
      //     xl: 1920,
      //   },
      // },
    });
  };
  render() {
    return (
      <ThemeProvider>
        <div className={styles.container}>
          <CssBaseline />
          <Switch>
            <Route path="/:country" component={Home}></Route>
            <Route exact path="/" component={Home}></Route>
          </Switch>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
