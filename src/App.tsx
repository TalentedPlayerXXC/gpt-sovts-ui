import { useEffect, useRef, useState } from 'react'
import { Button, Input, Form, Upload, message, Select, Slider } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import WaveSurfer from 'wavesurfer.js'
import { getTTS, getFileLink, getModels, getSpks } from './services/index'
import './App.css'

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [audioUrl, setAudioUrl] = useState('')
  const [fileLink, setFileLink] = useState('')
  const [loading, setLoading] = useState(false)
  // const [data, setData] = useState([])
  const [isShow, setIshow] = useState(true)
  const [form] = Form.useForm()
  const Item = Form.Item
  const TextArea = Input.TextArea
  const Option = Select.Option

  const formatter = (val: string) => `${val}`
  // 初始化列表
  useEffect(() => {
    getModels().then(res => {
      // console.log(res, 'res');
      if (res.status === 200 && res?.data && res.data.length > 0) {
        getSpks(res.data[0]).then(list => {
          console.log(list, 'list');
        })
      }

    })
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
        ref_audio_path: fileLink,
        text: e?.text,
        text_lang: e?.text_lang,
        prompt_text: e?.prompt_text,
        prompt_lang: e?.prompt_lang
      }

      // 获取
      // getTTS(data).then(res => {
      //   console.log(res, 'res');
      //   if (res.status === 200 && res?.data) {
      //     const source = URL.createObjectURL(res.data)
      //     setAudioUrl(source)
      //     setLoading(false)
      //   }
      // })
    }
  }
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    console.log('Upload event:', e);

    if (e?.fileList.length <= 0) return []
    if (
      !e?.fileList[0]?.name.includes('wav') &&
      !e?.fileList[0]?.name.includes('WAV') &&
      !e?.fileList[0]?.name.includes('mp3')
    ) return []
    const reader = new FileReader()
    waveSurferCreate(e.file, '#uploadAudio')
    reader.readAsDataURL(e.file)
    localStorage.removeItem('audioData') //先清后加 防获取本地存储老数据
    reader.onload = () => {
      localStorage.setItem('audioData', reader.result as string)
      const ref_audio_path: any = localStorage.getItem('audioData')
      getFileLink({ file: ref_audio_path, isBase64: true, fileName: e?.fileList[0]?.name || '测试' }).then(res => {
        console.log(res, 'res');
        if (res.status === 200 && res.data) {
          setFileLink(res.data?.filePath)
        }
      })
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

  const waveSurferCreate = (source: File, key: string) => {
    const waveSurfer = WaveSurfer.create({
      container: key,
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgba(100, 45, 0, 0.8)',
      url: source ? URL.createObjectURL(source) : '',
    })
    waveSurfer.on('click', () => {
      waveSurfer.play()
    })
  }


  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        {/* 上传 */}
        <Item
          name="upload"
          label="参考音频"
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
            {isShow && <Button icon={<UploadOutlined />}>Click to upload</Button>}

          </Upload>
        </Item>
        <div id='uploadAudio' style={{
          width: '300px',
          height: '200px'
        }} />
        <Item label="参考文本" name="prompt_text">
          <TextArea />
        </Item>
        <Item
          label="参考音频语言"
          name="prompt_lang"
          rules={[{ required: true, message: '请选择音频语言' }]}>
          <Select>
            <Option value="zh">中文</Option>
            <Option value="en">英文</Option>
          </Select>
        </Item>
        <Item label="输出文本" name="text" rules={[{ required: true, message: '请输入输出文本' }]}>
          <TextArea />
        </Item>
        <Item
          label="输出文本语言"
          name="text_lang"
          rules={[{ required: true, message: '请选择音频语言' }]}>
          <Select>
            <Option value="zh">中文</Option>
            <Option value="en">英文</Option>
          </Select>
        </Item>
        <Item
          label="文本切割方式"
          name="text_split_method"
          initialValue={'cut0'}
          rules={[{ required: true, message: '请选择文本切割方式' }]}>
          <Select style={{ width: 200 }}>
            <Option value="cut0">不切</Option>
            <Option value="cut1">凑四句一切</Option>
            <Option value="cut2">50字一切</Option>
            <Option value="cut3">按中文。切</Option>
            <Option value="cut4">按英文.切</Option>
            <Option value="cut5">按标点符号切</Option>
          </Select>
        </Item>
        <Item
          label="语速"
          name="speed_factor"
        >
          <Slider
            style={{ width: 300 }}
            tooltip={{ formatter }}
            // range={{ editable: true, }}
            max={2}
            step={0.1}
          />
        </Item>
        <Item label={null}>
          <Button type="primary" htmlType="submit" loading={loading} disabled={!!loading}>
            Submit
          </Button>
        </Item>
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

export default App
