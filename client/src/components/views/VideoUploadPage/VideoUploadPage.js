import React, {useState} from 'react';
import { Typography, Button, Form, message, Input, Spin, Alert } from 'antd';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { thumbnailVideo, uploadVideo, uploadVideoFiles } from '../../../_actions/video_action';
import { CategoryList } from '../../../enum/CategoryEnum';


const { TextArea } = Input;
const { Title } = Typography;

const PrivateOption = [
    {value:0, label:"Private"},
    {value:1, label:"Public"}
]
const CategoryOption = CategoryList;

function VideoUploadPage(props){

    const dispatch = useDispatch();

    const [ VideoTitle, setVideoTitle ] = useState("");
    const [ Description, setDescription ] = useState("");
    const [ Private, setPrivate ] = useState(0);
    const [ Category, setCategory ] = useState("Firm & Animation");
    const [ FilePath, setFilePath ] = useState("");
    const [ Duration, setDuration ] = useState("");
    const [ ThumbnailPath, setThumbnailPath ] = useState("");
    const [ Loading, setLoading ] = useState(false);
    const [ LoadingSubmit, setLoadingSubmit ] = useState(false);

    const user = useSelector(state => state.user);
    const onTitleHandler = (event) => {
        setVideoTitle(event.currentTarget.value);
    }   
    const onDescriptionHandler = (event) => {
        setDescription(event.currentTarget.value);
    }
    const PrivateChangeHandler = (event) => {
        setPrivate(event.currentTarget.value);
    }
    const CategoryChangeHandler = (event) => {
        setCategory(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setLoadingSubmit(true);
        const body = {
            writer : user.userData._id,
            title : VideoTitle,
            description : Description,
            privacy : Private,
            filePath : FilePath,
            category : Category,
            duration : Duration,
            thumbnail : ThumbnailPath,
        }
        dispatch(uploadVideo(body)).then(res => {
            if(res.payload.success){
                message.success('??????????????? ????????? ???????????????.');
                setTimeout(()=>{
                    setLoadingSubmit(false);
                    props.history.push('/');
                }, 3000);    
            } else {
                alert('????????? ???????????? ?????????????????????.');
            }
        })

    }
    const onDrop = (files) => {
        let formData = new FormData();
        formData.append("file", files[0]);
        setLoading(true);
        dispatch(uploadVideoFiles(formData)).then(res => {
            if( res.payload.success ){
                let variable = {
                    url : res.payload.url,
                    fileName : res.payload.fileName,
                }
                setFilePath(res.payload.url);
                dispatch(thumbnailVideo(variable)).then(res => {
                    if(res.payload.success){
                        setDuration(res.payload.fileDuration);
                        setThumbnailPath(res.payload.url);
                        setLoading(false);
                    } else {
                        alert('????????? ????????? ??????????????????.');
                    }
                })
            } else {
                alert('????????? ???????????? ?????????????????????.');
            }
        })
    }


    return (
        <div style={{ maxWidth :'700px', margin:'2rem auto'}}>
            <div style={{textAlign :'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    {/* DROP DOWN ZONE */}
                    <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={10000000000000}
                    >
                        {({getRootProps, getInputProps})=>(
                            <div style={{ width:'300px', height:'240px', border:'1px solid lightgray', display:'flex',
                            alignItems:'center', justifyContent:'center'}}{...getRootProps()}>
                                <input {...getInputProps()}/>
                                <PlusOutlined style={{ fontSize:'3rem' }} />
                            </div>
                        )}

                    </Dropzone>
                   
                    {/* Thumbnail Zone */}
                    {ThumbnailPath &&
                        <div>
                            {Loading ? <div style={{margin:'auto'}}><Spin tip="Loading..." /></div> 
                            : <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" /> }
                        </div>
                    }
                </div>
                <br />
                <br />
                <label>Title</label>
                <Input onChange={onTitleHandler} value={VideoTitle}/>
                <br />
                <br />
                <label>Description</label>
                <TextArea value={Description} onChange={onDescriptionHandler} />
                <br />
                <br />
                <select onChange={PrivateChangeHandler} value={Private}>
                    {PrivateOption.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <select onChange={CategoryChangeHandler} value={Category}>
                    {CategoryOption.map((item, index) => (
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <Button type={LoadingSubmit ? "secondary" : "primary"} size="large" onClick={onSubmit}
                disabled={LoadingSubmit ? "disabled" : ""}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}
export default VideoUploadPage;