import {
    GET_CATS,
    GET_CATS_FAILED,
    GET_CATS_SUCCESS,
    FILTER_CATS,
    FILTER_CATS_SUCCESS
} from './CatTypes'
import {
    all,
    takeEvery,
    put,
    call,
    select
} from '@redux-saga/core/effects';
import { getCats as getCatsService } from './CatsService';
import * as selectors from '../../store/selectors'
import _ from 'lodash'

function* getCats(data) {
    try {
        const cats = yield call(getCatsService, data);
        yield put({ type: GET_CATS_SUCCESS, data: cats });
    } catch (e) {
        yield put({ type: GET_CATS_FAILED, message: e.message });
    }
}

function* filterCats({ search, orderBy, direction, page, rowsPerPage }) {
    let catsData = yield select(selectors.catsData)
    let start = page === 0 ? page : page * rowsPerPage
    let end = (page + 1) * rowsPerPage
    if (search)
        catsData = catsData.filter((row) => {
            return row.name.toLowerCase().includes(search.toLowerCase())
        })

    catsData = catsData = _.orderBy(catsData, [orderBy], [direction])
    let length = catsData.length

    catsData = catsData.slice(start, end)


    yield put({
        type: FILTER_CATS_SUCCESS,
        payload: {
            currentPage: catsData,
            totalItems: length
        }
    })
}

export default function* watchAuthRequests() {
    yield all([takeEvery(GET_CATS, getCats)])
    yield all([takeEvery(FILTER_CATS, filterCats)])
}
