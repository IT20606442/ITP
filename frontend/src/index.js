import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { BrowserRouter } from "react-router-dom";

import { composeWithDevTools } from "redux-devtools-extension";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/custom.css";

import App from "App";

import reducers from "./reducers";

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
