import { GET_CATS, GET_CATS_FAILED, GET_CATS_SUCCESS } from './CatTypes'
import { all, takeEvery, put } from '@redux-saga/core/effects';

function* getCats(data) {

    try {
        yield put({ type: "GET_CATS_SUCCESS", cats: {} });
    } catch (e) {
        yield put({ type: "GET_CATS_FAILED", message: e.message });
    }
}

export default function* watchAuthRequests() {
    yield all([takeEvery(GET_CATS, getCats)])
}
