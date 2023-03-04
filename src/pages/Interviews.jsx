import React, { useEffect, useRef, useState } from 'react';
import styles from '../css/Interviews.module.css'
import { getAllInterview } from '../redux/interSlice'
import { getAllTypeList } from '../redux/typeSlice'
import { getInterById } from '../api/interview'
import { useSelector, useDispatch } from 'react-redux'
import { Tree, FloatButton } from 'antd'

function Interviews(props) {
    const {interview} = useSelector(state => state.inter)
    const {typeList} = useSelector(state => state.type)
    const [treeList, setTreeList] = useState([])
    const [interContent, setInterConetnt] = useState('')
    const dispatch = useDispatch()
    const backTop = useRef()

    useEffect(() => {
        if(!interview.length) {
            dispatch(getAllInterview())
        }
        if(!typeList.length) {
            dispatch(getAllTypeList())
        }
        if(interview.length && typeList.length) {
            const arr = []
            for(let i = 0; i < typeList.length; i++) {
                arr.push({
                    title: (<h3>{typeList[i].typeName}</h3>),
                    key: i
                })
            }
            for(let i = 0; i < interview.length; i++) {
                const childArr = []
                for(let j = 0; j < interview[i].length; j++) {
                    childArr.push({
                        title: (<h4 style={{fontWeight: '400'}} onClick={() => handleDel(interview[i][j]._id)}>{interview[i][j].interviewTitle}</h4>),
                        key: `${i}-${j}`
                    })
                }
                arr[i].children = childArr
            }
            setTreeList(arr)
            
        }
    }, [interview, typeList])

    async function handleDel(id) {
        const res = await getInterById(id)
        setInterConetnt(res.data.interviewContent)
    }

    return (
        <>
        <div className={styles.interContainer}>
            <div className={styles.interLeft}>
                <Tree treeData={treeList} defaultExpandAll />
            </div>
            <div className={styles.interRight} dangerouslySetInnerHTML={{ __html: interContent }}></div>
        </div>
        <FloatButton.BackTop visibilityHeight={0} ref={backTop} />
        </>
    );
}

export default Interviews;