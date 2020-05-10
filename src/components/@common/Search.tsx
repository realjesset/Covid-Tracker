import React from "react";
import cx from "classnames";

import { TextField, Grid, withStyles } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const CustomTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `50px`,
        color: "#B39DDB",
      },
    },
  },
})(TextField);

interface Props {
  countries: [{ name: string; iso2: string; iso3: string; flag: string }];
  onCountryChange: Function;
  styles?: string[];
}

const Search = ({ countries, onCountryChange, styles = [] }: Props) => {
  return (
    <Autocomplete
      className={cx(...styles)}
      fullWidth
      options={countries}
      autoHighlight
      onChange={(event, value) => onCountryChange(value)}
      openOnFocus
      getOptionLabel={(option) => option.name}
      clearOnEscape
      filterOptions={(options, state) => {
        return options.filter(
          (option) =>
            (option.iso2 &&
              option.iso2.toLowerCase().match(state.inputValue)) ||
            (option.iso3 &&
              option.iso3.toLowerCase().match(state.inputValue)) ||
            option.name.toLowerCase().match(state.inputValue)
        );
      }}
      renderOption={(option) => (
        <Grid
          key={option.iso2}
          container
          spacing={2}
          alignItems="center"
          // style={{ backgroundColor: "black" }}
        >
          <Grid
            item
            // style={{
            //   borderRightWidth: 1,
            //   paddingBottom: 0,
            //   borderRightColor: "#B39DDB",
            //   borderRightStyle: "solid",
            // }}
            alignItems="center"
          >
            <img
              style={{
                width: "32px",
                height: "20px",
              }}
              src={option.flag}
              alt={option.iso2}
            />
          </Grid>
          <Grid item>{`${option.name} (${option.iso2 || option.iso3})`}</Grid>
        </Grid>
      )}
      renderInput={(params) => (
        <Grid sm={12} xs={12}>
          <CustomTextField
            {...params}
            label="Search"
            variant="outlined"
            style={{ borderColor: "#B39DDB !important" }}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        </Grid>
      )}
    />
  );
};

export default Search;
