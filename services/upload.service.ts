import { apiClient } from '@/lib/api/client';
import API_ENDPOINTS from '@/lib/api/endpoint';
import type { UploadResponse } from '@/lib/types';

export const uploadService = {
  /**
   * Upload employee face photo for registration
   */
  uploadEmployeeFacePhoto: async (
    employeeId: number,
    photo: File
  ): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('EmployeeId', employeeId.toString());
    formData.append('Photo', photo);

    const response = await apiClient.post<UploadResponse>(
      API_ENDPOINTS.UPLOAD.EMPLOYEE_PHOTO,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },
};

export default uploadService;