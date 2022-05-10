import { GET_CATS, GET_CATS_FAILED, GET_CATS_SUCCESS, PAGINATE_CATS, PAGINATE_CATS_SUCCESS, SEARCH_CATS, } from './CatTypes'
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

function* paginatedCats({ cats, page, rowsPerPage }) {
    let start = page == 0 ? page : page * rowsPerPage
    let end = (page + 1) * rowsPerPage
    let catsData = cats.slice(start, end)

    yield put({
        type: PAGINATE_CATS_SUCCESS,
        payload: {
            currentPage: catsData,
            totalItems: cats.length
        }
    })
}

function* searchCats({ payload }) {
    let catsData = yield select(selectors.catsData)
    let page = yield select(selectors.pageData)
    let rowsPerPage = yield select(selectors.rowsPerPageData)

    catsData = catsData.filter((row) => {
        return row.name.toLowerCase().includes(payload.toLowerCase())
    })

    yield put({
        type: PAGINATE_CATS,
        cats: catsData,
        page: page,
        rowsPerPage: rowsPerPage
    })
}

export default function* watchAuthRequests() {
    yield all([takeEvery(GET_CATS, getCats)])
    yield all([takeEvery(PAGINATE_CATS, paginatedCats)])
    yield all([takeEvery(SEARCH_CATS, searchCats)])
}
