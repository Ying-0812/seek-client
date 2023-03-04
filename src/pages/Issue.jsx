import React from 'react';
import '../css/Issue.css'
import PageHeader from '../components/PageHeader'
import IssueItem from '../components/IssueItem'
import PointsRank from '../components/PointsRank'
import { Pagination, Button, message, Carousel, Image } from 'antd';
import {useState, useEffect} from 'react';
import { getIssueList } from '../api/issue'
import { getPointsTop } from '../api/user'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


function Issue(props) {
    const [current, setCurrent] = useState(1);
    const [issueList, setIssueList] = useState([])
    const [pointsList, setPointsList] = useState([])
    const [form, setForm] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })
    const {isLogin} = useSelector(state => state.user)
    const {typeSearch} = useSelector(state => state.type)
    const navigate = useNavigate()
    
    useEffect(() => {
        async function getList() {
            let issueCondition = {
                current: form.current,
                pageSize: form.pageSize,
                issueStatus: true
            }
            if(typeSearch) {
                issueCondition.typeId = typeSearch
                issueCondition.current = 1
            }
            const res = await getIssueList(issueCondition)
            setIssueList(res.data.data)
            setForm({
                current: res.data.currentPage,
                pageSize: res.data.eachPage,
                total: res.data.count
            })
        }
        getList()
    }, [form.current, typeSearch])
    useEffect(() => {
        async function getPoints() {
            const res = await getPointsTop()
            setPointsList(res.data)
        }
        getPoints()
    }, [])

    function changeCurrent(val) {
        setCurrent(val)
        let obj = {...form}
        obj.current = val
        setForm({
            current: obj.current,
            pageSize: obj.pageSize,
            total: obj.total
        })
    }

    function clickAll() {
        let obj = {...form}
        obj.current = 1
        setCurrent(1)
        setForm({
            current: obj.current,
            pageSize: obj.pageSize,
            total: obj.total
        })
    }

    function addIssue() {
        if(isLogin) {
            navigate('/AddIssue')
        } else {
            message.warning('请先登录!')
        }
    }

    let newArrList = []
    for(let i = 0; i < issueList.length; i++) {
        newArrList.push(<IssueItem issueInfo={issueList[i]} key={i}/>)
    }

    let rankArr = []
    for(let i = 0; i < pointsList.length; i++) {
        rankArr.push(<PointsRank key={pointsList[i]._id} itemInfo={pointsList[i]} rank={i + 1} />)
    }

    return (
        <div className='issueContainer'>
            <div className='tagBody'>
                <div className='headerTag'>
                    <PageHeader title="问答列表" clickAll={clickAll} />
                </div>
                <div className='issueBody'>
                    <div className='issueLeft'>
                        {newArrList}
                        <div className='issuePagination'>
                            <Pagination current={current} total={form.total} onChange={changeCurrent} />
                        </div>
                    </div>
                    <div className='issueRight'>
                        <div className='issueHot'>
                            <div className='addIssue'>
                                <Button type="primary" size="large" onClick={addIssue} style={{borderRadius: '0px', width: '100%', height: '60px', fontSize: '22px', marginBottom: '25px'}}>我要提问</Button>
                            </div>
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

export default Issue;