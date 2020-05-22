import React from "react";

import { Main } from "./components";
import ThemeProvider from "./contexts/Theme/ThemeProvider";

import { CssBaseline } from "@material-ui/core";
import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  productionPrefix: "Tracker",
  seed: "c",
});
class App extends React.Component {
  render() {
    return (
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider>
          <CssBaseline />
          <Router>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/:country" component={Main} />
            </Switch>
          </Router>
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

export default App;
