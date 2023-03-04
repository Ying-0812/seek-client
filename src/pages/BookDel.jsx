import {useState, useEffect} from 'react';
import styles from '../css/BookDel.module.css'
import { getBookDelById, editBookById } from '../api/books'
import { useParams } from 'react-router-dom'
import Comment from '../components/Comment'
import { useSelector } from 'react-redux';
import { Image } from 'antd';
import { editUserInfo } from '../api/user'

function BookDel(props) {
    const {id} = useParams()
    const [bookInfo, setBookInfo] = useState({})
    const {isLogin, userInfo} = useSelector(state => state.user)

    useEffect(() => {
        async function getData() {
            const res = await getBookDelById(id)
            setBookInfo(res.data)
            if(res.data) {
                let obj = {
                    scanNumber: res.data.scanNumber += 1
                }
                await editBookById(res.data._id, obj)
            }
        }

        getData()
    }, [])

    async function downLoadBook() {
        let obj = {
            points: userInfo.points - bookInfo.requirePoints
        }
        await editUserInfo(userInfo._id, obj)
    }

    return (
        <div className={styles.BookDelCon}>
            <div className={styles.bookContent}>
                <div className={styles.conLeft}>
                    <div className={styles.Image}>
                        <Image
                            width={'100%'}
                            height={'100%'}
                            preview={false}
                            src={bookInfo?.bookPic}
                        />
                    </div>
                    <div className={styles.Link}>
                        {isLogin ? (userInfo.points > bookInfo.requirePoints ? <a className={styles.linkStyle} href={bookInfo?.downloadLink} target="_blank" onClick={downLoadBook} rel="noreferrer">网盘下载链接</a> : <span>你的积分不足!</span>) : (<span>你需要登录才能进行下载!</span>)}
                    </div>
                </div>
                <div className={styles.conRight} dangerouslySetInnerHTML={{__html: bookInfo?.bookIntro}}></div>
            </div>
            <Comment commentType={2} bookId={id} typeId={bookInfo?.typeId} />
        </div>
    );
}

export default BookDel;