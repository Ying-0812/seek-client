import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Pagination, Image } from 'antd';
import PageHeader from '../components/PageHeader'
import { getBooksList } from '../api/books'
import '../css/Books.css'

function Books(props) {
    const [bookList, setBookList] = useState([])
    const [current, setCurrent] = useState(1)
    const [bookPage, setBookPage] = useState({
        current: 1,
        pageSize: 15,
        total: 0
    })
    const {typeSearch} = useSelector(state => state.type)
    const navigate = useNavigate()

    useEffect(() => {
        async function getBook() {
            let issueCondition = {
                current: bookPage.current,
                pageSize: bookPage.pageSize,
                issueStatus: true
            }
            if(typeSearch) {
                issueCondition.typeId = typeSearch
                issueCondition.current = 1
            }
            const res = await getBooksList(issueCondition)
            setBookList(res.data.data)
            setBookPage({
                current: res.data.currentPage,
                pageSize: res.data.eachPage,
                total: res.data.count
            })
        }

        getBook()
    }, [bookPage.current, typeSearch])

    function changeCurrent(val) {
        setCurrent(val)
        let obj = {...bookPage}
        obj.current = val
        setBookPage({
            current: obj.current,
            pageSize: obj.pageSize,
            total: obj.total
        })
    }

    function clickAll() {
        let obj = {...bookPage}
        obj.current = 1
        setCurrent(1)
        setBookPage({
            current: obj.current,
            pageSize: obj.pageSize,
            total: obj.total
        })
    }

    function goBookDel(id) {
        navigate('/bookdel/' + id)
    }

    let newArr = []
    for(let i = 0; i < bookList.length; i++) {
        newArr.push(
            <div key={i} className="bookItem" style={{marginRight: (i + 1) % 5 === 0 ? '0px' : '32px', }}>
                <div className="topImg">
                    <Image
                        width={'100%'}
                        height={'100%'}
                        preview={false}
                        onClick={() => goBookDel(bookList[i]._id)}
                        src={bookList[i].bookPic}
                    />
                </div>
                <div className="centerTitle" onClick={() => goBookDel(bookList[i]._id)}>{bookList[i].bookTitle}</div>
                <div className="bottomDsc">
                    <div className="">浏览数: {bookList[i].scanNumber}</div>
                    <div className="">评论数: {bookList[i].commentNumber}</div>
                </div>
            </div>
        )
    }

    return (
        <div className='bookContainer'>
            <div className="bookHeader">
                <PageHeader title="精选书籍" clickAll={clickAll} />
            </div>
            <div className="bookBody">
                <div className="bookList">
                    {newArr}
                </div>
                <div style={{width: '100%', height: '41px'}}></div>
                <div className="pagination">
                    <Pagination current={current} total={bookPage.total} defaultPageSize={bookPage.pageSize} onChange={changeCurrent} />
                </div>
            </div>
        </div>
    );
}

export default Books;