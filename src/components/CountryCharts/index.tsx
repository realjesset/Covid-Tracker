/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from './countryCharts.module.scss';

import { RenderChart, RenderToggleButtons } from '../common';
import { fetchHistoryAll, APIHistoricalRegion, fetchHistory } from '../../api';

import { Grid } from '@material-ui/core';
import { ToggleButtonProps } from '@material-ui/lab';
import clsx from 'clsx';

type GraphView = 'All' | 'Cases' | 'Deaths' | 'Recovered';
type GraphType = 'Linear' | 'Logarithmic' | 'Daily';

interface Props {
  country: string;
}

interface State {
  all: APIHistoricalRegion;
  daily: APIHistoricalRegion;
  errors: string[];
  graphType: GraphType;
  graphView: GraphView;
}

class CountryCharts extends React.Component<Props, State> {
  state = {
    all: {} as APIHistoricalRegion,
    daily: {} as APIHistoricalRegion,
    errors: [] as string[],
    graphType: 'Linear' as GraphType,
    graphView: 'All' as GraphView
  };

  componentDidMount() {
    this.handleData();
  }

  async handleData() {
    const country = this.props.country;
    const { data, error } = country.toLowerCase() === 'global' ? await fetchHistoryAll() : await fetchHistory(country);
    let errors = [...this.state.errors];
    if (error) errors.push(error);

    return data && errors.length === 0
      ? this.setState({ all: data.all, daily: data.daily })
      : this.setState({ errors: errors });
  }

  handleChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: any): void => {
    if (!value) return this.setState({ errors: [...this.state.errors, 'something went wrong...'] });
    if (value === 'All' || value === 'Cases' || value === 'Deaths' || value === 'Recovered')
      return value === 'All' && (this.state.graphType === 'Logarithmic' || this.state.graphType === 'Linear')
        ? this.setState({ graphView: value })
        : value === 'All'
        ? this.setState({ graphView: value, graphType: 'Linear' })
        : this.setState({ graphView: value });
    if (value === 'Linear' || value === 'Logarithmic' || value === 'Daily') return this.setState({ graphType: value });
  };

  render() {
    const { all, daily, errors, graphView, graphType } = this.state;
    let buttonProps: { [key: string]: ToggleButtonProps } = {};
    if (graphView === 'All') {
      buttonProps = { Daily: { disabled: true } };
    }
    return (
      <React.Fragment>
        <Grid container className={clsx(styles.gridContainer)} spacing={0} justify="center">
          <Grid item className={styles.titleContainer} xs={12} sm={6} justify="center" alignContent="center">
            <h1 style={{ fontFamily: 'Cairo, sans-serif !important', fontSize: '2rem' }}>Data Chart</h1>
          </Grid>
          <Grid container item xs={12} sm={6}>
            <Grid container item className={styles.btnContainer} justify="flex-end" xs={12} sm={12}>
              <RenderToggleButtons
                buttons={['All', 'Cases', 'Deaths', 'Recovered']}
                value={graphView}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid container item className={styles.btnContainer} justify="flex-end" xs={12} sm={12}>
              <RenderToggleButtons
                buttons={['Linear', 'Logarithmic', 'Daily']}
                value={graphType}
                onChange={this.handleChange}
                buttonProps={buttonProps}
              />
            </Grid>
          </Grid>
          <Grid item className={styles.chartContainer} xs={12} sm={12}>
            <RenderChart
              type={graphType === 'Linear' || graphType === 'Logarithmic' ? 'line' : 'bar'}
              linearLog={graphType === 'Logarithmic' ? 'logarithmic' : 'linear'}
              label={graphView}
              all={all}
              daily={daily}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default CountryCharts;
