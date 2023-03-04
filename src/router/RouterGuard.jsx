import React from 'react';
import RouterIndex from './index'
import pathArr  from './RouterArr.js'
import { useNavigate } from 'react-router-dom';
import { Alert } from 'antd';

function RouterGuard(props) {
    const path = window.location.pathname
    const navigate = useNavigate()
    const nowPath = pathArr.filter(itm => {
        return itm.path === path
    })[0]

    function goHome() {
        navigate('/')
    }
    if(nowPath) {
        if(nowPath.needLogin && !localStorage.getItem('token')) {
            return (
                <div style={{width: '360px', margin: '40px auto'}}>
                    <Alert message="请先登录!" type="warning" onClose={goHome} closable={true} />
                </div>
            )
        }
    }

    return (<RouterIndex />);
}

export default RouterGuard;