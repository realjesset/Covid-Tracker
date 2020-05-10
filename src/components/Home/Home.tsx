import React, { Component } from "react";
import {
  TextField,
  Grid,
  Switch,
  withStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Autocomplete, Alert } from "@material-ui/lab";

import { deathsIcon, activeIcon, recoveredIcon, casesIcon } from "../../assets";

import { fetchData, getCountries } from "../../api";
import { SimplifiedDailyData } from "../../api/API";
import { DataCards, Header, Footer } from "..";
import { Error, Search } from "../@common";
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

class Home extends Component<RouteComponentProps> {
  state = {
    data: {} as SimplifiedDailyData,
    countries: [{}] as [
      { name: string; iso2: string; iso3: string; flag: string }
    ],
    errors: [] as string[],
    loading: true,
  };

  async componentDidMount() {
    this.handleData();
  }

  handleData = async (country = this.props.match.params["country"]) => {
    const { data, error } = await fetchData(country);
    const countries = getCountries();
    if (error) {
      const errors = this.state.errors;
      errors.push(error);
      this.setState({ errors });
    }
    this.setState({ data, countries, loading: false });
  };

  handleCountry = (value) => {
    if (!value) return;
    this.props.history.push("/" + value.name);
    this.setState({ loading: true });
    this.handleData(value.name);
  };

  render() {
    const { data, countries, errors, loading } = this.state;
    if (errors.length >= 1) return <Error errors={errors} />;
    return (
      <React.Fragment>
        <Header></Header>
        <Grid justify="center" container alignItems="center">
          {loading ? null : (
            <Search
              styles={[styles.search]}
              countries={countries}
              onCountryChange={this.handleCountry}
            />
          )}
        </Grid>
        <DataCards data={data} loading={loading}></DataCards>
        {loading ? null : <Footer></Footer>}
      </React.Fragment>
    );
  }
}

export default Home;
