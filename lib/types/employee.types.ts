export interface Employee {
  id: number;
  empCode: string;
  name: string;
  department: string;
  mobile: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEmployeeDto {
  empCode: string;
  name: string;
  department: string;
  mobile: string;
  email: string;
}

export interface UpdateEmployeeDto {
  empCode?: string;
  name?: string;
  department?: string;
  mobile?: string;
  email?: string;
}

export interface EmployeeListResponse {
  employees: Employee[];
  total: number;
}

export interface EmployeeTableData extends Employee {
  key: string;
}