import { type } from "@testing-library/user-event/dist/type";
import * as types from "./CatTypes";

const INITIAL_STATE = {
    cats: null,
    paginatedCats: null,
    filteredCats: null,
    page: 0,
    rowsPerPage: 10,
    search: null,
    isLoading: false,
    error: {
        flag: false,
        msg: null
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_CATS:
            return {
                ...state,
                isLoading: true,
            }
        case types.GET_CATS_SUCCESS:
            return {
                ...state,
                cats: action.data,
                isLoading: false,
            }
        case types.FILTER_CATS:
            return {
                ...state,
                search: action.search,
                page: action.page,
                rowsPerPage: action.rowsPerPage
            }
        case types.FILTER_CATS_SUCCESS:
            return {
                ...state,
                filteredCats: {
                    data: action.payload.currentPage,
                    totalItems: action.payload.totalItems
                }
            }
        case types.GET_CATS_FAILED:
            return {
                ...state,
                error: {
                    flag: true,
                    msg: 'get cats error'
                },
                isLoading: false,
            }


        default:
            return state;
    }
};