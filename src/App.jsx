import React, { useState, useEffect } from 'react';
import NavHeader from './components/Header'
import NavFooter from './components/Footer'
import { Layout, message } from 'antd';
import './css/App.css'
import RouterConfig from './router/RouterGuard';
import LoginModal from './components/LoginModal';
import { resumeLogin, getInfoById } from './api/user'
import {useDispatch} from 'react-redux'
import {initUserInfo, changeLoginStatus, removeTokenToStorage} from './redux/userSlice'

const { Header, Footer, Content } = Layout;

function App() {
  const [modalShow, setModalShow] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem('token')) {
      renewLogin()
    }
  }, [])

  async function renewLogin() {
      const res = await resumeLogin()
      if(res.data) {
          getUserInfoById(res.data._id)
      } else {
          dispatch(initUserInfo({}))
          dispatch(changeLoginStatus(false))
          dispatch(removeTokenToStorage(true))
          message.error(res.msg);
      }
  }

  async function getUserInfoById(id) {
      const res = await getInfoById(id)
      dispatch(initUserInfo(res.data))
      dispatch(changeLoginStatus(true))
  }

  function showModal() {
    setModalShow(true)
  }
  function handleCancel() {
    setModalShow(false)
  }

  return (
    <div className='appContainer'>
      <Header><NavHeader showModal={showModal}></NavHeader></Header>
      <Content><RouterConfig></RouterConfig></Content>
      <Footer><NavFooter></NavFooter></Footer>
      <LoginModal isShow={modalShow} handleCancel={handleCancel}></LoginModal>
    </div>
  );
}

export default App;
