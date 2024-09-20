// components/MultipleFileUpload.js
import React, { useState } from 'react';
import { Upload, Button, Modal, message, UploadFile } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface ImageUploadProps {
  onChange?: any;
  value: UploadFile[];
  max: number;
}

const MultipleFileUpload = ({
  onChange,
  value,
  max
}: ImageUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>(value);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  // Image validation rules
  const beforeUpload = (file : File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return Upload.LIST_IGNORE;
    }

    return isJpgOrPng && isLt2M;
  };

  // Handle file changes
  const handleChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList)
    onChange([...newFileList])
  };

  // Handle image preview
  const handlePreview = async (file: any) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  // Handle modal close
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
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default MultipleFileUpload;