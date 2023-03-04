import request from './request'

// 获取验证码
export function getCaptcha() {
    return request({
        url: 'res/captcha',
        method: 'GET'
    })
}

// 验证用户是否存在
export function verifyUserExist(loginId) {
    return request({
        url: '/api/user/userIsExist/' + loginId,
        method: 'GET'
    })
}

// 用户注册
export function registerUser(userInfo) {
    return request({
        url: '/api/user/',
        data: userInfo,
        method: 'POST'
    })
}

// 用户登录
export function loginUser(userInfo) {
    return request({
        url: '/api/user/login',
        data: userInfo,
        method: 'POST'
    })
}

//  恢复登录
export function resumeLogin() {
    return request({
        url: '/api/user/whoami',
        method: 'GET'
    })
}

//  根据ID查找用户信息
export function getInfoById(id) {
    return request({
        url: '/api/user/' + id,
        method: 'GET'
    })
}

// 获取积分前十
export function getPointsTop() {
    return request({
        url: '/api/user/pointsrank',
        method: 'GET'
    })
}

// 修改用户信息
export function editUserInfo(id, data) {
    return request({
        url: '/api/user/' + id,
        method: 'PATCH',
        data: data
    })
}