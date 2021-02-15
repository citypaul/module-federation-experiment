import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const bc = new BroadcastChannel("test_channel");

bc.onmessage = (ev) => {
  console.log("container received message:", ev);
};

ReactDOM.render(<App />, document.querySelector("#root"));
