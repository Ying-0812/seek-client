import React, { useEffect, useRef, useState } from 'react';
import { Modal, Radio, Form, Input, Button, Row, Col, Checkbox, message } from 'antd';
import styles from "../css/LoginForm.module.css";
import {getCaptcha, verifyUserExist, registerUser, loginUser, getInfoById} from '../api/user'
import {useDispatch} from 'react-redux'
import {initUserInfo, changeLoginStatus, setTokenToStorage} from '../redux/userSlice'

function LoginModal(props) {
    const [value, setValue] = useState(1)
    const [loginInfo, setLoginInfo] = useState({
        loginId: "",
        loginPwd: "",
        captcha: "",
        remember: false
    });
    const [registerInfo, setRegisterInfo] = useState({
        loginId: '',
        nickname: '',
        captcha: ''
    })
    const [captcha, setCaptcha] = useState(null)
    const loginFormRef = useRef();
    const registerFormRef = useRef()
    const dispatch = useDispatch()
    let container = null

    useEffect(() => {
        captchaClickHandle()
    }, [props.isShow])
    
    function onChange(e) {
        setValue(e.target.value)
        captchaClickHandle()
    }
    function handleOk() {
        handleCancel()
    }

    function updateInfo(oldInfo, val, key, setRegisterInfo) {
        let newInfo = {...oldInfo}
        newInfo[key] = val
        setRegisterInfo(newInfo)
    }

    async function captchaClickHandle(){
        const result = await getCaptcha()
        setCaptcha(result);
    }

    async function registerHandle () {
        const result = await registerUser(registerInfo)
        if(result.data) {
            dispatch(initUserInfo(result.data))
            dispatch(changeLoginStatus(true))
            handleCancel()
            message.success('注册成功!账户默认密码为123456')
        } else {
            message.warning(result.msg)
            captchaClickHandle()
        }
    }

    async function loginHandle() {
        const res = await loginUser(loginInfo)
        if(res.data) {
            if(res.data.data) {
                if(res.data.data.enabled) {
                    getUserInfoById(res.data.data._id)
                    dispatch(changeLoginStatus(true))
                    dispatch(setTokenToStorage(res.data.token))
                    handleCancel()
                    message.success('登录成功')
                } else {
                    message.error('该账户已被禁用!请联系管理员恢复')
                }
            } else {
                message.error('用户名或密码错误')
                captchaClickHandle()
            }
        } else {
            message.warning(res.msg)
            captchaClickHandle()
        }
    }

    async function getUserInfoById(id) {
        const res = await getInfoById(id)
        dispatch(initUserInfo(res.data))
    }

    function handleCancel() {
        setLoginInfo({
            loginId: "",
            loginPwd: "",
            captcha: "",
            remember: false
        })
        setRegisterInfo({
            loginId: '',
            nickname: '',
            captcha: ''
        })
        props.handleCancel()
    }

    async function verifyUser() {
        if(registerInfo.loginId) {
            const {data} = await verifyUserExist(registerInfo.loginId)
            if(data) {
                return Promise.reject("该用户已存在!")
            }
        }
        
    }

    if(value === 1) {
        container = (
            <div className={styles.container}>
                <Form
                    name="basic1"
                    autoComplete="off"
                    onFinish={loginHandle}
                    ref={loginFormRef}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号",
                            },
                        ]}
                    >
                        <Input
                            placeholder="请输入你的登录账号"
                            value={loginInfo.loginId}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="登录密码"
                        name="loginPwd"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="请输入你的登录密码，新用户默认为123456"
                            value={loginInfo.loginPwd}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
                        />
                    </Form.Item>

                    {/* 验证码 */}
                    <Form.Item
                        name="logincaptcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Row align="middle">
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={loginInfo.captcha}
                                    onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
                                />
                            </Col>
                            <Col span={6}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={captchaClickHandle}
                                    dangerouslySetInnerHTML={{ __html: captcha }}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Checkbox
                            onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
                            checked={loginInfo.remember}
                        >记住我</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 20 }}
                        >
                            登录
                        </Button>
                        <Button type="primary" htmlType="submit">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    } else {
        container = (
            <div className={styles.container}>
                <Form
                    name="basic2"
                    autoComplete="off"
                    ref={registerFormRef}
                    onFinish={registerHandle}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号，仅此项为必填项",
                            },
                            {
                                validator: verifyUser
                            }
                        ]}
                        validateTrigger='onBlur'
                    >
                        <Input
                            placeholder="请输入账号"
                            value={registerInfo.loginId}
                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="用户昵称"
                        name="nickname"
                    >
                        <Input
                            placeholder="请输入昵称，不填写默认为新用户xxx"
                            value={registerInfo.nickname}
                            onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="registercaptcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Row align="middle">
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={registerInfo.captcha}
                                    onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
                                />
                            </Col>
                            <Col span={6}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={captchaClickHandle}
                                    dangerouslySetInnerHTML={{ __html: captcha }}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 20 }}
                        >
                            注册
                        </Button>
                        <Button type="primary" htmlType="submit">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }


    return (
        <>
            <Modal title="登录/注册" open={props.isShow} onOk={handleOk} onCancel={handleCancel}>
                <Radio.Group
                    value={value}
                    onChange={onChange}
                    className={styles.radioGroup}
                    buttonStyle="solid"
                >
                    <Radio.Button value={1} className={styles.radioButton}>登录</Radio.Button>
                    <Radio.Button value={2} className={styles.radioButton}>注册</Radio.Button>
                </Radio.Group>
                {container}
            </Modal>
        </>
    );
}

export default LoginModal;