import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import Counter from "./components/Counter";
import reducer from "./reducers";

const store = createStore(reducer);

const action = (type) => store.dispatch({ type });

export default () => {
  return (
    <div>
      <Provider store={store}>
        <Counter
          onIncrement={() => action("INCREMENT")}
          onDecrement={() => action("DECREMENT")}
        />
      </Provider>
    </div>
  );
};
