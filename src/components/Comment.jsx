import { useState, useEffect, useRef } from 'react';
import styles from '../css/Comment.module.css'
import { UserOutlined } from '@ant-design/icons'
import { formatDate } from '../utils/mutateTime'
import { Avatar, Form, Button, message, Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { getIssueComment, addComment, getBookComment } from '../api/comment'
import { Editor } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import { getInfoById, editUserInfo } from '../api/user'
import { editBookById } from '../api/books'
import { editIssueById } from '../api/issue'
import { initUserInfo } from '../redux/userSlice'

function Comment(props) {
    const {isLogin, userInfo} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [commentList, setCommentList] = useState([])
    const [current, setCurrent] = useState(1)
    const [form, setForm] = useState({
        current: 1,
        pageSize: 5,
        total: 0
    })
    const [addCommentObj] = useState({
        content: ''
    })
    const editorRef = useRef()
    const formRef = useRef()

    useEffect(() => {
        if(props.commentType === 1) {
            getIssueCommentById()
        } else if(props.commentType === 2) {
            getBookCommentById()
        }
    }, [form.current])

    // 获取问答评论列表
    async function getIssueCommentById(mark) {
        const res = await getIssueComment(props.issueId, {
            current: form.current,
            pageSize: form.pageSize
        })
        for(let i = 0; i < res.data.data.length; i++) {
            let {data} = await getInfoById(res.data.data[i].userId)
            res.data.data[i].userInfo = data
        }
        if(mark) {
            // 如果mark为true 说明是用户评论了要改变该问答的评论数
            await editIssueById(props.issueId, {
                commentNumber: res.data.data.length
            })
        }
        setCommentList(res.data.data)
        setForm({
            current: res.data.currentPage,
            pageSize: res.data.eachPage,
            total: res.data.count,
        })
    }

    // 获取书籍评论列表
    async function getBookCommentById(mark) {
        const res = await getBookComment(props.bookId, {
            current: form.current,
            pageSize: form.pageSize
        })
        for(let i = 0; i < res.data.data.length; i++) {
            let {data} = await getInfoById(res.data.data[i].userId)
            res.data.data[i].userInfo = data
        }
        if(mark) {
            // 如果mark为true 说明是用户评论了要改变该书籍的评论数
            await editBookById(props.bookId, {
                commentNumber: res.data.data.length
            })
        }
        setCommentList(res.data.data)
        setForm({
            current: res.data.currentPage,
            pageSize: res.data.eachPage,
            total: res.data.count,
        })
    }

    // 添加问答评论
    async function addIssueComment(content) {
        const res = await addComment({
            userId: userInfo._id,
            typeId: props.typeId,
            commentContent: content,
            commentType: props.commentType,
            issueId: props.issueId,
        })
        if(res.data){
            let obj = userInfo.points
            const result = await editUserInfo(userInfo._id, {
                points: obj += 4
            })
            if(result.data.acknowledged) {
                message.success('积分+4')
                const {data} = await getInfoById(userInfo._id)
                dispatch(initUserInfo(data))
            }
            getIssueCommentById('addPoints')
            message.success('提交成功!')
            editorRef.current.getInstance().setHTML('')
        } else {
            message.error('服务器繁忙, 请稍后重试!')
        }
    }

    // 添加书籍评论
    async function addBookComment(content) {
        const res = await addComment({
            userId: userInfo._id,
            typeId: props.typeId,
            commentContent: content,
            commentType: props.commentType,
            bookId: props.bookId,
        })
        if(res.data){
            let obj = userInfo.points
            const result = await editUserInfo(userInfo._id, {
                points: obj += 4
            })
            if(result.data.acknowledged) {
                message.success('积分+4')
                const {data} = await getInfoById(userInfo._id)
                dispatch(initUserInfo(data))
            }
            getBookCommentById('addPoints')
            message.success('提交成功!')
            editorRef.current.getInstance().setHTML('')
        } else {
            message.error('服务器繁忙, 请稍后重试!')
        }
    }

    function addHandle() {
        let content = editorRef.current.getInstance().getHTML()
        if(content === '<p><br></p>' || content === '<p> </p>') {
            content = ''
        }
        if(!content){
            message.warning('请输入评论内容!')
            return
        }
        if(props.commentType === 1) {
            addIssueComment(content)
        } else if(props.commentType === 2) {
            addBookComment(content)
        }
    }

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

    let testLogin = null
    if(isLogin) {
        testLogin = (
            <div className={styles.noLogin}>
                <Form
                    name="basic"
                    initialValues={addCommentObj}
                    autoComplete="off"
                    ref={formRef}
                    onFinish={addHandle}
                >
                    <Form.Item
                        label=""
                        name="issueContent"
                        rules={[{ required: true, message: '请输入问题描述' }]}
                    >
                        <Editor
                            initialValue=" "
                            previewStyle="vertical"
                            height="300px"
                            initialEditType="wysiwyg"
                            useCommandShortcut={true}
                            language='zh-CN'
                            ref={editorRef}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            提交回答
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    } else {
        testLogin = (
            <div style={{width: '100%', textAlign: 'center'}}>你尚未登录，登录后即可撰写回答!</div>
        )
    }

    let commList = []
    for(let i = 0; i < commentList.length; i++) {
        commList.push((
            <div key={i} style={{padding: '30px 30px', borderBottom: '1px solid rgba(0, 0, 0, .063)'}}>
                <div  className={styles.commentUserInfo}>
                    <div className={styles.commentAvatar}>
                        <Avatar src={commentList[i].userInfo.avatar} icon={<UserOutlined />} />
                    </div>
                    <div className={styles.commentMsg}>
                        <div className={styles.commentName}>{commentList[i].userInfo.nickname}</div>
                        <div className={styles.commentTime}>发布于:&emsp;{formatDate(commentList[i].commentDate, 'year-time')}</div>
                    </div>
                </div>
                <div className={styles.commentContent} dangerouslySetInnerHTML={{ __html: commentList[i].commentContent }}></div>
            </div>
        ))
    }
    
    return (
        <>
            <div className={styles.commentContainer}>
                <div className={styles.commentHeader}>评论</div>
                <div className={styles.commentBody}>
                    {commList}
                    {commList.length > 0 ? (
                        <div className={styles.comPagination}>
                            <Pagination current={current} total={form.total} onChange={changeCurrent} defaultPageSize={5} />
                        </div>
                    ) : (<div className={styles.noneCom}>暂无评论</div>)}
                </div>   
            </div>
            <div className={styles.commentReply}>
                <div className={styles.replyHeader}>撰写回答</div>
                <div className={styles.replyBody}>
                    {testLogin}
                </div>   
            </div>
        </>
    );
}

export default Comment;