import React, { useState } from 'react';
import UploadImage from '../components/UploadImage';
import styles from '../css/PersonalCenter.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { formatDate } from '../utils/mutateTime'
import { Avatar, Input, message, Modal, Form, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { changePerson } from '../api/person'
import { getInfoById } from '../api/user'
import { initUserInfo } from '../redux/userSlice'
import md5 from 'js-md5'

const { TextArea } = Input;

function PersonalCenter(props) {
    const [isEdit, setIsEdit] = useState(false)
    const {userInfo} = useSelector(state => state.user)
    const [myIntro, setMyIntro] = useState('')
    const [basicOpen, setBasicOpen] = useState(false)
    const [socializeOpen, setSocializeOpen] = useState(false)
    const [newInfo, setNewInfo] = useState({
        wechat: '',
        mail: '',
        qq: ''
    })
    const [newBasic, setNewBasic] = useState({
        loginPwd: '',
        newPwd: '',
        sureNewPwd: '',
        nickName: ''
    })
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    // 更改基本信息
    function changeBasicMsg() {
        let obj = {
            'loginPwd': newBasic.newPwd,
            'nickname': newBasic.nickName
        }
        if(newBasic.nickName === '') {
            obj.nickName = userInfo.nickname
        }
        form.validateFields().then(async () => {
            const res = await changePerson(userInfo._id, obj)
            if(res.data.acknowledged) {
                setBasicOpen(false)
                message.success('修改成功!')
                const result = await getInfoById(userInfo._id)
                dispatch(initUserInfo(result.data))
            } else {
                message.error('修改不成功,请稍后再试!')
            }
        })
    }

    // 更改社交帐号
    async function changeSocialize() {
        const res = await changePerson(userInfo._id, newInfo)
        if(res.data.acknowledged) {
            setSocializeOpen(false)
            message.success('修改成功!')
            const result = await getInfoById(userInfo._id)
            dispatch(initUserInfo(result.data))
        } else {
            message.error('修改不成功,请稍后再试!')
        }
    }

    function updateInfo(Info, val, key, setInfo) {
        if(val === '') {
            val = Info[key]
        }
        let obj = {...Info}
        obj[key] = val
        setInfo(obj)
    }

    function verifyUser() {
        let loginPwd = md5(newBasic.loginPwd)
        if(loginPwd !== userInfo.loginPwd) {
            return Promise.reject('旧密码不正确')
        } else {
            return Promise.resolve()
        }
    }

    function surePwd() {
        if(newBasic.newPwd !== newBasic.sureNewPwd) {
            return Promise.reject('两次密码不一致!')
        } else {
            return Promise.resolve()
        }
    }

    // 更改个人简介
    async function changeIntro() {
        const res = await changePerson(userInfo._id, {'intro': myIntro})
        if(res.data.acknowledged) {
            setIsEdit(false)
            message.success('修改成功!')
            const result = await getInfoById(userInfo._id)
            dispatch(initUserInfo(result.data))
        } else {
            message.error('修改不成功,请稍后再试!')
        }
    }

    function handleIntro(e) {
        setMyIntro(e.target.value)
    }

    // 更改头像
    async function getNewAvatar(uploadRes) {
        if(uploadRes.data) {
            const res = await changePerson(userInfo._id, {'avatar': uploadRes.data})
            if(res.data.acknowledged) {
                message.success('修改成功!')
                const result = await getInfoById(userInfo._id)
                dispatch(initUserInfo(result.data))
            } else {
                message.error('修改不成功,请稍后再试!')
            }
        } else {
            message.error('上传时失败')
        }
    }

    return (
        <div className={styles.personContainer}>
            <div className={styles.personHeader}>个人中心</div>
            <div className={styles.personInfo}>
                <div className={styles.infoHeader}>
                    <div className={styles.msgFont}>基本信息</div>
                    <div className={styles.changeBtn} onClick={() => setBasicOpen(true)}>编辑</div>
                </div>
                <div className={styles.infoBody}>
                    <div className={styles.staticMsg}>
                        <div className={styles.staticItem}>登录账号:&emsp;<span className={styles.staticItem}>{userInfo.loginId}</span></div>
                        <div className={styles.staticItem}>账号密码:&emsp;<span className={styles.staticItem}>******</span></div>
                        <div className={styles.staticItem}>用户昵称:&emsp;<span className={styles.staticItem}>{userInfo.nickname}</span></div>
                        <div className={styles.staticItem}>用户积分:&emsp;<span className={styles.staticItem}>{userInfo.points}</span></div>
                        <div className={styles.staticItem}>注册时间:&emsp;<span className={styles.staticItem}>{formatDate(userInfo.registerDate, 'year-time')}</span></div>
                        <div className={styles.staticItem}>上次登录时间:&emsp;<span className={styles.staticItem}>{formatDate(userInfo.lastLoginDate, 'year-time')}</span></div>
                        <div className={styles.staticItem}>当前头像:<br/>
                            <Avatar style={{marginTop: '15px', width: '100px', height: '100px', border: '1px solid #d9d9d9', borderRadius: '8px'}} src={userInfo.avatar} icon={<UserOutlined />} />
                        </div>
                        <div className="">
                            <div className={styles.staticItem}>上传新头像</div>
                            <UploadImage newAvatar={getNewAvatar}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.personInfo}>
                <div className={styles.infoHeader}>
                    <div className={styles.msgFont}>社交账号</div>
                    <div className={styles.changeBtn} onClick={() => setSocializeOpen(true)}>编辑</div>
                </div>
                <div className={styles.infoBody}>
                    <div className={styles.staticMsg}>
                        <div className={styles.staticItem}>微信:&emsp;<span className={styles.staticItem}>{userInfo.wechat ? userInfo.wechat : '未填写'}</span></div>
                        <div className={styles.staticItem}>邮箱:&emsp;<span className={styles.staticItem}>{userInfo.mail ? userInfo.mail : '未填写'}</span></div>
                        <div className={styles.staticItem}>QQ:&emsp;<span className={styles.staticItem}>{userInfo.qq ? userInfo.qq : '未填写'}</span></div>
                    </div>
                </div>
            </div>
            <div className={styles.personInfo}>
                <div className={styles.infoHeader}>
                    <div className={styles.msgFont}>个人简介</div>
                    {isEdit ? 
                    (<div className={styles.changeBtn} onClick={changeIntro}>确定</div>) : 
                    (<div className={styles.changeBtn} onClick={() => setIsEdit(true)}>编辑</div>)}
                </div>
                <div className={styles.infoBody}>
                    <div className={styles.staticMsg}>
                        {isEdit ? 
                        (<TextArea defaultValue={userInfo.intro} rows={4} placeholder="一个好的个人简介更吸引人哦" value={myIntro} onChange={handleIntro} />) : 
                        (<div className={styles.staticItem}><span className={styles.staticItem}>{userInfo.intro ? userInfo.intro : '未填写'}</span></div>)}
                    </div>
                </div>
            </div>
            <Modal title="更改基本信息" forceRender={true} destroyOnClose={true} open={basicOpen} onOk={changeBasicMsg} onCancel={() => setBasicOpen(false)}>
                <Form
                    name="basic"
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="旧密码"
                        name="loginPwd"
                        validateTrigger='onBlur'
                        rules={[
                            {
                                required: true,
                                message: "请输入旧密码",
                            },
                            {
                                validator: verifyUser
                            }
                        ]}
                    >
                        <Input
                            placeholder="请输入旧密码"
                            value={newBasic.loginPwd}
                            onChange={(e) => updateInfo(newBasic, e.target.value, 'loginPwd', setNewBasic)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="新密码"
                        name="newPwd"
                        rules={[
                            {
                                required: true,
                                message: "请输入新密码",
                            }
                        ]}
                    >
                        <Input
                            placeholder="请输入新密码"
                            value={newBasic.newPwd}
                            onChange={(e) => updateInfo(newBasic, e.target.value, 'newPwd', setNewBasic)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="确认新密码"
                        name="sureNewPwd"
                        rules={[
                            {
                                required: true,
                                message: "请确认新密码",
                            },
                            {
                                validator: surePwd
                            }
                        ]}
                    >
                        <Input
                            placeholder="请确认新密码"
                            value={newBasic.sureNewPwd}
                            onChange={(e) => updateInfo(newBasic, e.target.value, 'sureNewPwd', setNewBasic)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="用户昵称"
                        name="nickname"
                        initialValue={userInfo.nickname}
                    >
                        <Input
                            placeholder="请输入新昵称"
                            value={newBasic.nickName}
                            onChange={(e) => updateInfo(newBasic, e.target.value, 'nickName', setNewBasic)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="更改社交帐号" open={socializeOpen} onOk={changeSocialize} onCancel={() => setSocializeOpen(false)}>
                <Form
                    name="socialize"
                    autoComplete="off"
                >
                    <Form.Item
                        label="微信"
                        name="wechat"
                        validateTrigger='onBlur'
                    >
                        <Input
                            placeholder="请输入微信"
                            value={newInfo.wechat}
                            onChange={(e) => updateInfo(newInfo, e.target.value, 'wechat', setNewInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="邮箱"
                        name="mail"
                    >
                        <Input
                            placeholder="请输入邮箱"
                            value={newInfo.mail}
                            onChange={(e) => updateInfo(newInfo, e.target.value, 'mail', setNewInfo)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="QQ"
                        name="qq"
                    >
                        <Input
                            placeholder="请输入QQ"
                            value={newInfo.qq}
                            onChange={(e) => updateInfo(newInfo, e.target.value, 'qq', setNewInfo)}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default PersonalCenter;