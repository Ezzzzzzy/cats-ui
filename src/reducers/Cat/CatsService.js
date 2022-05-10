import axios from "axios"

export const getCats = async (data) => {
    try {
        let response = await axios({
            method: "get",
            url: "https://api.thecatapi.com/v1/breeds"
        })
        return response.data
    } catch (err) {
        throw err
    }
}