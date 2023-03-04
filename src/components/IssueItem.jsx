import styles from "../css/IssueItem.module.css";
import { Tag } from "antd";
import { getInfoById } from '../api/user'
import { useEffect, useState } from "react";
import { formatDate } from '../utils/mutateTime'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTypeList } from '../redux/typeSlice'
import { useNavigate } from 'react-router-dom'

function IssueItem(props) {
    const [userInfo, setUserInfo] = useState({})
    const {typeList} = useSelector(state => state.type)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];

    useEffect(() => {
        if(!typeList.length) {
            dispatch(getAllTypeList())
        }
        
        async function getUserInfoById() {
            const res = await getInfoById(props.issueInfo.userId)
            setUserInfo(res.data)
        }
        getUserInfoById()
    }, [])

    const type = typeList.find(item => item._id === props.issueInfo.typeId)

    function goIssueDel() {
        navigate('/IssueDel/' + props.issueInfo._id)
    }

    return (
        <div className={styles.container}>
            {/* 回答数 */}
            <div className={styles.issueNum}>
                <div>{props.issueInfo.commentNumber}</div>
                <div>回答</div>
            </div>
            {/* 浏览数 */}
            <div className={styles.issueNum}>
                <div>{props.issueInfo.scanNumber}</div>
                <div>浏览</div>
            </div>
            {/* 问题内容 */}
            <div className={styles.issueContainer}>
                <div className={styles.top} onClick={goIssueDel}>{props.issueInfo.issueTitle}</div>
                <div className={styles.bottom}>
                    <div className={styles.left}>
                        <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>{type?.typeName}</Tag>
                    </div>
                    <div className={styles.right}>
                        <Tag color="volcano">{userInfo.nickname}</Tag>
                        <span>{formatDate(props.issueInfo.issueDate, 'year')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssueItem;