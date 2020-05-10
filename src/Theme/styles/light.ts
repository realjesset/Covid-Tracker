import { createMuiTheme } from "@material-ui/core";

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#b39ddb",
      main: "#B39DDB",
      dark: "#9575CD",
    },
    secondary: {
      main: "#BAB7B7",
    },
    background: {
      default: "#fafafa",
      paper: "#fff",
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
