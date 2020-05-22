import React from 'react';
import styles from './homeCards.module.scss';

import { RenderLoading } from '../common';
import { renderCards } from './render';
import { APICountry } from '../../api';

import { Grid } from '@material-ui/core';

interface Props {
  data: APICountry;
  loading: boolean;
}

const InfoCards: React.FC<Props> = props => {
  const { data, loading } = props;
  if (loading) return <RenderLoading />;
  return (
    <React.Fragment>
      <Grid className={styles.container} container>
        {renderCards(data, styles)}
      </Grid>
    </React.Fragment>
  );
};

export default InfoCards;
