import React, { Component } from "react";

// ---- Components ----
import { DataCards, Chart, CountryPicker, NavBar } from "./components";
// ---- Common Components ----
// import { ThemeButton } from "./components/@common";
// ---- Contexts ----
// import ThemeContextProvider from "./contexts/ThemeContext";
// ---- Style ----
import styles from "./App.modules.scss";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
// ---- Dependencies ----
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { fetchDailyData } from "./api";
import { DailyData, SimpleDailyData } from "./typings/API";

class App extends Component {
  state = {
    data: {} as SimpleDailyData,
    countries: [],
  };

  async componentDidMount() {
    const data = await fetchDailyData();
    this.setState({ data });
  }

  handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("woahahhhh");
  };

  render() {
    const theme = createMuiTheme({
      palette: {
        type: "light",
      },
    });

    const { data } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <div className={styles.container}>
          <NavBar />
          <DataCards data={data} />
          <CountryPicker />
          <Chart />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
