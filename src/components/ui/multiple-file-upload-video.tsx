import React, { useState } from 'react';
import { Upload, Modal, Button, message, UploadFile } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';

interface VideoUploadProps {
  onChange?: any;
  value: UploadFile[];
  max: number;
}

const MultipleVideoFileUpload = (
  {
    onChange,
    value,
    max
  }: VideoUploadProps
) => {
  const [fileList, setFileList] = useState<UploadFile[]>(value);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewVideo, setPreviewVideo] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const beforeUpload = (file: File) => {
    const isVideo = file.type === 'video/mp4' || file.type === 'video/ogg' || file.type === 'video/webm';
    if (!isVideo) {
      message.error('You can only upload MP4/OGG/WEBM video files!');
      return Upload.LIST_IGNORE;
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Video must be smaller than 10MB!');
      return Upload.LIST_IGNORE;
    }

    return isVideo && isLt10M;
  };

  const handleChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
    onChange([...newFileList])
  }

  const handlePreview = async (file: any) => {
    setPreviewVideo(file.url || file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewVisible(false);

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
        multiple      
      >
        {fileList.length >= max ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload Video</div>
          </div>
        )}
      </Upload>

      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <video
          controls
          style={{ width: '100%' }}
          src={previewVideo}
        >
          Your browser does not support the video tag.
        </video>
      </Modal>
    </>
  );
};

export default MultipleVideoFileUpload;
