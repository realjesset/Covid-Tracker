import { createMuiTheme } from "@material-ui/core";

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#7e57c2",
      dark: "#7e57c2",
    },
    secondary: {
      main: "#BAB7B7",
    },
    background: {
      default: "#000000",
      paper: "#1f1f1f",
    },
  },
  breakpoints: {
    values: {
      xs: 890,
      sm: 900,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
