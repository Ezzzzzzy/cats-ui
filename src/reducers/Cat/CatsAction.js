import { CANCEL_SEARCH, GET_CATS, SEARCH_CATS } from "./CatTypes"
import * as selectors from '../../store/selectors'

export const getCats = (payload) => {
    return {
        type: GET_CATS,
        payload
    };
}

export const searchCats = (cats, payload) => {
    let catsData = cats

    if (payload)
        catsData = catsData.filter((row) => {
            return row.name.toLowerCase().includes(payload.toLowerCase())
        })
    
    console.log(catsData)
    return {
        type: SEARCH_CATS,
        payload: catsData
    }

}