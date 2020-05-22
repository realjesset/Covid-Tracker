import React from 'react';

import { APICountry as CountryData } from '../../api';
import { casesIcon, activeIcon, recoveredIcon, deathsIcon } from '../../assets';

import millify from 'millify';
import { Grid } from '@material-ui/core';
import { RenderBigCard } from '../common';

interface CSS {
  [key: string]: string;
}

interface CardData {
  active: React.ComponentProps<typeof RenderBigCard>;
  cases: React.ComponentProps<typeof RenderBigCard>;
  deaths: React.ComponentProps<typeof RenderBigCard>;
  recovered: React.ComponentProps<typeof RenderBigCard>;
  todayCases: React.ComponentProps<typeof RenderBigCard>;
  todayDeaths: React.ComponentProps<typeof RenderBigCard>;
}

export const renderCards = (data: CountryData, styles: CSS): JSX.Element[] => {
  const cardData: CardData = renderData(data);
  return Object.entries(cardData).map(value => {
    return (
      <Grid key={value[0]} item xs={12} sm={6} className={styles.cardgrid} style={{ marginBottom: '10px' }}>
        <RenderBigCard {...value[1]} key={value[0]} style={[styles[value[0]]] || null} />
      </Grid>
    );
  });
};

function renderData(data: CountryData) {
  const array: Array<keyof CardData> = ['todayCases', 'todayDeaths', 'active', 'cases', 'deaths', 'recovered'];
  const reference: { [key in keyof CardData]: [string, string | undefined, boolean, JSX.Element | string] } = {
    todayCases: ['New Cases', undefined, true, getFooter(data.todayCases, 'newCases', data.yesterdayCases)],
    todayDeaths: ['New Deaths', undefined, true, getFooter(data.todayDeaths, 'newDeaths', data.yesterdayDeaths)],
    active: ['Active Cases', activeIcon, false, getFooter(data.active, 'activeCases')],
    cases: ['Cases', casesIcon, false, getFooter(data.cases, 'totalCases')],
    deaths: ['Deaths', deathsIcon, false, getFooter(data.deaths, 'totalDeaths')],
    recovered: ['Recovered', recoveredIcon, false, getFooter(data.recovered, 'totalRecovered')]
  };
  const cardData = {} as CardData;
  array.map(
    element =>
      (cardData[element] = {
        title: reference[element][0],
        value: data[element],
        footer: reference[element][3],
        icon: <img src={reference[element][1]} alt={reference[element][0].split(' ').join('-')}></img>,
        badge: reference[element][2]
      })
  );
  return cardData;
}

function getFooter(newData: number | null, name: string, oldData?: number | null): string | JSX.Element {
  let footer: JSX.Element | string = '';

  // percentage
  // const percentage = oldData && newData ? Math.round(((newData - oldData) / newData) * 100) : 0;

  // let percentageLabel: JSX.Element | null =
  //   oldData && percentage !== 0 ? (
  //     <span style={{ display: 'inline-block', maxWidth: '50%' }}>
  //       <FooterBadge
  //         label={percentage > 0 ? Math.abs(percentage) + '% increase' : Math.abs(percentage) + '% decrease'}
  //       />{' '}
  //       from yesterday ({millify(oldData, { lowerCase: true })}){' '}
  //     </span>
  //   ) : null;

  switch (name) {
    case 'newCases':
      if (!newData) return (footer = 'No new cases recorded today');
      else if (oldData)
        return (footer = `New cases recorded today - (${millify(oldData, { lowerCase: true })} cases yesterday)`);
      break;
    case 'newDeaths':
      if (!newData) return (footer = 'No new deaths recorded today');
      else if (oldData)
        return (footer = `New deaths recorded today - (${millify(oldData, { lowerCase: true })} deaths yesterday)`);
      break;
    case 'totalCases':
      footer = 'Total confirmed cases';
      break;
    case 'activeCases':
      footer = 'On-going COVID-19 cases';
      break;
    case 'totalRecovered':
      footer = 'Total number of patients recovered';
      break;
    case 'totalDeaths':
      footer = 'Deaths caused through COVID-19';
      break;

    default:
      break;
  }

  return footer;
}

// const FooterBadge: React.FC<{ label: string; [key: string]: any }> = ({ label, ...params }) => {
//   const theme = useTheme();
//   const type = theme.palette.type;
//   const backgroundColor = label.match('increase') ? theme.palette.error[type] : theme.palette.success[type];
//   console.log(backgroundColor);
//   return (
//     <p
//       // label={label}
//       style={{
//         // borderRadius: '5px',
//         color: backgroundColor,
//         display: 'inline-block',
//         margin: 0,
//         fontWeight: 'bolder'
//         // backgroundColor: backgroundColor,
//         // height: 'fit-content',
//         // width: 'fit-content',
//         // padding: '0px 0px'
//       }}
//       {...params}
//     >
//       {label}
//     </p>
//   );
// };
