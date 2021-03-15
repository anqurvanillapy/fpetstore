import http from '../config/http'

interface Tags {
    id: number,
    name: string
}
export interface PostPet {
    id: number,
    name: string,
    category: {
        id: number,
        name: string
    },
    photoUrls: string[],
    tags: {
        id: number,
        name: string
    }[],
    status: string
}

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
        url: '/get',
        method: 'GET',
        params: { id }
    })
}