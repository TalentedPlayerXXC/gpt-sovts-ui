import { useEffect, useState } from 'react'
import { message, } from 'antd'
import WavesurferPlayer from '@wavesurfer/react'
import LoginComp from './LoginComp'
import TTSComponent from './TTSComponent'
import './App.css'

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [audioUrl, setAudioUrl] = useState('')

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
    <div className='app'>
      {contextHolder}
      <LoginComp />
      <TTSComponent />
      <WavesurferPlayer
        url={audioUrl}
        height={100}
        waveColor="violet"
      />

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
