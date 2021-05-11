import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/App";
import Success from "./components/Success";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/Success" component={Success} />
    </Switch>
  </BrowserRouter>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<Routes />, rootElement);
