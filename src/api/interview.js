import request from './request'

// 获取面试题列表
export function getInterviewList() {
    return request({
        url: '/api/interview/interviewTitle',
        method: 'GET'
    })
}

export function getInterById(id) {
    return request({
        url: '/api/interview/' + id,
        method: 'GET'
    })
}