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
      message.success(response.message || 'Punch in successful!');
      mutate(); // Refresh data
      return response;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Punch in failed';
      message.error(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const punchOut = async (empId: number) => {
    setLoading(true);
    try {
      const response = await attendanceService.punchOut(empId);
      message.success(response.message || 'Punch out successful!');
      mutate(); // Refresh data
      return response;
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Punch out failed');
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