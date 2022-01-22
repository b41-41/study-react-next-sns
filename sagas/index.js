import { all, fork, call, put, take } from 'redux-saga/effects';

function logInAPI(data) {
    return axios.post('/api/login', data);
}


function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({
            type: 'LOG_IN_REQUEST',
        })
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data, //결과
        });
    } catch (err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data,
        });
    }
}

function logOutAPI() {
    return axios.post('/api/logout');
}

function* logOut() {
    try {
        const result = yield call(logOutAPI);
        yield put({
            type: 'LOG_OUT_REQUEST',
        })
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: result.data, //결과
        });
    } catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data,
        });
    }
}

function addPostAPI() {
    return axios.post('/api/post');
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: 'ADD_POST_SUCCESS',
            data: result.data, //결과
        });
    } catch (err) {
        yield put({
            type: 'ADD_POST_FAILURE',
            data: err.response.data,
        });
    }
}

function* watchLogin() {
    yield take('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
    yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost() {
    yield take('ADD_POST_REQUEST', addPost);
}


export default function* rootSaga() {
    yield all([
        fork(watchLogin), //call도 실행인데 조금 다름.
        fork(watchLogOut),
        fork(watchAddPost),
    ]);
}