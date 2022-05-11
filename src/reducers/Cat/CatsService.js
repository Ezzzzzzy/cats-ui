import axios from "axios"

export const getCats = async (data) => {
    try {
        let response = await axios({
            method: "get",
            url: "https://api.thecatapi.com/v1/breeds"
        })
        let catsData = response.data.map((data, index) => {
            return {
                index: index + 1,
                id: data.id,
                name: data.name,
                origin: data.origin,
                weight: data.weight.metric
            }
        })
        return catsData
    } catch (err) {
        throw err
    }
}