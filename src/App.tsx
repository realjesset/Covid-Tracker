import React from "react";

// ---- Components ----
import { Home } from "./components";
// ---- Common Components ----
// import { ThemeButton } from "./components/@common";
// ---- Style ----
import styles from "./App.module.scss";
import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
// ---- Dependencies ----
import { Switch, Route } from "react-router-dom";

// import { SimplifiedDailyData } from "./typings/API";

class App extends React.Component {
  changeTheme = (dark: boolean) => {
    return createMuiTheme({
      palette: {
        type: dark ? "dark" : "light",
        background: {
          default: dark ? "#000000" : "#fafafa",
          paper: dark ? "#1f1f1f" : "#fff",
        },
      },
      breakpoints: {
        values: {
          xs: 890,
          sm: 900,
          md: 960,
          lg: 1280,
          xl: 1920,
        },
      },
    });
  };
  render() {
    return (
      <ThemeProvider theme={this.changeTheme(true)}>
        <div className={styles.container}>
          <CssBaseline />
          <Switch>
            <Route path="/:country">adwa</Route>
            <Route exact path="/" component={Home}></Route>
          </Switch>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
