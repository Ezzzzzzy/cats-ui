import { GET_CATS, GET_CATS_FAILED, GET_CATS_SUCCESS, SEARCH_CATS, } from './CatTypes'
import { all, takeEvery, put, call, select } from '@redux-saga/core/effects';
import { getCats as getCatsService } from './CatsService';
import * as selectors from '../../store/selectors'

function* getCats(data) {
    try {
        const cats = yield call(getCatsService, data);
        yield put({ type: GET_CATS_SUCCESS, data: cats });
    } catch (e) {
        yield put({ type: GET_CATS_FAILED, message: e.message });
    }
}

export default function* watchAuthRequests() {
    yield all([takeEvery(GET_CATS, getCats)])
}
