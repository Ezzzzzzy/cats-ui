import { CANCEL_SEARCH, GET_CATS, GET_CATS_FAILED, PAGINATE_CATS, SEARCH_CATS } from "./CatTypes"
import * as selectors from '../../store/selectors'

export const getCats = (payload) => {
    return {
        type: GET_CATS,
        payload
    };
}

export const searchCats = (payload) => {
    return {
        type: SEARCH_CATS,
        payload: payload
    }

}

export const catsPagination = (cats, page, rowsPerPage) => {
    let start = page == 0 ? page : page * rowsPerPage
    let end = (page + 1) * rowsPerPage
    let catsData = cats.slice(start, end)

    return {
        type: PAGINATE_CATS,
        cats: cats,
        page: page,
        rowsPerPage: rowsPerPage
    }
}