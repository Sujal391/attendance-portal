import { apiClient } from '@/lib/api/client';
import API_ENDPOINTS from '@/lib/api/endpoint';
import type {
  PunchInDto,
  AttendanceRecord,
  MonthlyAttendanceReport,
  AttendanceResponse,
} from '@/lib/types';

export const attendanceService = {
  /**
   * Punch in with face verification
   */
  punchIn: async (data: PunchInDto): Promise<AttendanceResponse> => {
    const formData = new FormData();
    formData.append('EmpId', data.empId.toString());
    formData.append('Latitude', data.latitude.toString());
    formData.append('Longitude', data.longitude.toString());
    formData.append('Reason', data.reason);
    formData.append('Photo', data.photo);

    const response = await apiClient.post<AttendanceResponse>(
      API_ENDPOINTS.ATTENDANCE.PUNCH_IN,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  /**
   * Punch out
   */
  punchOut: async (empId: number): Promise<AttendanceResponse> => {
    const response = await apiClient.post<AttendanceResponse>(
      API_ENDPOINTS.ATTENDANCE.PUNCH_OUT(empId)
    );
    return response.data;
  },

  /**
   * Get monthly attendance report
   */
  getMonthlyReport: async (
    year: number,
    month: number
  ): Promise<MonthlyAttendanceReport> => {
    const response = await apiClient.get<MonthlyAttendanceReport>(
      API_ENDPOINTS.ATTENDANCE.MONTHLY,
      {
        params: { year, month },
      }
    );
    return response.data;
  },

  /**
   * Get attendance by employee ID
   */
  getByEmployee: async (
    empId: number,
    year?: number,
    month?: number
  ): Promise<AttendanceRecord[]> => {
    const response = await apiClient.get<AttendanceRecord[]>(
      API_ENDPOINTS.ATTENDANCE.BY_EMPLOYEE(empId),
      {
        params: { year, month },
      }
    );
    return response.data;
  },
};

export default attendanceService;