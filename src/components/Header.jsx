import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import { Input, Select } from 'antd';
import LoginInfo from './LoginInfo'
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const [serchKey, setSearchkey] = useState('issue')
    const navigate = useNavigate()

    function changeKey(e) {
        setSearchkey(e)
    }

    function searchItem(e) {
        if(!e) {
            return
        }
        let searchCon = {
            type: serchKey,
            content: e
        }
        navigate('/search', {
            state: searchCon
        })
    }

    return ( 
        <>
            <div className='navHeader'>
                <div className='navBody'>
                    <NavLink to='/'>
                        <div className='bodyLogo'></div>
                    </NavLink>
                    <div className='navigation'>
                        <NavLink to='/issue' className="navList">问答</NavLink>
                        <NavLink to='/books' className="navList">书籍</NavLink>
                        <NavLink to='/interviews' className="navList">面试题</NavLink>
                        <a href='https://www.bilibili.com/' className="navList" target="_blank" rel="noreferrer">视频教程</a>
                    </div>
                    <div className='searchContainer'>
                        <Input.Group compact>
                            <Select onChange={changeKey} defaultValue={serchKey} size="large" style={{width:"16%"}}>
                                <Select.Option value="issue">问答</Select.Option>
                                <Select.Option value="books">书籍</Select.Option>
                            </Select>
                            <Input.Search
                                placeholder="请输入要搜索的内容"
                                allowClear
                                enterButton="搜索"
                                size="large"
                                style={{
                                    width:"84%"
                                }}
                                onSearch={searchItem}
                            />
                        </Input.Group>
                    </div>
                    <div className='logoBtn'>
                        <LoginInfo showModal={props.showModal}></LoginInfo>
                    </div>
                </div>
            </div>
            <div style={{width:'100%',height: '90px'}}></div>
        </>
    );
}

export default Header;