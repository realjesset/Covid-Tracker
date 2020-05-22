/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Card, CardContent, Typography, makeStyles, createStyles } from '@material-ui/core';
import { grey, deepPurple } from '@material-ui/core/colors';
import cx from 'clsx';

type CardProps = {
  title: string;
  styles?: string;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      // fontSize: "1rem",
      textAlign: 'center',
      fontWeight: 'bold',
    },
    card: {
      padding: '20px 20px',
      margin: '0 5%',
      marginTop: '10px',
      borderRadius: '15px',
      boxShadow: '0 0px 20px 0.2px rgba(0, 0, 0, 0.2)',
    },

    cardContent: {
      padding: '0px 0px !important',
    },
    badge: {
      float: 'right',
      fontWeight: 'bold',
      color: theme.palette.type === 'dark' ? deepPurple[400] : deepPurple[300],
      background: theme.palette.type === 'dark' ? grey[300] : grey[200],
    },
    side_icon: {
      float: 'right',
      width: 'fit-content',
    },
    icon: {
      color: 'red',
    },
    value: {
      lineHeight: 1.15,
      fontFamily: 'Quicksand, sans-serif !important',
      fontWeight: 700,
    },
  })
);

const RenderCard: React.FC<CardProps> = ({ title, styles, children }) => {
  if (!title) return null;

  const classes = useStyles();
  return (
    <Card className={cx(classes.card, styles)}>
      <CardContent className={classes.cardContent}>
        <Typography color="textSecondary" variant="h3" gutterBottom className={cx('title', classes.title)}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default RenderCard;
