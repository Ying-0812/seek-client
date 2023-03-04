import React  from 'react';
import {useSelector} from 'react-redux'
import { Button, Popover, Avatar, List, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from "../css/LoginAvatar.module.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {initUserInfo, changeLoginStatus, removeTokenToStorage} from '../redux/userSlice'

function LoginInfo(props) {
    const {isLogin, userInfo} = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function clickHandler(item) {
        if(item === '个人中心') {
            navigate('/personal')
        } else {
            dispatch(initUserInfo({}))
            dispatch(changeLoginStatus(false))
            dispatch(removeTokenToStorage(true))
            navigate('/')
        }
    }

    let nowStatus = null
    let content = (
        <List
            dataSource={["个人中心", "退出登录"]}
            size="large"
            renderItem={(item) => {
                return (
                    <List.Item style={{ cursor: "pointer" }} onClick={() => clickHandler(item)}>{item}</List.Item>
                )
            }}
        />
    )
    if(isLogin) {
        nowStatus = (
            <Popover content={content}>
                <div className={styles.avatarContainer}>
                    <Avatar src={<Image src={userInfo?.avatar} preview={false} />} size="large" icon={<UserOutlined />} />
                </div>
            </Popover>
        )
    } else {
        nowStatus = (
            <Button type="primary" size="large" onClick={props.showModal}>注册/登录</Button>
        )
    }
    return (
        <div>
            {nowStatus}
        </div>
    );
}

export default LoginInfo;