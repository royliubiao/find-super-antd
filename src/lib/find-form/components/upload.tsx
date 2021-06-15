import * as React from "react";
import Packages from '../../../utils/index';
const { useState, useEffect, useMemo, useRef, useCallback } = React
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
interface upload {
  item: any,
  listIndex?: number[],
  fileList?: any[]
}
const Index: React.FC<upload> = (props) => {
  const UploadRef = useRef(null)
  let { antd, Api, GetPrivateToken, GetToken } = Packages.use('find-super-antd')
  let { Form, Upload, Modal, message } = antd
  const { item, listIndex }: any = {
    item: {},
    ...props
  }

  /** 文件上传数据 */
  const [file, setFile] = useState<any>({
    fileType: 'image',
    previewVisible: false,
    previewImage: '',
    fileList: []
  })
  useEffect(() => {
    // console.log("upload------------------", UploadRef.current.state.fileList)
    saveFileList(UploadRef && UploadRef.current && UploadRef.current.state && UploadRef.current.state.fileList)
  }, [item.value])
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  /** 缓存fileList */
  const saveFileList = (files) => {
    let arr = files && files.length ? files : item.value
    console.log('缓存fileList', arr)
    arr && arr.length && arr.map((aitem, index) => {
      if (aitem.uid === undefined) {
        aitem.uid = index
      }
    })
    setFile({ ...file, fileList: arr ? [...arr] : [] })
  }
  /** 创建文件list */
  const createFileList = (files) => {
    let { fileList } = files
    // console.log('创建文件list--------------1', fileList)
    let newFiles = []

    fileList.map((fileItem, index) => {
      //formList && 返回简易的数据
      if (listIndex && item.url) {
        fileItem = {
          uid: fileItem.uid,
          key: fileItem.response && fileItem.response.data.key || fileItem.key || '',
          url: fileItem.response && fileItem.response.url || fileItem.url || ''
        }
      }

      if (fileItem.url || fileItem.status) {
        newFiles.push(fileItem)
      }
    })

    // console.log('创建文件list--------------2', newFiles)
    return newFiles;
  }
  /** 关闭查看大图 */
  const handleCancel = () => {
    setFile({ ...file, previewVisible: false });
  }
  /** 查看大图 */
  const handlePreview = async picture => {
    console.log('查看大图', picture)
    let fileType = 'image'
    /** 如果是pdf */
    if ((picture && picture.type && picture.type.indexOf('pdf') !== -1) || (picture && picture.url && picture.url.indexOf('pdf') !== -1)) {
      window.open(picture.url || picture.response.url)
      return
    }
    /** 如果是图片 */
    if (!picture.url && !picture.preview) {
      picture.preview = await getBase64(picture.originFileObj);
    }
    /** 如果是视频 */
    if ((picture && picture.type && picture.type.indexOf('mp4') !== -1) || (picture && picture.url && picture.url.indexOf('mp4') !== -1)) {
      fileType = 'video'
    }
    //如果是表格 -file: '.xlsx, .xls, .csv,',
    if (picture && picture.name && (picture.name.indexOf('xlsx') !== -1 || picture.name.indexOf('xls') !== -1 || picture.name.indexOf('csv') !== -1)) {
      return message.warning('暂不支持查看表格~')
    }
    setFile({
      ...file,
      previewImage: picture.url || picture.preview,
      previewVisible: true,
      fileType
    });
  };
  /** 修改图片list */
  const handleChange = ({ fileList }) => {
    let newList: any = []
    // console.log('修改图片list--------------2', newList)
    fileList.map((fileItem, index) => {
      //formList && 返回简易的数据
      if (listIndex && item.url) {
        fileItem = {
          uid: fileItem.uid,
          key: fileItem.response && fileItem.response.data.key || fileItem.key || '',
          url: fileItem.response && fileItem.response.url || fileItem.url || ''
        }
      }

      if (fileItem.url || fileItem.status) {
        newList.push(fileItem)
      }
    })

    setFile({ ...file, fileList: newList })
  }

  /** 图片上传前 */
  const beforeUpload = (newFile, fileList): Promise<any> => {
    let next = true

    //如果总数超过最大值 
    if (fileList.length + file.fileList.length > item.maxFileNum) {
      next = false
      message.warning({
        content: `总数量不能超过最大值${item.maxFileNum}`
      })
    }

    //如果图片超过规定大小{
    if (item.uploadMaxSize && newFile.size > item.uploadMaxSize * 1000 * 1000) {
      console.log('图片上传前----------------', newFile.size, item.uploadMaxSize * 1024 * 1024)
      next = false
      message.warning({
        content: `${newFile.name} ->${Math.floor((newFile.size / 1000 / 1000) * 100) / 100}MB 大于 ${item.uploadMaxSize}MB,不允许上传`
      })
    }
    return new Promise((resolve, reject) => {
      if (next) {
        console.log('newFile', newFile)
        resolve(newFile)
      } else {
        console.log('newFile', newFile)
        reject()
      }
    })
  }
  //图片上传
  const customRequest = (detail: any) => {
    let param: any = {
      fileName: detail.file.name
    }


    if (!GetToken) {
      return
    }

    let apiName = item.filePrivateName ? GetPrivateToken : GetToken
    let fileType = detail.file.name.substring(detail.file.name.lastIndexOf(".") + 1);
    console.log('图片上传------------', name)

    if (item.filePrivateName) {
      param = {
        business: item.filePrivateName,
        data: {
          mimeType: fileType
        }
      }
    }

    Api[apiName] && Api[apiName](param).then((file: any) => {
      console.log(file.data.data, 'token')
      let data = new FormData()
      data.append('token', file.data.data.token)
      data.append('key', file.data.data.key)
      data.append('file', detail.file)
      axios({
        method: 'POST',
        url: detail.action,
        data
      }).then(res => {
        let newFile = { ...res, url: file.data.data.url }
        // console.log('图片上传------------', newFile)
        // console.log('图片上传------------', detail)
        // console.log('图片上传------------file.data.data.url', file)
        detail.onSuccess(newFile, detail.file)
      }).catch(err => {
        detail.onError("上传失败")
      })
    })
  }
  //图片删除
  const onRemove = (detail: any) => {
    console.log('图片删除', detail, file.fileList)
    if (detail && (detail.key || (detail.response && detail.response.data && detail.response.data.key))) {
      Api[item.DeleteFile]({ key: detail.key || detail.response.data.key }).then(res => {
        return Promise.resolve(true)
      })
    } else {
      return Promise.resolve(true)
    }

  }
  /** 转换文件数据 */
  const transformFile = (files) => {
    console.log('转换文件数据--------', files, file.fileList)
    // return files
  }
  /** 自定义预览逻辑 */
  const PreviewFile = (file) => {
    return new Promise((resolve, reject) => {

      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log('--------------', reader)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error);
    })
  }


  /** 穿件文件上传后缀 */
  const fileAccept = (accept?: undefined | string | string[]) => {
    let str = 'image/*,.jpg,.png,.jpeg,.pdf'

    const acceptTypes = {
      file: '.xlsx, .xls, .csv,',
      image: 'image/*,.jpg,.png,.jpeg,.pdf,',
      video: 'video/*,.mp4,'
    }

    /** 如果是字符在->具体的文件类型 */
    if (accept && typeof accept === 'string') {
      str = accept
    }
    /** 如果是数组  */
    if (accept && Array.isArray(accept)) {
      str = ''
      accept.map((acc, accIndex) => {
        str += acceptTypes[acc]
      })
      console.log('如果是数组', str)
    }

    return str
  }
  return (
    <>
      { <Form.Item
        name={listIndex ? [...listIndex, item.name] : item.name}
        label={item.label}
        rules={[{
          required: item.required === false ? false : true,
          message: item.errMessage ? item.errMessage : `请选择${item.label}！`,
        },
        ]}
        valuePropName={"fileList"}
        getValueFromEvent={createFileList}
      // extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload
          ref={UploadRef}
          disabled={item.disabled}
          name={item.name}
          action="https://up.qiniup.com"
          multiple
          listType={item.listType || 'picture-card'}
          onPreview={handlePreview}
          onChange={handleChange}
          customRequest={customRequest}
          previewFile={async (file): Promise<any> => PreviewFile(file)}
          onRemove={onRemove}
          // accept={item.accept ? item.accept : 'image/*,.jpg,.png,.jpeg,.pdf'}
          accept={fileAccept(item.accept)}
          beforeUpload={beforeUpload}
        >
          {
            file.fileList.length >= item.maxFileNum ? null : (
              !item.disabled && <div>
                <PlusOutlined />
                <p>{item.uploadText}</p>
              </div>
            )
          }
        </Upload>
      </Form.Item>}
      {
        item.title && <p className="upload__title">{item.title}</p>
      }
      {/* 图片放大查看 */}
      <Modal
        width={1000}
        visible={file.previewVisible}
        closable={true}
        cancelText="关闭"
        okText='确认'
        title={'查看'}
        onCancel={handleCancel}
        onOk={handleCancel}
      >
        {/* 图片 */}
        {
          file.fileType === 'image' && <img alt="example" style={{ width: '100%' }} src={file.previewImage} />
        }
        {/* 视频 */}
        {
          file.fileType === 'video' && <video controls autoPlay style={{ width: '100%' }} src={file.previewImage}></video>
        }
      </Modal>
    </>
  )
}
export default Index;