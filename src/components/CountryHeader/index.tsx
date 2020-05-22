/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from './countryHeader.module.scss';

import { RenderTitle, RenderDate } from '../common';

import { Grid, Typography } from '@material-ui/core';
import moment from 'moment';

interface Props {
  name: string;
  flag?: string;
  date: string | Date | number;
}

const CountryHeader: React.FC<Props> = ({ name, date, flag = null }) => {
  return (
    <React.Fragment>
      <Grid container className={styles.container} spacing={0}>
        <Grid item className={styles.titleContainer} xs={12} sm={12}>
          {flag ? (
            <img
              className={name.toLowerCase() === 'global' ? styles['flag-global'] : styles['flag']}
              alt={'flag'}
              src={flag}
            ></img>
          ) : null}{' '}
          <span>
            <RenderTitle title={name} styles={false} />
          </span>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography className={styles.date} variant="overline" style={{ fontSize: '0.5rem !important' }}>
            Last updated <RenderDate date={moment(date).fromNow()} styles={false} />
          </Typography>
        </Grid>
        {/* <Grid item className={styles.moreDetailsContainer} xs={12} sm={12}>
          <a className={styles.moreDetailsPC}>click for more details</a>
          <NavigateNext className={styles.moreDetailsMBL} />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
};

export default CountryHeader;
