import { put, takeEvery, all, call, take } from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";

import { getPosts, createPost } from "../../shared-lib/getPosts";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* helloSaga() {
  const postsChannel = eventChannel((emitter) => {
    const { fetchPosts } = getPosts({
      onGlobalUpdate: () => {
        fetchPosts().then((data) => emitter(data));
      },
    });
    fetchPosts().then((data) => emitter(data));
    return () => {
      // cleanup
    };
  });
  while (true) {
    const data = yield take(postsChannel);
    console.log("emitted", data);
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
}
