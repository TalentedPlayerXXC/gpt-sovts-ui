import { Button } from 'antd'
import { UploadOutlined, PlayCircleFilled,AudioFilled } from '@ant-design/icons'
function AudioRecorder(props: any) {
    const { WaveSurfer } = props;

    const audioplay = () => {
        // WaveSurfer.play();
        
    }
    const audiostop = () => {
        WaveSurfer.stop();
    }
    return (
        <div>
            <Button icon={<AudioFilled />}>录音</Button>
            <Button icon={<PlayCircleFilled />} onClick={audioplay}>播放</Button>
            <Button danger onClick={audiostop}>停止</Button>
            <Button icon={<UploadOutlined />}>上传参考音频</Button>
        </div>
    )
}
export default AudioRecorder;