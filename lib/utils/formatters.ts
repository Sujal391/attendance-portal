import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

// Date formatters
export const formatDate = (date: string | Date, format = 'DD/MM/YYYY'): string => {
  return dayjs(date).format(format);
};

export const formatDateTime = (
  date: string | Date,
  format = 'DD/MM/YYYY HH:mm:ss'
): string => {
  return dayjs(date).format(format);
};

export const formatTime = (time: string | Date, format = 'HH:mm:ss'): string => {
  return dayjs(time).format(format);
};

export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

// Month name formatter
export const getMonthName = (month: number): string => {
  return dayjs().month(month - 1).format('MMMM');
};

// Calculate total hours between two times
export const calculateTotalHours = (
  punchIn: string,
  punchOut: string
): number => {
  const start = dayjs(punchIn);
  const end = dayjs(punchOut);
  return end.diff(start, 'hour', true);
};

// Format hours to readable format (e.g., 8.5 hours)
export const formatHours = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
};

// Format mobile number
export const formatMobile = (mobile: string): string => {
  if (mobile.length === 10) {
    return `${mobile.slice(0, 5)}-${mobile.slice(5)}`;
  }
  return mobile;
};

// Format employee code
export const formatEmpCode = (code: string): string => {
  return code.toUpperCase();
};

// Format coordinates
export const formatCoordinates = (lat: number, lng: number): string => {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Get current month and year
export const getCurrentMonthYear = (): { month: number; year: number } => {
  return {
    month: dayjs().month() + 1,
    year: dayjs().year(),
  };
};

// Get month options for dropdown
export const getMonthOptions = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    label: dayjs().month(i).format('MMMM'),
    value: i + 1,
  }));
};

// Get year options for dropdown (last 5 years)
export const getYearOptions = () => {
  const currentYear = dayjs().year();
  return Array.from({ length: 5 }, (_, i) => ({
    label: (currentYear - i).toString(),
    value: currentYear - i,
  }));
};