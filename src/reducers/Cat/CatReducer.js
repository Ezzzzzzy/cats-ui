import * as types from "./CatTypes";

const INITIAL_STATE = {
    cats: null,
    filteredCats: null,
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
        case types.SEARCH_CATS:
            return {
                ...state,
                filteredCats: action.payload
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