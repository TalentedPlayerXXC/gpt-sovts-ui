import { apis,files,qwens } from "./request";
import axios from "axios"

function getTTS({ ref_audio_path = '', text = '', prompt_text = '' }) {
// function getTTS(data:any) {
    return apis({
        method: 'post',
        url: '/tts',
        data: {
            // ...data,
            text,
            text_lang: 'zh',
            // ref_audio_path: '/Users/mac/Downloads/鸣潮/reference_audios/emotions/漂泊者_男/中文/【开心_happy】开一次空间隧道会耗费你大量算力……黑海岸还需要你维持运转。.wav',
            ref_audio_path: ref_audio_path || '',
            prompt_lang: 'zh',
            prompt_text,
            text_split_method: 'cut5', //文本切割方式
            batch_size: 1,
            media_type: 'wav',
            streaming_mode: true,
            speed_factor: 1 // 语速
        },

        // responseType: 'arraybuffer' // 设置响应类型为 ArrayBuffer
        responseType: 'blob'
    })
    // return axios({
    //     method: 'post',
    //     url: '/api/tts',
    //     data: {
    //         // ...data,
    //         text,
    //         text_lang: 'zh',
    //         // ref_audio_path: '/Users/mac/Downloads/鸣潮/reference_audios/emotions/漂泊者_男/中文/【开心_happy】开一次空间隧道会耗费你大量算力……黑海岸还需要你维持运转。.wav',
    //         ref_audio_path: ref_audio_path || '',
    //         prompt_lang: 'zh',
    //         prompt_text,
    //         text_split_method: 'cut5', //文本切割方式
    //         batch_size: 1,
    //         media_type: 'wav',
    //         streaming_mode: true,
    //         speed_factor: 1 // 语速
    //     },

    //     // responseType: 'arraybuffer' // 设置响应类型为 ArrayBuffer
    //     responseType: 'blob'
    // })
}
function qwen(formData:any) {
// function getTTS(data:any) {
    return qwens({
        method: 'post',
        url: '/voice-clone',
        // data: {
        //     // ...data,
        //     text: '12345，上山打老虎，老虎没打到，打到小松鼠。',
        //     ref_audio_path: '/Users/coderxu/Downloads/【默认】为了他的命，也为了我们自己，得想办法把他抓回来，免得更麻烦。.wav',
        //     // ref_audio_path: ref_audio_path || '',
        //     ref_text:'为了他的命，也为了我们自己，得想办法把他抓回来，免得更麻烦。',
        //     rate:'1.0',
        // },

        // // responseType: 'arraybuffer' // 设置响应类型为 ArrayBuffer
        // responseType: 'blob'
        data:formData
    })
    // return axios({
    //     method: 'post',
    //     url: '/api/tts',
    //     data: {
    //         // ...data,
    //         text,
    //         text_lang: 'zh',
    //         // ref_audio_path: '/Users/mac/Downloads/鸣潮/reference_audios/emotions/漂泊者_男/中文/【开心_happy】开一次空间隧道会耗费你大量算力……黑海岸还需要你维持运转。.wav',
    //         ref_audio_path: ref_audio_path || '',
    //         prompt_lang: 'zh',
    //         prompt_text,
    //         text_split_method: 'cut5', //文本切割方式
    //         batch_size: 1,
    //         media_type: 'wav',
    //         streaming_mode: true,
    //         speed_factor: 1 // 语速
    //     },

    //     // responseType: 'arraybuffer' // 设置响应类型为 ArrayBuffer
    //     responseType: 'blob'
    // })
}

// 获取模型列表
function getModels() {
    return axios({
        method: 'get',
        url: '/api/models',
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
    return files({
        method: 'post',
        url: '/getFileLink',
        data: {
            fileName,
            isBase64,
            file
        }
    })
    // return axios({
    //     method: 'post',
    //     url: '/file/getFileLink',
    //     data: {
    //         fileName,
    //         isBase64,
    //         file
    //     }
    // })
}

// 获取文件列表

function getEmotionList() {
    return axios({
        method: 'get',
        url: '/file/getEmotionList'
    })
}

export {
    getTTS,
    getFileLink,
    getModels,
    getSpks,
    getEmotionList,
    qwen
}   