import request from './request'

// 获取验证码
export function changePerson(id, data) {
    return request({
        url: '/api/user/' + id,
        method: 'PATCH',
        data: data
    })
}