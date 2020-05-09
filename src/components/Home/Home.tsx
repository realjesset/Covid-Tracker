import React, { Component } from "react";
import { TextField, Grid, Switch, withStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { deathsIcon, activeIcon, recoveredIcon, casesIcon } from "../../assets";

import { fetchGlobalData, getCountries } from "../../api";
import { SimplifiedDailyData } from "../../api/API";
import { DataCards } from "..";
import { RouteComponentProps } from "react-router-dom";

import styles from "./Home.module.scss";

const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `50px`,
      },
    },
  },
})(TextField);

interface Props {}
interface State {}

class Home extends Component<RouteComponentProps, State> {
  state = {
    data: {} as SimplifiedDailyData,
    countries: [{}] as [
      { name: string; code: string; iso3: string; flag: string }
    ],
  };

  componentDidMount() {
    const fetchAPI = async () => {
      const data = await fetchGlobalData();
      const countries = getCountries();
      return { data, countries };
    };

    const fetchedData = fetchAPI();
    fetchedData.then((res) => {
      if (res.data && res.countries)
        this.setState({ data: res.data, countries: res.countries });
    });
  }

  handleCountry = (value) => {
    if (!value) return;
    console.log(this.props.history.push("/" + value.name));
  };

  render() {
    const { data, countries } = this.state;
    return (
      <React.Fragment>
        <Switch></Switch>
        {/* max width by query for this -> */}
        <Grid justify="center" container xs={12} sm={6} alignItems="center">
          <Autocomplete
            fullWidth
            options={countries}
            autoHighlight
            onChange={(event, value) => this.handleCountry(value)}
            openOnFocus
            getOptionLabel={(option) => option.name}
            renderOption={(option) => (
              <React.Fragment>
                <Grid container spacing={2}>
                  <Grid item>
                    <img
                      style={{ width: "32px", height: "20px" }}
                      src={option.flag}
                      alt={option.code}
                    />
                  </Grid>
                  <Grid item>{option.name}</Grid>
                </Grid>
              </React.Fragment>
            )}
            renderInput={(params) => (
              <Grid sm={12} xs={12}>
                <CustomTextField
                  {...params}
                  label="Pick a country"
                  color="primary"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              </Grid>
            )}
          />
        </Grid>
        <DataCards
          country={data.country || "Global"}
          date={data.updated}
          data={{
            todayCases: {
              title: "Cases",
              value: data.todayCases,
              footer: "New confirmed cases of COVID-19",
              badge: true,
            },
            todayDeaths: {
              title: "Deaths",
              value: data.todayDeaths,
              footer: "New Deaths that have occured by COVID-19",
              badge: true,
            },
            active: {
              title: "Active Cases",
              value: data.active,
              footer: "On-going COVID-19 cases",
              svg: <img src={activeIcon} alt="active"></img>,
            },
            cases: {
              title: "Cases",
              value: data.cases,
              footer: "Total confirmed cases",
              svg: <img src={casesIcon} alt="cases"></img>,
            },
            recovered: {
              title: "Recovered",
              value: data.recovered,
              footer: "Patients Recovered from COVID-19",
              svg: <img src={recoveredIcon} alt="recovered"></img>,
            },
            deaths: {
              title: "Deaths",
              value: data.deaths,
              footer: "Deaths caused by COVID-19",
              svg: <img src={deathsIcon} alt="deaths"></img>,
            },
          }}
        ></DataCards>
      </React.Fragment>
    );
  }
}

export default Home;
