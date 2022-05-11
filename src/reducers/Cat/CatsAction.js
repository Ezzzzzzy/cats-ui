import { GET_CATS, FILTER_CATS } from "./CatTypes"

export const getCats = (payload) => {
    return {
        type: GET_CATS,
        payload
    };
}

export const filterCats = (search, orderBy, direction, page, rowsPerPage) => {
    return {
        type: FILTER_CATS,
        search: search ? search : '',
        orderBy,
        direction,
        page,
        rowsPerPage
    }
}
