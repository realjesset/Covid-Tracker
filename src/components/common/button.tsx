import React from "react";

import clsx from "clsx";
import {
  Button,
  makeStyles,
  createStyles,
  ButtonProps,
} from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      background: theme.palette.background.paper,
      textTransform: "none",
      fontWeight: "bold",
      borderRadius: "8px",
      transition: "ease-in-out all 0.5s",
      "&:hover": {
        transform: "scale(1.1)",
        transition: "ease-in-out all 0.5s",
        backgroundColor: theme.palette.primary.main,
      },
    },
  })
);

interface Props extends ButtonProps {
  styles?: string;
}

const RenderButton: React.FunctionComponent<Props> = ({
  children,
  styles,
  ...params
}) => {
  const classes = useStyles();
  return (
    <Button className={clsx(classes.button, styles)} {...params}>
      {children}
    </Button>
  );
};

export default RenderButton;
