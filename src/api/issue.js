import request from './request'

// 分页获取问答列表
export function getIssueList(pageForm) {
    return request({
        url: '/api/issue',
        method: 'GET',
        params: {...pageForm }
    })
}

// 获取所有类型
export function getTypeList() {
    return request({
        url: '/api/type',
        method: 'GET'
    })
}

// 新增问答
export function addIssue(data) {
    return request({
        url: '/api/issue/',
        method: 'POST',
        data: data
    })
}

//  根据ID查找问答详情
export function getIssueDelById(id) {
    return request({
        url: '/api/issue/' + id,
        method: 'GET'
    })
}

//  修改问答
export function editIssueById(id, data) {
    return request({
        url: '/api/issue/' + id,
        method: 'PATCH',
        data: data
    })
}