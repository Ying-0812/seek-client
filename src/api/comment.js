import request from './request'

// 根据id分页获取问答评论列表
export function getIssueComment(id, pageForm) {
    return request({
        url: '/api/comment/issuecomment/' + id,
        method: 'GET',
        params: {...pageForm }
    })
}

// 根据id分页获取问答评论列表
export function getBookComment(id, pageForm) {
    return request({
        url: '/api/comment/bookcomment/' + id,
        method: 'GET',
        params: {...pageForm }
    })
}

// 新增评论
export function addComment(data) {
    return request({
        url: '/api/comment',
        data: data,
        method: 'POST'
    })
}