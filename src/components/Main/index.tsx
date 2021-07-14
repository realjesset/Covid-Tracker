import React from "react";
import styles from "./main.module.scss";

import {
  Header,
  CountryHeader,
  InfoCards,
  Footer,
  Search,
  CountryCharts,
} from "..";
import { RenderErrorBox } from "../common";

import { Country, APICountry, fetchData } from "../../api";
import { RouteComponentProps } from "react-router-dom";

interface State {
  data?: APICountry;
  errors: string[];
  loading: boolean;
}

class Main extends React.Component<
  RouteComponentProps<{ country?: string }>,
  State
> {
  state = {
    data: {} as APICountry,
    errors: [] as string[],
    loading: true,
  };

  componentDidMount() {
    this.handleData();
  }

  async handleData(country?: string) {
    const { data, error } = await fetchData(
      country || this.props.match.params.country || "global"
    );
    if (error && !data) {
      const errors = [...this.state.errors];
      errors.push(error);
      this.setState({ errors });
    }
    // update state with new data
    await this.setState({ data, loading: false });
  }

  handleCountry = (value: Country | null) => {
    if (!value) return null;
    this.props.history.push(
      `/${value.name.toLowerCase() === "global" ? "" : value.name}`
    );
    this.setState({ loading: true });
    // get data for the country
    this.handleData(value.name);
  };

  render() {
    const { data, errors, loading } = this.state;
    const {country, updated, countryInfo} = data
    // check for errors
    if (errors.length >= 1) return <RenderErrorBox errors={errors} />;
    return (
      <>
        <div className={styles.span}>
          <Header />
          {loading ? (
            <InfoCards data={data} loading={loading} />
          ) : (
            <>
              <Search onCountryChange={this.handleCountry} />
              <CountryHeader
                name={country || "Global"}
                date={updated}
                flag={countryInfo && countryInfo.flag}
              />
              <InfoCards data={data} loading={loading} />
              <CountryCharts country={country || "Global"} />
              <Footer />
            </>
          )}
        </div>
      </>
    );
  }
}

export default Main;
