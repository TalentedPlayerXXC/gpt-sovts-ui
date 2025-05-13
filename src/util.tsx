
// base64位转blob
const base64ToBlob = (base64 = "", mimeType = '') => {
    const byteString = atob(base64.split(',')[1]); // 解码 base64（去掉 data: 前缀）
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeType || base64.split(',')[0].split(':')[1].split(';')[0] });
}

export {
    base64ToBlob,
}