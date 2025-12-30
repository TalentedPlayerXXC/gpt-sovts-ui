import { useEffect, useRef, useState, Fragment } from 'react'
import { Button, Input, Form, Upload, message, Select, Slider } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import WaveSurfer from 'wavesurfer.js'
import { useWavesurfer } from '@wavesurfer/react'
import WavesurferPlayer from '@wavesurfer/react'
import { getTTS, getFileLink, getModels, getSpks, getEmotionList } from '../services/index'
import './index.css'

function TTSComponent() {
    const [messageApi, contextHolder] = message.useMessage();
    const [audioUrl, setAudioUrl] = useState('')
    const [fileLink, setFileLink] = useState('')
    const [textValue, setTextValue] = useState('')
    const [loading, setLoading] = useState(false)
    // const [data, setData] = useState([])
    const [isShow, setIshow] = useState(true)
    const [form] = Form.useForm()
    const Item = Form.Item
    const TextArea = Input.TextArea
    const Option = Select.Option

    const containerRef = useRef<HTMLDivElement>(null)

    // const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    //   container: containerRef,
    //   height: 100,
    //   waveColor: 'rgb(200, 0, 200)',
    //   progressColor: 'rgb(100, 0, 100)',
    //   url: audioUrl,
    //   // plugins: useMemo(() => [Timeline.create()], []),
    // })

    const formatter = (val: string) => `${val}`
    // 初始化列表
    useEffect(() => {
        // 初始化模型列表
        // getModels().then(res => {
        //   console.log(res, '模型列表');
        // })

        // 初始化角色列表
        // getEmotionList().then(res => { 
        //   console.log(res, 'res');
        // })
        // getModels().then(res => {
        //   // console.log(res, 'res');
        //   if (res.status === 200 && res?.data && res.data.length > 0) {
        //     getSpks(res.data[0]).then(list => {
        //       console.log(list, 'list');
        //     })
        //   }

        // })
        // getSpks().then(res => {
        //   console.log(res, 'res');
        // })

    }, [])


    const onFinish = (e: any) => {
        // localStorage.removeItem('audioData')
        console.log(e, 'event')
        // 测试需注释，测完记得解
        setLoading(true)
        const reader = new FileReader()
        reader.readAsDataURL(e.upload[0]?.file)
        reader.onload = () => {
            // localStorage.setItem('audioData', reader.result)
            delete e.upload
            const data = {
                // ref_audio_path: fileLink,
                ref_audio_path: 'https://sovtsdata.oss-cn-beijing.aliyuncs.com/test/%E3%80%90%E4%B8%AD%E7%AB%8B_neutral%E3%80%91%E8%AF%B4%E8%B5%B7%E6%9D%A5%EF%BC%8C%E5%85%B6%E5%AE%9E%E4%BD%A0%E5%92%8C%E5%8F%94%E7%88%B6%E7%A2%B0%E9%9D%A2%E7%9A%84%E8%87%AA%E7%94%B1%E5%B9%BF%E5%9C%BA%EF%BC%8C%E4%B8%8E%E6%88%91%E6%89%8B%E4%B8%8B%E6%9F%A5%E5%88%B0%E7%9A%84%E3%80%81%E7%96%91%E4%BC%BC%E8%B4%9D%E5%86%85%E7%89%B9%E6%9C%80%E5%90%8E%E5%87%BA%E7%8E%B0%E7%9A%84%E5%9C%B0%E6%96%B9%E5%BE%88%E8%BF%91%E3%80%82.wav?Expires=1765255398&OSSAccessKeyId=TMP.3KqswkCsXeKVJdkDXSUsKNrGCpzaf8BUpKSxurBrrDJNcpFaFZyZUFrUrsinPYyLeY4vMcsVMWDp5JATcSahGAyGfSLD8Q&Signature=rEaeSdlEEvdXhDIgjrlZ3Kb6Z6s%3D',
                text: e?.text,
                text_lang: e?.text_lang,
                prompt_text: e?.prompt_text,
                prompt_lang: e?.prompt_lang
            }

            // 获取
            getTTS(data).then(res => {
                console.log(res, 'res');
                if (res.status === 200 && res?.data) {
                    const source = URL.createObjectURL(res.data)
                    setAudioUrl(source)
                    setLoading(false)
                }
            })
        }
    }
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        console.log('Upload event:', e);

        if (e?.fileList.length <= 0) {

            // 如果为空那么就清空波形
            // document.getElementById('uploadAudio')!.innerHTML = ''
            return [];
        }
        if (
            !e?.fileList[0]?.name.includes('wav') &&
            !e?.fileList[0]?.name.includes('WAV') &&
            !e?.fileList[0]?.name.includes('mp3')
        ) return null;

        const reader = new FileReader()
        // waveSurferCreate(e.file, '#uploadAudio')
        reader.readAsDataURL(e.file)
        localStorage.removeItem('audioData') //先清后加 防获取本地存储老数据
        reader.onload = () => {
            localStorage.setItem('audioData', reader.result as string)
            const ref_audio_path: any = localStorage.getItem('audioData')
            // getFileLink({ file: ref_audio_path, isBase64: true, fileName: e?.fileList[0]?.name || '测试' }).then(res => {
            //     console.log(res, 'res');
            //     if (res.status === 200 && res.data) {
            //         setFileLink(res.data?.filePath)
            //     }
            // })
        }
        if (e?.fileList && e.fileList.length > 0 && e.file) {
            e.fileList[0].file = e?.file
        }

        return e?.fileList;
    };

    const getSource = (file: File) => {
        const isAudio = file.type.includes('audio/');
        if (!isAudio) {
            messageApi.open({
                type: 'error',
                content: '仅支持上传音频文件（如MP3/WAV等）',
            });
            return false;
        }

        return false;

    };

    // const waveSurferCreate = (source: File, key: string) => {
    //   const waveSurfer = WaveSurfer.create({
    //     container: key,
    //     waveColor: 'rgba(252, 221, 20, 1)',
    //     progressColor: 'rgba(34, 31, 28, 0.8)',
    //     url: source ? URL.createObjectURL(source) : '',
    //     // url: '',
    //     // 显示默认的媒体控件 用传入的音频作为显隐条件
    //     mediaControls: !!source,

    //   })
    //   waveSurfer.on('click', () => {
    //     waveSurfer.play()
    //   })
    // }


    return (
        <div className='tts-component'>
            {contextHolder}
            <WavesurferPlayer
                url={audioUrl}
                height={100}
                waveColor="violet"
            />

            <Form
                form={form}
                name="voice"
                className='formstyle'
                onFinish={onFinish}
                autoComplete="off"
            >
                <div style={{ width: '45%', minWidth: 350 }}>
                    <Item label={null}
                        name="text"
                        rules={[{ required: true, message: '请输入输出文本' }]}
                    >
                        <TextArea
                            className='textArea'
                            placeholder='请输入配音文字'
                            style={{
                                resize: 'none',
                                width: '90%',
                                height: 400,
                                paddingLeft: 10,
                                paddingTop: 10
                            }}
                            autoSize={false}
                        />
                    </Item>
                </div>
                <div style={{ width: '45%', minWidth: 400 }}>
                    {/* 模型切换 */}
                    {/* <div className='model-select'>
          <Item label={null} />
          <Item
            label="模型选择"
            name="model"
            initialValue={'gpt-sovts-v2'}
            rules={[{ required: true, message: '请选择模型' }]}
          >
            <Select style={{ width: 200 }}>
              <Option value="gpt-sovts-v2">gpt-sovts-v2</Option>
              <Option value="gpt-sovts">gpt-sovts</Option>
              <Option value="gpt-sovts-v3">gpt-sovts-v3</Option>
            </Select>
          </Item>
          <Item
            label="模型选择"
            name="model"
            initialValue={'gpt-sovts-v2'}
            rules={[{ required: true, message: '请选择模型' }]}
          >
            <Select style={{ width: 200 }}>
              <Option value="gpt-sovts-v2">gpt-sovts-v2</Option>
              <Option value="gpt-sovts">gpt-sovts</Option>
              <Option value="gpt-sovts-v3">gpt-sovts-v3</Option>
            </Select>
          </Item>
        </div> */}
                    {/* 上传 */}
                    <Item
                        name="upload"
                        label={null}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="提示：仅支持MP3/WAV等音频格式"
                        rules={[
                            {
                                required: true,
                                message: '请上传参考音频文件',
                            },
                            () => ({
                                validator(_, value) {
                                    // console.log(value, 'value');
                                    if (value && value[0]?.originFileObj) {
                                        setIshow(false)
                                        const isAudio = value[0].originFileObj.type.includes('audio/');
                                        if (isAudio) {
                                            return Promise.resolve();
                                        }
                                    }
                                    setIshow(true)
                                    return Promise.reject(new Error('仅支持上传音频文件（如MP3/WAV等）'));
                                },
                            }),
                        ]}
                    >
                        <Upload
                            name="audioUrl"
                            maxCount={1}
                            accept='audio/*'
                            beforeUpload={(e) => getSource(e)}
                        >
                            {isShow && <Button icon={<UploadOutlined />}>请上传参考音频文件</Button>}
                        </Upload>
                    </Item>
                    {/* 参考文案 */}
                    {/* <Item label="参考文本" name="prompt_text">
          <TextArea />
        </Item> */}
                    {/* 参考音频语言 */}
                    {/* <Item
          label="参考音频语言"
          name="prompt_lang"
          rules={[{ required: true, message: '请选择音频语言' }]}>
          <Select>
            <Option value="zh">中文</Option>
            <Option value="en">英文</Option>
          </Select>
        </Item> */}
                    {/* 输出文本◊ */}

                    {/* 输出文本语言 */}
                    <Item
                        label="输出文本语言"
                        name="text_lang"
                        style={{ width: 240 }}
                        initialValue='zh'
                        rules={[{ required: true, message: '请选择音频语言' }]}>
                        <Select>
                            <Option value="zh">中文</Option>
                            <Option value="en">英文</Option>
                        </Select>
                    </Item>
                    {/* 文本切割方式 */}
                    <Item
                        label="文本切割方式"
                        name="text_split_method"
                        initialValue={'cut0'}
                        style={{ width: 240 }}
                        rules={[{ required: true, message: '请选择文本切割方式' }]}>
                        <Select>
                            <Option value="cut0">不切</Option>
                            <Option value="cut1">凑四句一切</Option>
                            <Option value="cut2">50字一切</Option>
                            <Option value="cut3">按中文。切</Option>
                            <Option value="cut4">按英文.切</Option>
                            <Option value="cut5">按标点符号切</Option>
                        </Select>
                    </Item>
                    {/* 语速 */}
                    <Item
                        label="语速"
                        name="speed_factor"
                        initialValue={1}
                    >
                        <Slider
                            style={{ width: 300 }}
                            tooltip={{ formatter }}
                            // range={{ editable: true, }}
                            max={2}
                            min={0.1}
                            step={0.1}
                            marks={
                                { 0.1: '0.1x', 0.5: '0.5x', 1: '1x', 1.5: '1.5x', 2: '2x' }
                            }
                        />
                    </Item>
                    <div>
                        <Item label={null} style={{ alignItems: 'center' }}>
                            <Button type="primary" htmlType="submit" loading={loading} disabled={!!loading}>
                                合成语音
                            </Button>
                        </Item>
                    </div>
                </div>
            </Form>
            <>
                {
                    audioUrl ?
                        <audio src={audioUrl} controls /> : null
                }
                <div id='wave'></div>
            </>
        </div>
    )
}

export default TTSComponent
