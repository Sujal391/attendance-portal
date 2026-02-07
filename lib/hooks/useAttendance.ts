import useSWR from 'swr';
import { useState } from 'react';
import { message } from 'antd';
import { attendanceService } from '@/services/attendance.service';
import type { PunchInDto, MonthlyAttendanceReport } from '@/lib/types';

export const useAttendance = (year?: number, month?: number) => {
  const [loading, setLoading] = useState(false);

  // Fetch monthly report
  const {
    data: report,
    error,
    mutate,
  } = useSWR<MonthlyAttendanceReport>(
    year && month ? `/attendance/monthly/${year}/${month}` : null,
    () => attendanceService.getMonthlyReport(year!, month!)
  );

  const punchIn = async (data: PunchInDto) => {
    setLoading(true);
    try {
      const response = await attendanceService.punchIn(data);
      message.success({
        content: response.message || 'Punch in successful!',
        key: 'punch-in-success',
        duration: 3,
      });
      mutate(); // Refresh data
      return response;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Punch in failed';
      message.error({
        content: errorMsg,
        key: 'punch-in-error',
        duration: 3,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const punchOut = async (empId: number) => {
    setLoading(true);
    try {
      const response = await attendanceService.punchOut(empId);
      message.success({
        content: response.message || 'Punch out successful!',
        key: 'punch-out-success',
        duration: 3,
      });
      mutate(); // Refresh data
      return response;
    } catch (error: any) {
      message.error({
        content: error.response?.data?.message || 'Punch out failed',
        key: 'punch-out-error',
        duration: 3,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    report,
    isLoading: !error && !report && (year !== undefined && month !== undefined),
    isError: error,
    loading,
    punchIn,
    punchOut,
    refresh: mutate,
  };
};

export default useAttendance;