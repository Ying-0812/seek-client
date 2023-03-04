import React from 'react';
import { Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { getAllTypeList, initTypeSearch } from '../redux/typeSlice'
import { useEffect } from "react";

function PageHeader(props) {
    const {typeList} = useSelector(state => state.type)
    const dispatch = useDispatch()
    const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];

    useEffect(() => {
        if(!typeList.length) {
            dispatch(getAllTypeList())
        }
    }, [])

    function getTypeId(itm) {
        if(!itm) {
            props.clickAll()
        }
        dispatch(initTypeSearch(itm))
    }
    let newArr = []
    for(let i = 0; i < typeList.length; i++) {
        newArr.push(<Tag key={i} color={colorArr[typeList.indexOf(typeList[i]) % colorArr.length]}
            onClick={() => {getTypeId(typeList[i]._id)}}
            style={{cursor: 'pointer', margin: '4px 6px', width: 'auto', height: '28px', textAlign: 'center',lineHeight: '26px', fontSize: '14px'}}>
            {typeList[i].typeName}
        </Tag>)
    }

    return (
        <div className='headerBody'>
            <div className='headerTitle'>{props.title}</div>
            <div className='tagList'>
                <Tag color='cyan'
                    onClick={() => {getTypeId('')}}
                    style={{cursor: 'pointer', margin: '4px 6px', width: 'auto', height: '28px', textAlign: 'center',lineHeight: '26px', fontSize: '14px'}}>
                    全部
                </Tag>
                {newArr}
            </div>
        </div>
    );
}

export default PageHeader;