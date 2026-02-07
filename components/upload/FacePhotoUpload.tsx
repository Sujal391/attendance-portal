'use client';

import { useState } from 'react';
import { Upload, Button, Card, Typography, message } from 'antd';
import { UploadOutlined, CameraOutlined } from '@ant-design/icons';
import { useUpload } from '@/lib/hooks';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/utils/constants';
import type { UploadFile } from 'antd/es/upload';

const { Title, Text } = Typography;

interface FacePhotoUploadProps {
  employeeId: number;
  employeeName?: string;
  onSuccess?: () => void;
}

export default function FacePhotoUpload({
  employeeId,
  employeeName,
  onSuccess,
}: FacePhotoUploadProps) {
  const { uploadEmployeeFacePhoto, loading } = useUpload();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning('Please select a photo first');
      return;
    }

    const file = fileList[0].originFileObj as File;

    try {
      await uploadEmployeeFacePhoto(employeeId, file);
      setFileList([]);
      onSuccess?.();
    } catch {
      // Error handled in hook
    }
  };

  const beforeUpload = (file: File) => {
    const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type);
    if (!isImage) {
      message.error('Only JPG/PNG images are allowed');
      return false;
    }
    const isLtMax = file.size < MAX_FILE_SIZE;
    if (!isLtMax) {
      message.error('Image must be smaller than 5MB');
      return false;
    }
    return false; // Prevent auto upload
  };

  return (
    <Card className="rounded-xl shadow-md">
      <Title level={4} className="!text-[#2872A1] !mb-2">
        <CameraOutlined className="mr-2" />
        Upload Employee Photo
      </Title>
      {employeeName && (
        <Text className="text-gray-500 block mb-4">
          Uploading photo for: <strong>{employeeName}</strong>
        </Text>
      )}

      <Upload
        listType="picture"
        maxCount={1}
        fileList={fileList}
        onChange={({ fileList: newList }) => setFileList(newList)}
        beforeUpload={beforeUpload}
        accept="image/jpeg,image/jpg,image/png"
      >
        <Button icon={<UploadOutlined />}>Select Photo</Button>
      </Upload>

      <Button
        type="primary"
        onClick={handleUpload}
        loading={loading}
        disabled={fileList.length === 0}
        className="mt-4"
        style={{
          background: 'linear-gradient(135deg, #2872A1 0%, #1d5580 100%)',
          border: 'none',
        }}
      >
        Upload Photo
      </Button>
    </Card>
  );
}
