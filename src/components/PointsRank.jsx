import React from 'react';
import styles from  '../css/PointsRank.module.css'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function PointsRank(props) {
    let rankNum = null;
    switch(props.rank){
        case 1:{
            rankNum = (
                <div style={{
                    color : "#ffda23",
                    fontSize : "22px",
                }} className="iconfont icon-jiangbei"></div>
            )
            break;
        }
        case 2:{
            rankNum = (
                <div style={{
                    color : "#c5c5c5",
                    fontSize : "22px"
                }} className="iconfont icon-jiangbei"></div>
            )
            break;
        }
        case 3:{
            rankNum = (
                <div style={{
                    color : "#cd9a62",
                    fontSize : "22px"
                }} className="iconfont icon-jiangbei"></div>
            )
            break;
        }
        default : {
            rankNum = (<div className={styles.rank}>{props.rank}</div>)
        }
    }

    return (
        <div className={styles.rankItem}>
            <div className={styles.rank}>{rankNum}</div>
            <div className={styles.user}>
                <div className={styles.avatar}>
                    <Avatar src={props.itemInfo.avatar} size="large" icon={<UserOutlined />} />
                </div>
                <div className={styles.name}>
                    {props.itemInfo.nickname}
                </div>
            </div>
            <div className={styles.points}>{props.itemInfo.points}</div>
        </div>
    );
}

export default PointsRank;