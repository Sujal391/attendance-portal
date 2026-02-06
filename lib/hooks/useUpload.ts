import { useState } from 'react';
import { message } from 'antd';
import { uploadService } from '@/services/upload.service';

export const useUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadEmployeeFacePhoto = async (employeeId: number, photo: File) => {
    setLoading(true);
    setUploadProgress(0);

    try {
      // Validate file
      if (!photo.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      if (photo.size > 5 * 1024 * 1024) {
        // 5MB limit
        throw new Error('Image size should be less than 5MB');
      }

      const response = await uploadService.uploadEmployeeFacePhoto(
        employeeId,
        photo
      );

      setUploadProgress(100);
      message.success(response.message || 'Face photo uploaded successfully!');
      return response;
    } catch (error: any) {
      message.error(
        error.message || error.response?.data?.message || 'Upload failed'
      );
      throw error;
    } finally {
      setLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  return {
    uploadEmployeeFacePhoto,
    loading,
    uploadProgress,
  };
};

export default useUpload;