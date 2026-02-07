import useSWR from 'swr';
import { employeeService } from '@/services/employee.service';
import type { Employee } from '@/lib/types';

export const useEmployees = () => {
  const {
    data,
    error,
    mutate,
    isLoading,
  } = useSWR<Employee[]>('/api/Employee', employeeService.getAll);

  return {
    employees: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
};

export default useEmployees;