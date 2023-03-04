import request from './request'

// 分页获取书籍列表
export function getBooksList(pageForm) {
    return request({
        url: '/api/book',
        method: 'GET',
        params: {...pageForm }
    })
}

//  根据ID查找书籍详情
export function getBookDelById(id) {
    return request({
        url: '/api/book/' + id,
        method: 'GET'
    })
}

//  修改书籍
export function editBookById(id, data) {
    return request({
        url: '/api/book/' + id,
        method: 'PATCH',
        data: data
    })
}