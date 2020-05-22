import React from "react";

import { Main } from "./components";
import ThemeProvider from "./contexts/Theme/ThemeProvider";

import { CssBaseline } from "@material-ui/core";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/:country" component={Main} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
