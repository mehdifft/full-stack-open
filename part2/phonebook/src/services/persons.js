import axios from "axios"

const baseURL = '/api/persons'

const get = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const remove = id => axios.delete(`${baseURL}/${id}`)

const update  = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject) 
    return request.then(response => response.data)
}


export default { get, create, remove, update }