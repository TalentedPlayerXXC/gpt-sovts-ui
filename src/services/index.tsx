// import request from "./request";
import axios from "axios"

// function getTTS({ ref_audio_path = '', text = '', prompt_text = '' }) {
function getTTS(data) {
    return axios({
        method: 'post',
        url: '/api/tts',
        // params: {
        //     text: '它是我与这世界的连结，见证我所经历的一切。',
        //     text_lang: 'zh',
        //     // ref_audio_path: '/Users/mac/Downloads/鸣潮/reference_audios/emotions/漂泊者_男/中文/【开心_happy】开一次空间隧道会耗费你大量算力……黑海岸还需要你维持运转。.wav',
        //     // ref_audio_path: '',
        //     // ref_audio_path: ref_audio_path || '',
        //     prompt_lang: 'zh',
        //     prompt_text: '开一次空间隧道会耗费你大量算力……黑海岸还需要你维持运转。',
        //     text_split_method: 'cut5',
        //     batch_size: 1,
        //     media_type: 'wav',
        //     streaming_mode: true,
        //     speed_factor: 1
        // },
        data: {
            ...data,
            // text,
            // text_lang: 'zh',
            // ref_audio_path: '/Users/mac/Downloads/鸣潮/reference_audios/emotions/漂泊者_男/中文/【开心_happy】开一次空间隧道会耗费你大量算力……黑海岸还需要你维持运转。.wav',
            // ref_audio_path: ref_audio_path || '',
            // prompt_lang: 'zh',
            // prompt_text,
            // text_split_method: 'cut5', //文本切割方式
            batch_size: 1,
            media_type: 'wav',
            streaming_mode: true,
            speed_factor: 1 // 语速
        },

        // responseType: 'arraybuffer' // 设置响应类型为 ArrayBuffer
        responseType: 'blob'
    })
}

// 获取模型列表
function getModels() {
    return axios({
        method: 'get',
        url: '/v2/models',
        // params: {
        //     text: '它是我与这世界的连结，见证我所经历的一切。',
        //     text_lang: 'zh',
        //     // ref_audio_path: '/Users/mac/Downloads/鸣潮/reference_audios/emotions/漂泊者_男/中文/【开心_happy】开一次空间隧道会耗费你大量算力……黑海岸还需要你维持运转。.wav',
        //     // ref_audio_path: '',
        //     // ref_audio_path: ref_audio_path || '',
        //     prompt_lang: 'zh',
        //     prompt_text: '开一次空间隧道会耗费你大量算力……黑海岸还需要你维持运转。',
        //     text_split_method: 'cut5',
        //     batch_size: 1,
        //     media_type: 'wav',
        //     streaming_mode: true,
        //     speed_factor: 1
        // },
        // responseType: 'blob'
    })
}
// 获取模型角色列表
function getSpks(modelName: string) {
    return axios({
        method: 'post',
        url: '/v2/spks',
        data: {
            model: modelName
        }
    })
}
// 获取文件地址
function getFileLink({ fileName = '', isBase64 = false, file = '' }) {
    return axios({
        method: 'post',
        url: '/file/getFileLink',
        data: {
            fileName,
            isBase64,
            file
        }
    })
}

export {
    getTTS,
    getFileLink,
    getModels,
    getSpks,
}   