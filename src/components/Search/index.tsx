import React from 'react';

import styles from './search.module.scss';
import { Country, getCountries } from '../../api';

import { Autocomplete, FilterOptionsState } from '@material-ui/lab';
import { TextField, Grid, withStyles, createStyles } from '@material-ui/core';

const CustomTextField = withStyles(theme =>
  createStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderRadius: `20px`,
          color: theme.palette.primary.main
        }
      }
    }
  })
)(TextField);

interface Props {
  onCountryChange: Function;
}

function filterOptions(options: Country[], state: FilterOptionsState<Country>) {
  return options.filter(
    option =>
      (option.iso2 && option.iso2.toLowerCase().match(state.inputValue && state.inputValue.toLowerCase())) ||
      (option.iso3 && option.iso3.toLowerCase().match(state.inputValue && state.inputValue.toLowerCase())) ||
      option.name.toLowerCase().match(state.inputValue && state.inputValue.toLowerCase())
  );
}

function optionRenderer(option: Country) {
  return (
    <Grid
      key={option.iso2}
      container
      spacing={2}
      alignItems="center"
      style={{
        textAlign: 'center'
      }}
    >
      <Grid item>
        <img
          src={option.flag}
          alt={option.name}
          style={{
            width: 32,
            height: option.name === 'Global' ? 32 : 20,
            verticalAlign: 'middle'
          }}
        />
      </Grid>
      <Grid item>{`${option.name} ${option.iso2 || option.iso3 ? `(${option.iso2 || option.iso3})` : ''}`}</Grid>
    </Grid>
  );
}

const Search = ({ onCountryChange }: Props) => {
  return (
    <React.Fragment>
      <Grid container item className={styles.container} xs={12} sm={12} justify="center">
        <Autocomplete
          fullWidth
          options={getCountries()}
          autoHighlight
          onChange={(event: any, value: Country | null) => onCountryChange(value)}
          openOnFocus
          getOptionLabel={option => option.name}
          clearOnEscape
          filterOptions={(options, state) => filterOptions(options, state)}
          renderOption={option => optionRenderer(option)}
          renderInput={params => (
            <CustomTextField
              {...params}
              label="Search"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password' // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Grid>
    </React.Fragment>
  );
};

export default Search;
