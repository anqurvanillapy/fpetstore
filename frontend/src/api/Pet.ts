import http from '../config/http'

export function postPet(param: PostPet) {
    return http.request({
        url: '/',
        method: 'POST',
        data: param,
        
    })
}

export function putPet(param: PostPet) {
    return http.request({
        url: '/',
        method: 'PUT',
        params: param,
        
    })
}

export function getPet(id: number) {
    return http.request({
        url: `/${id}`,
        method: 'GET'
    })
}

export function updatePet(param: PostPet) {
    return http.request({
        url: '/',
        method: 'PUT',
        data: param
    })
}