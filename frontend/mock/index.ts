import mock from 'mockjs'
const baseURL = '/pet'
export default [
    mock.mock('/pet/', 'post', {
        'heyman|1-10.1-100': 3,
        'henshin|5': 3,
        'baka|1-10': 'c'
    }),
    mock.mock(/\/pet\/([0-9]*)/, 'get', function (param: any) {
        return mock.mock({
            'heyman|1-10.1-100': 3,
            'henshin|5': 3,
            'baka|1-10': 'c'
        })
    }),
    mock.mock(/\/pet\/([0-9]*)/, 'put', function (param: any) {
        return mock.mock({
            'heyman|1-10.1-100': 3,
            'henshin|5': 3,
            'baka|1-10': 'c'
        })
    }),
]