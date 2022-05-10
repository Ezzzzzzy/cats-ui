import { GET_CATS } from "./CatTypes"


export const getCats = (payload) => {
    return {
        type: GET_CATS,
        payload
    };
}