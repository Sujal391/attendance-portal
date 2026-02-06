import type { Rule } from 'antd/es/form';

// Email validation
export const emailRules: Rule[] = [
  { required: true, message: 'Please enter email' },
  { type: 'email', message: 'Please enter valid email' },
];

// Password validation
export const passwordRules: Rule[] = [
  { required: true, message: 'Please enter password' },
  { min: 6, message: 'Password must be at least 6 characters' },
];

// Username validation
export const usernameRules: Rule[] = [
  { required: true, message: 'Please enter username' },
  { min: 3, message: 'Username must be at least 3 characters' },
  {
    pattern: /^[a-zA-Z0-9_]+$/,
    message: 'Username can only contain letters, numbers and underscores',
  },
];

// Employee code validation
export const empCodeRules: Rule[] = [
  { required: true, message: 'Please enter employee code' },
  {
    pattern: /^[A-Z0-9]+$/,
    message: 'Employee code must be uppercase alphanumeric',
  },
];

// Name validation
export const nameRules: Rule[] = [
  { required: true, message: 'Please enter name' },
  { min: 2, message: 'Name must be at least 2 characters' },
  {
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Name can only contain letters and spaces',
  },
];

// Mobile validation
export const mobileRules: Rule[] = [
  { required: true, message: 'Please enter mobile number' },
  {
    pattern: /^[0-9]{10}$/,
    message: 'Please enter valid 10-digit mobile number',
  },
];

// Department validation
export const departmentRules: Rule[] = [
  { required: true, message: 'Please select department' },
];

// Role validation
export const roleRules: Rule[] = [
  { required: true, message: 'Please select role' },
];

// Validate image file
export const validateImageFile = (file: File): boolean => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    return false;
  }

  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    return false;
  }

  return true;
};

// Validate coordinates
export const validateCoordinates = (lat: number, lng: number): boolean => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};