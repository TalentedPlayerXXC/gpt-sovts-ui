    //   <Form
    //     form={form}
    //     name="voice"
    //     // labelCol={{ span: 8 }}
    //     // wrapperCol={{ span: 16 }}
    //     className='formstyle'
    //     // style={{ maxWidth: 1200 }}
    //     onFinish={onFinish}
    //     autoComplete="off"
    //   >
    //     <div style={{ width: '45%', minWidth: 400 }}>
    //       <Item label={null} name="text" rules={[{ required: true, message: '请输入输出文本' }]}>
    //         <TextArea
    //           className='textArea'
    //           placeholder='请输入配音文字'
    //           style={{ resize: 'none',width:'90%', height: 480, paddingLeft: 10, paddingTop: 10 }}
    //           autoSize={false}
    //         />
    //       </Item>
    //     </div>
    //     <div style={{ width: '45%', minWidth: 400 }}>

    //       {/* 模型切换 */}
    //       {/* <div className='model-select'>
    //       <Item label={null} />
    //       <Item
    //         label="模型选择"
    //         name="model"
    //         initialValue={'gpt-sovts-v2'}
    //         rules={[{ required: true, message: '请选择模型' }]}
    //       >
    //         <Select style={{ width: 200 }}>
    //           <Option value="gpt-sovts-v2">gpt-sovts-v2</Option>
    //           <Option value="gpt-sovts">gpt-sovts</Option>
    //           <Option value="gpt-sovts-v3">gpt-sovts-v3</Option>
    //         </Select>
    //       </Item>
    //       <Item
    //         label="模型选择"
    //         name="model"
    //         initialValue={'gpt-sovts-v2'}
    //         rules={[{ required: true, message: '请选择模型' }]}
    //       >
    //         <Select style={{ width: 200 }}>
    //           <Option value="gpt-sovts-v2">gpt-sovts-v2</Option>
    //           <Option value="gpt-sovts">gpt-sovts</Option>
    //           <Option value="gpt-sovts-v3">gpt-sovts-v3</Option>
    //         </Select>
    //       </Item>
    //     </div> */}
    //       {/* 上传 */}
    //       <Item
    //         name="upload"
    //         label={null}
    //         valuePropName="fileList"
    //         getValueFromEvent={normFile}
    //         extra="提示：仅支持MP3/WAV等音频格式"
    //         rules={[
    //           {
    //             required: true,
    //             message: '请上传参考音频文件',
    //           },
    //           () => ({
    //             validator(_, value) {
    //               // console.log(value, 'value');
    //               if (value && value[0]?.originFileObj) {
    //                 setIshow(false)
    //                 const isAudio = value[0].originFileObj.type.includes('audio/');
    //                 if (isAudio) {
    //                   return Promise.resolve();
    //                 }
    //               }
    //               setIshow(true)
    //               return Promise.reject(new Error('仅支持上传音频文件（如MP3/WAV等）'));
    //             },
    //           }),
    //         ]}
    //       >
    //         <Upload
    //           name="audioUrl"
    //           maxCount={1}
    //           accept='audio/*'
    //           beforeUpload={(e) => getSource(e)}
    //         >
    //           {isShow && <Button icon={<UploadOutlined />}>请上传参考音频文件</Button>}
    //         </Upload>
    //       </Item>
    //       <Item label={null}>
    //         <AudioRecorder
    //           WaveSurfer={WaveSurfer}
    //           disabled={isShow}
    //         />
    //         <div ref={containerRef} style={{
    //           // width: '300px',
    //           // height: '200px'
    //         }} />
    //       </Item>
    //       {/* 参考文案 */}
    //       {/* <Item label="参考文本" name="prompt_text">
    //       <TextArea />
    //     </Item> */}
    //       {/* 参考音频语言 */}
    //       {/* <Item
    //       label="参考音频语言"
    //       name="prompt_lang"
    //       rules={[{ required: true, message: '请选择音频语言' }]}>
    //       <Select>
    //         <Option value="zh">中文</Option>
    //         <Option value="en">英文</Option>
    //       </Select>
    //     </Item> */}
    //       {/* 输出文本◊ */}

    //       {/* 输出文本语言 */}
    //       <Item
    //         label="输出文本语言"
    //         name="text_lang"
    //         rules={[{ required: true, message: '请选择音频语言' }]}>
    //         <Select>
    //           <Option value="zh">中文</Option>
    //           <Option value="en">英文</Option>
    //         </Select>
    //       </Item>
    //       {/* 文本切割方式 */}
    //       <Item
    //         label="文本切割方式"
    //         name="text_split_method"
    //         initialValue={'cut0'}
    //         rules={[{ required: true, message: '请选择文本切割方式' }]}>
    //         <Select style={{ width: 200 }}>
    //           <Option value="cut0">不切</Option>
    //           <Option value="cut1">凑四句一切</Option>
    //           <Option value="cut2">50字一切</Option>
    //           <Option value="cut3">按中文。切</Option>
    //           <Option value="cut4">按英文.切</Option>
    //           <Option value="cut5">按标点符号切</Option>
    //         </Select>
    //       </Item>
    //       {/* 语速 */}
    //       <Item
    //         label="语速"
    //         name="speed_factor"
    //         initialValue={1}
    //       >
    //         <Slider
    //           style={{ width: 300 }}
    //           tooltip={{ formatter }}
    //           // range={{ editable: true, }}
    //           max={2}
    //           min={0.1}
    //           step={0.1}
    //           marks={
    //             { 0.1: '0.1x', 0.5: '0.5x', 1: '1x', 1.5: '1.5x', 2: '2x' }
    //           }
    //         />
    //       </Item>
    //     </div>
    //     <Item label={null} style={{alignItems: 'center' }}>
    //       <Button type="primary" htmlType="submit" loading={loading} disabled={!!loading}>
    //         合成语音
    //       </Button>
    //     </Item>
    //   </Form>