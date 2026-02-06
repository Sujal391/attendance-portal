import { create } from 'zustand';
import type { Employee } from '@/lib/types';

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  setEmployees: (employees: Employee[]) => void;
  setSelectedEmployee: (employee: Employee | null) => void;
  addEmployee: (employee: Employee) => void;
  updateEmployee: (id: number, employee: Partial<Employee>) => void;
  removeEmployee: (id: number) => void;
  clearEmployees: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  selectedEmployee: null,

  setEmployees: (employees) => set({ employees }),

  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),

  addEmployee: (employee) =>
    set((state) => ({
      employees: [...state.employees, employee],
    })),

  updateEmployee: (id, updatedData) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedData } : emp
      ),
    })),

  removeEmployee: (id) =>
    set((state) => ({
      employees: state.employees.filter((emp) => emp.id !== id),
    })),

  clearEmployees: () =>
    set({
      employees: [],
      selectedEmployee: null,
    }),
}));

export default useEmployeeStore;