import { apiClient } from '@/lib/api/client';
import API_ENDPOINTS from '@/lib/api/endpoint';
import type { 
  Employee, 
  CreateEmployeeDto, 
  UpdateEmployeeDto 
} from '@/lib/types';

export const employeeService = {
  /**
   * Get all employees
   */
  getAll: async (): Promise<Employee[]> => {
    const response = await apiClient.get<Employee[]>(API_ENDPOINTS.EMPLOYEE.BASE);
    return response.data;
  },

  /**
   * Get employee by ID
   */
  getById: async (id: number): Promise<Employee> => {
    const response = await apiClient.get<Employee>(
      API_ENDPOINTS.EMPLOYEE.BY_ID(id)
    );
    return response.data;
  },

  /**
   * Create new employee
   */
  create: async (data: CreateEmployeeDto): Promise<Employee> => {
    const response = await apiClient.post<Employee>(
      API_ENDPOINTS.EMPLOYEE.CREATE,
      data
    );
    return response.data;
  },

  /**
   * Update employee
   */
  update: async (id: number, data: UpdateEmployeeDto): Promise<Employee> => {
    const response = await apiClient.put<Employee>(
      API_ENDPOINTS.EMPLOYEE.UPDATE(id),
      data
    );
    return response.data;
  },

  /**
   * Delete employee
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.EMPLOYEE.DELETE(id));
  },
};

export default employeeService;