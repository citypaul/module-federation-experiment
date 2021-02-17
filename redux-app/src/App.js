import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import Counter from "./components/Counter";
import reducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const action = (type) => store.dispatch({ type });

export default () => {
  return (
    <div>
      <Provider store={store}>
        <Counter
          onIncrementAsync={() => action("INCREMENT_ASYNC")}
          onIncrement={() => action("INCREMENT")}
          onDecrement={() => action("DECREMENT")}
        />
      </Provider>
    </div>
  );
};
