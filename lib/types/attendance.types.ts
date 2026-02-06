export interface PunchInDto {
  empId: number;
  latitude: number;
  longitude: number;
  reason: string;
  photo: File;
}

export interface PunchInFormData {
  empId: number;
  latitude: number;
  longitude: number;
  reason: string;
}

export interface PunchOutDto {
  empId: number;
}

export interface AttendanceRecord {
  id: number;
  empId: number;
  employeeName?: string;
  empCode?: string;
  date: string;
  punchInTime: string;
  punchOutTime?: string;
  latitude?: number;
  longitude?: number;
  reason?: string;
  status: 'Present' | 'Absent' | 'Half Day' | 'Late';
  totalHours?: number;
}

export interface MonthlyAttendanceReport {
  year: number;
  month: number;
  records: AttendanceRecord[];
  summary: {
    totalDays: number;
    presentDays: number;
    absentDays: number;
    halfDays: number;
    lateDays: number;
  };
}

export interface AttendanceQueryParams {
  year: number;
  month: number;
  empId?: number;
}

export interface AttendanceResponse {
  success: boolean;
  message: string;
  data?: AttendanceRecord;
}

export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  HalfDay = 'Half Day',
  Late = 'Late'
}