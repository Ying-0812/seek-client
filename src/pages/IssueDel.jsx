import React from 'react';
import '../css/Issue.css'
import PointsRank from '../components/PointsRank'
import { Carousel, Image, Avatar } from 'antd';
import {useState, useEffect} from 'react';
import { getIssueDelById, editIssueById } from '../api/issue'
import { getPointsTop, getInfoById } from '../api/user'
import { useParams } from 'react-router-dom';
import styles from '../css/IssueDel.module.css'
import { UserOutlined } from '@ant-design/icons';
import { formatDate } from '../utils/mutateTime'
import Comment from '../components/Comment'

function IssueDel(props) {
    const [pointsList, setPointsList] = useState([])
    const [issueDel, setIssueDel] = useState(null)
    const [issueUserInfo, setIssueUserInfo] = useState(null)
    const {id} = useParams()
    useEffect(() => {
        async function getPoints() {
            const res = await getPointsTop()
            setPointsList(res.data)
        }

        async function getIssueDel() {
            const res = await getIssueDelById(id)
            const result = await getInfoById(res.data.userId)
            setIssueDel(res.data)
            setIssueUserInfo(result.data)
            if(res.data) {
                let obj = {
                    scanNumber: res.data.scanNumber += 1
                }
                await editIssueById(res.data._id, obj)
            }
        }

        getIssueDel()
        getPoints()
    }, [])

    let rankArr = []
    for(let i = 0; i < pointsList.length; i++) {
        rankArr.push(<PointsRank key={pointsList[i]._id} itemInfo={pointsList[i]} rank={i + 1} />)
    }

    return (
        <div className='issueContainer'>
            <div className='tagBody'>
                <div className='issueBody'>
                    <div className={styles.issueDel}>
                        <div className={styles.delBody}>
                            <div className={styles.issueDelTitle}>{issueDel?.issueTitle}</div>
                            <div className={styles.issueUserInfo}>
                                <div className={styles.issueAvatar}>
                                    <Avatar src={issueUserInfo?.avatar} icon={<UserOutlined />} />
                                </div>
                                <div className={styles.issueMsg}>
                                    <div className={styles.issueName}>{issueUserInfo?.nickname}</div>
                                    <div className={styles.issueTime}>发布于:&emsp;{formatDate(issueDel?.issueDate, 'year-time')}</div>
                                </div>
                            </div>
                            <div className={styles.issueContent} dangerouslySetInnerHTML={{ __html: issueDel?.issueContent }}></div>
                        </div>
                        <Comment commentType={1} issueId={id} typeId={issueDel?.typeId} />
                    </div>
                    <div className='issueRight'>
                        <div className='issueHot'>
                            <div className='hotList'>
                                <div className='rankTitle' style={{marginBottom: '15px'}}>精选内容</div>
                                <Carousel autoplay>
                                    <div>
                                        <a href='https://chinaevent.microsoft.com/Events/details/f4b6aa5c-6cd2-4d5d-b12e-de9234886a62?channel_id=50&&channel_name=Paid-SF' target="_blank" rel="noreferrer">
                                            <Image
                                                width={'100%'}
                                                height={160}
                                                preview={false}
                                                src="https://image-static.segmentfault.com/639/161/63916165-63f344cd60cf5"
                                            />
                                        </a>
                                    </div>
                                    <div>
                                        <a href='https://segmentfault.com/a/1190000043397696?utm_source=sf-homepage-headline' target="_blank" rel="noreferrer">
                                            <Image
                                                width={'100%'}
                                                height={160}
                                                preview={false}
                                                src="https://image-static.segmentfault.com/287/584/287584338-63f70fe43e031"
                                            />
                                        </a>
                                    </div>
                                    <div>
                                        <a href='https://segmentfault.com/e/1160000042049728' target="_blank" rel="noreferrer">
                                            <Image
                                                width={'100%'}
                                                height={160}
                                                preview={false}
                                                src="https://activity-static.segmentfault.com/251/289/2512897702-62bbfc520026c_big"
                                            />
                                        </a>
                                    </div>
                                </Carousel>
                                <div className='hotBody'>
                                    <div className='hotItem'>
                                        <div className='badge' style={{backgroundColor: '#e04a1d'}}>1</div>
                                        <div className='hotFont'>
                                            <a href='https://segmentfault.com/a/1190000043425380' target="_blank" rel="noreferrer" className='fontHot'>Vue3 是如何通过编译优化提升框架性能的？</a>
                                        </div>
                                    </div>
                                    <div className='hotItem'>
                                        <div className='badge' style={{backgroundColor: '#f88217'}}>2</div>
                                        <div className='hotFont'>
                                            <a href='https://segmentfault.com/a/1190000043442043' target="_blank" rel="noreferrer" className='fontHot'>如何用Go快速实现规则引擎</a>
                                        </div>
                                    </div>
                                    <div className='hotItem'>
                                        <div className='badge' style={{backgroundColor: '#ffb916'}}>3</div>
                                        <div className='hotFont'>
                                            <a href='https://segmentfault.com/a/1190000043435634' target="_blank" rel="noreferrer" className='fontHot'>由小见大！不规则造型按钮解决方案</a>
                                        </div>
                                    </div>
                                    <div className='hotItem'>
                                        <div className='badge' style={{backgroundColor: '#adb5bd'}}>4</div>
                                        <div className='hotFont'>
                                            <a href='https://segmentfault.com/a/1190000043424728' target="_blank" rel="noreferrer" className='fontHot'>基于node.js 自动打包项目，并提供http下载</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='issueRank'>
                            <div className='rankTitle'>积分前十排行榜</div>
                            <div className='rankList'>
                                {rankArr}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssueDel;