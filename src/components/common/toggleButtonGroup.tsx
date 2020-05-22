import React from "react";

import clsx from "clsx";
import { makeStyles, Paper } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonProps,
} from "@material-ui/lab";

interface Props<T extends string> {
  buttons: Array<T>;
  value: string;
  buttonProps?: { [key in T]: ToggleButtonProps } | {};
  onChange: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: string | any
  ) => void;
  styles?: string;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    grouped: {
      margin: theme.spacing(0.5),
      border: "none",
    },
    paper: {
      display: "flex",
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 10,
      flexWrap: "wrap",
    },
    "&.MuiToggleButton-root": {
      border: "none",
      height: "40px",
      "&:not(:first-child)": {
        marginLeft: theme.spacing(0.5),
        borderRadius: 5,
      },
      "&:first-child": {
        borderRadius: 5,
      },
    },
  })
);

const RenderToggleButtons = <T extends string>({
  buttons,
  value,
  buttonProps = {},
  onChange,
  styles,
}: Props<T>) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.paper}>
      <ToggleButtonGroup
        className={clsx(classes.grouped, styles)}
        size="medium"
        value={value}
        exclusive
        onChange={(event, value) => onChange(event, value)}
      >
        {buttons.map((title) => (
          <ToggleButton
            className={classes["&.MuiToggleButton-root"]}
            value={title}
            key={title}
            {...buttonProps[title as keyof typeof buttonProps]}
          >
            {title}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Paper>
  );
};

export default RenderToggleButtons;
