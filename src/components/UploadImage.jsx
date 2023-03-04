import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload, message } from 'antd'
import { useState } from 'react'
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })
const UploadImage = (props) => {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState([])
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只能上传JPG/PNG格式的图片');
        }
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isLt2M) {
            message.error('图片大小不能超过4MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    }
    const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{marginTop: 8,}}>上传头像</div>
    </div>
    )

    function selfUpload(val) {
        const fd = new FormData()
        fd.append("file", val.file)
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:3000/api/upload', true)
        xhr.send(fd)
        xhr.onload = () => {
            if (xhr.status === 200) {
                props.newAvatar(JSON.parse(xhr.responseText))
                val.onSuccess()
            } else {
                val.onError()
            }
        }
    }
    return (
        <>
            <Upload
                action=""
                listType="picture-card"
                maxCount={1}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={selfUpload}
                beforeUpload={beforeUpload}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img style={{ width: '100%',}} src={previewImage}/>
            </Modal>
        </>
)
}
export default UploadImage