// User roles (4 roles only - employees have no portal access)
export const USER_ROLES = {
  ADMIN: 'Admin',
  HR: 'Hr',
  MANAGER: 'Manager',
  SUPERVISOR: 'Supervisor',
} as const;

export const ROLE_OPTIONS = [
  { label: 'Admin', value: USER_ROLES.ADMIN },
  { label: 'HR', value: USER_ROLES.HR },
  { label: 'Manager', value: USER_ROLES.MANAGER },
  { label: 'Supervisor', value: USER_ROLES.SUPERVISOR },
];

// Attendance status
export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  HALF_DAY: 'Half Day',
  LATE: 'Late',
} as const;

export const STATUS_COLORS = {
  [ATTENDANCE_STATUS.PRESENT]: 'success',
  [ATTENDANCE_STATUS.ABSENT]: 'error',
  [ATTENDANCE_STATUS.HALF_DAY]: 'warning',
  [ATTENDANCE_STATUS.LATE]: 'processing',
} as const;

// Departments
export const DEPARTMENTS = [
  'Engineering',
  'Human Resources',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
  'IT',
  'Customer Support',
] as const;

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
  label: dept,
  value: dept,
}));

// Table pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

// Upload limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

// Date formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';
export const TIME_FORMAT = 'HH:mm:ss';
export const MONTH_FORMAT = 'MMMM YYYY';

// Messages
export const MESSAGES = {
  SESSION_EXPIRED: 'Session expired. Please login again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  GENERIC_ERROR: 'An error occurred. Please try again.',
  SUCCESS_CREATE: 'Created successfully!',
  SUCCESS_UPDATE: 'Updated successfully!',
  SUCCESS_DELETE: 'Deleted successfully!',
} as const;

// Routes based on roles
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Dashboard (role-based content)
  DASHBOARD: '/dashboard',

  // Employee management (HR & Supervisor)
  EMPLOYEES: '/employees',
  EMPLOYEES_NEW: '/employees/new',
  EMPLOYEE_DETAIL: (id: number) => `/employees/${id}`,
  FACE_REGISTRATION: (id: number) => `/employees/${id}/face-registration`,

  // Profile
  PROFILE: '/profile',
} as const;

// Role-based redirects after login
export const ROLE_REDIRECTS = {
  [USER_ROLES.ADMIN]: ROUTES.DASHBOARD,
  [USER_ROLES.HR]: ROUTES.DASHBOARD,
  [USER_ROLES.MANAGER]: ROUTES.DASHBOARD,
  [USER_ROLES.SUPERVISOR]: ROUTES.DASHBOARD,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language',
  USER_ROLE: 'user_role',
} as const;

// Geolocation
export const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};