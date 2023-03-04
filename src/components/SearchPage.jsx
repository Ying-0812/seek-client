import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getIssueList } from '../api/issue'
import styles from '../css/Search.module.css'
import IssueItem from '../components/IssueItem'
import { Pagination } from 'antd';

function SearchPage(props) {
    const [current, setCurrent] = useState(1);
    const {state} = useLocation()
    const [searchResult, setSearchResult] = useState([])
    const [form, setForm] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })
    useEffect(() => {
        console.log(state)
        async function getList() {
            if(state.type === 'issue') {
                let searchData = {
                    current: form.current,
                    pageSize: form.pageSize,
                    issueStatus: true,
                    issueTitle: state.content
                }
                const res = await getIssueList(searchData)
                setSearchResult(res.data.data)
                setForm({
                    current: res.data.currentPage,
                    pageSize: res.data.eachPage,
                    total: res.data.count
                })
            }
            
        }
        if(state) {
            getList()
        }
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

    let newArrList = []
    for(let i = 0; i < searchResult.length; i++) {
        newArrList.push(<IssueItem issueInfo={searchResult[i]} key={i}/>)
    }

    return (
        <div className={styles.searchContainer}>
            {newArrList}
            <div className='pagination'>
                <Pagination current={current} total={form.total} onChange={changeCurrent} />
            </div>
        </div>
    );
}

export default SearchPage;