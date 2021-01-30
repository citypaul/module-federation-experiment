import React from "react";
import MarketingApp from "./components/MarketingApp";

import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={MarketingApp} />
          </Switch>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};
