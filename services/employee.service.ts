import { apiClient } from '@/lib/api/client';
import API_ENDPOINTS from '@/lib/api/endpoint';
import type {
  Employee,
  CreateEmployeeDto,
} from '@/lib/types';

export const employeeService = {
  /**
   * GET /api/Employee - Get all employees
   */
  getAll: async (): Promise<Employee[]> => {
    const response = await apiClient.get<Employee[]>(API_ENDPOINTS.EMPLOYEE.BASE);
    return response.data;
  },

  /**
   * POST /api/Employee - Create new employee
   */
  create: async (data: CreateEmployeeDto): Promise<Employee> => {
    const response = await apiClient.post<Employee>(
      API_ENDPOINTS.EMPLOYEE.BASE,
      data
    );
    return response.data;
  },
};

export default employeeService;