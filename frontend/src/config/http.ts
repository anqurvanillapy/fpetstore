import axios from 'axios'

const http = axios.create({
    baseURL: '/pet',
    timeout: 10000
})

export default http