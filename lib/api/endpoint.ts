export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/api/Auth/login',
    REGISTER: '/api/Auth/register',
    LOGOUT: '/api/Auth/logout',
  },

  // Employee endpoints
  EMPLOYEE: {
    BASE: '/api/Employee',
    BY_ID: (id: number) => `/api/Employee/${id}`,
    CREATE: '/api/Employee',
    UPDATE: (id: number) => `/api/Employee/${id}`,
    DELETE: (id: number) => `/api/Employee/${id}`,
  },

  // Upload endpoints
  UPLOAD: {
    EMPLOYEE_PHOTO: '/api/Upload/employee-photo',
  },

  // Attendance endpoints
  ATTENDANCE: {
    PUNCH_IN: '/api/Attendance/punchin',
    PUNCH_OUT: (empId: number) => `/api/Attendance/punchout/${empId}`,
    MONTHLY: '/api/Attendance/monthly',
    BY_EMPLOYEE: (empId: number) => `/api/Attendance/employee/${empId}`,
  },
} as const;

export default API_ENDPOINTS;