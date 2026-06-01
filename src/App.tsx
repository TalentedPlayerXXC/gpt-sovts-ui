import { useEffect, useState } from 'react'
import { Menu, } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons'
// import WavesurferPlayer from '@wavesurfer/react'
import { useLocation, useNavigate } from 'react-router';
import LoginComp from './LoginComp'
import './App.css'
import Routers from './routes';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_5168870_xxax0x7wlm8.js', // 在 iconfont.cn 上生成
});
const items = [
  {
    key: '/tts',
    label: "配音",
    icon: <IconFont type="icon-shengyin" />
  },
  {
    key: '/tts-beta',
    label: "一句话克隆(beta)",
    icon: <IconFont type="icon-ceshi" />
  },
  {
    key: '/voice-design',
    label: "声音设计(beta)",
    icon: <IconFont type="icon-shengyinsheji" />
  },
];
function App() {
  const navigate = useNavigate();
  // const [messageApi, contextHolder] = message.useMessage();
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname || '/tts');
  const changePath = (e: { key: string }) => {
    // console.log(e, 'e');
    navigate(e.key || '/tts')
    setPath(e.key || '/tts');
  }

  useEffect(() => {
    // 获取pathname判断是否为乱输的路径，如果是则跳转到默认路径
    if (!items.find(item => item.key === pathname)) {
      navigate('/tts');
      setPath('/tts');
    }
    // console.log('app useEffect');
  }, [pathname, navigate])
  return (
    <div className='app'>
      {/* {contextHolder} */}
      <LoginComp />
      <div style={{ width: "100%", display: 'flex', height: '100%' }}>
        <Menu
          className='menuclass'
          // defaultOpenKeys={['tts']}
          selectedKeys={[path]}
          mode="inline"
          items={items}
          // theme='dark'
          onClick={(e) => changePath(e)}
        />
        <Routers />
      </div>
    </div>
  )
}

export default App
