// src/lib/hooks/useEmployees.ts
import useSWR from 'swr';
import { employeeService } from '@/services/employee.service';

export const useEmployees = () => {
  const { data, error, mutate } = useSWR(
    '/api/Employee',
    employeeService.getAll
  );

  return {
    employees: data,
    isLoading: !error && !data,
    isError: error,
    refresh: mutate,
  };
};

export default useEmployees;