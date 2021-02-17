import { put, takeEvery, all, call, take } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";

import { getPosts, createPost } from "../../shared-lib/getPosts";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// factory to return a channel that emits based on broadcast messages
const createChannel = (fetcher, cacheStrategy, ...args) =>
  eventChannel((emitter) => {
    const { fetch } = fetcher(cacheStrategy, {
      onGlobalUpdate: () => {
        fetch(...args).then((data) => emitter(data));
      },
    });
    fetch(...args).then((data) => emitter(data));
    return () => {
      // cleanup
    };
  });

function* handleMyActionDispatched(action) {
  // get data from action
  const { payload } = action;
  // fetch data from store
  const data = yield select(selectData);
  // fetch and subscribe to posts data passing in args
  const postsChannel = createChannel(getPosts, data, payload);
  // not an infinite loop
  while (true) {
    // everytime the channel emits we take
    const data = yield take(postsChannel);
    // submit the data to store
    yield put({
      type: "posts fetched (saga)",
      payload: data,
    });
  }
}

function* getPostsSaga() {
  return new Promise((res) => {});
}

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);

  yield takeLatest("my action", handleMyActionDispatched);
}
