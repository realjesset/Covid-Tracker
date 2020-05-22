/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Card, Chip, CardContent, Typography, makeStyles, createStyles } from '@material-ui/core';
import { grey, deepPurple } from '@material-ui/core/colors';
import clsx from 'clsx';
import Count from 'react-countup';

type CardProps = {
  title: string;
  value: number | null;
  footer?: string | JSX.Element;
  icon?: string | JSX.Element;
  style?: string;
  badge?: boolean;
};

const useStyles = makeStyles(theme =>
  createStyles({
    title: {
      fontWeight: 'bold'
    },
    card: {
      padding: '20px 20px',
      margin: '0 5%',
      marginTop: '10px',
      borderRadius: '10px',
      boxShadow: '0 0px 20px 0.2px rgba(0, 0, 0, 0.2)'
    },

    cardContent: {
      padding: '0px 0px !important'
    },
    badge: {
      float: 'right',
      fontWeight: 'bold',
      color: theme.palette.type === 'dark' ? deepPurple[400] : deepPurple[300],
      background: theme.palette.type === 'dark' ? grey[400] : grey[200]
    },
    side_icon: {
      float: 'right',
      width: 'fit-content'
    },
    icon: {
      color: 'red'
    },
    value: {
      lineHeight: 1.15,
      fontFamily: 'Quicksand, sans-serif !important',
      fontWeight: 700
    }
  })
);

const RenderBigCard = (props: CardProps) => {
  if (!props.title) return null;

  const classes = useStyles();

  const { title, value, footer, icon, style, badge } = props;
  return (
    <Card className={clsx(style, classes.card)}>
      <span className={classes.side_icon}>
        {' '}
        {badge ? <Chip variant="default" size="small" label="TODAY" className={classes.badge}></Chip> : icon}
      </span>
      <CardContent className={classes.cardContent}>
        <Typography color="textSecondary" variant="overline" gutterBottom className={clsx('title', classes.title)}>
          {title}
        </Typography>
        <Typography
          className="value"
          color="textPrimary"
          variant="h3"
          style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700 }}
        >
          {value === null ? (
            'N/A'
          ) : (
            <Count
              start={0}
              end={value}
              duration={(value.toString().length * 10 + parseInt(value.toString()[0])) / 12}
              separator=","
              className={classes.value}
            ></Count>
          )}
        </Typography>
        <Typography className="footer" color="textSecondary" variant="caption">
          {footer}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RenderBigCard;
