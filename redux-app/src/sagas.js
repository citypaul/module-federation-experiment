import { put, takeEvery, all, call } from "redux-saga/effects";
import { getPosts, createPost } from "../../shared-lib/getPosts";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* helloSaga() {
  const { fetchPosts } = getPosts({
    onGlobalUpdate: () => {
      console.log("on global update inside redux saga");
    },
  });

  const result = yield call(fetchPosts);
  console.log("result of api call inside saga: ", result);
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
