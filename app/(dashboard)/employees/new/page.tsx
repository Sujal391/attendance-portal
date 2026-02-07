'use client';

import { useState } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import EmployeeForm from '@/components/employee/EmployeeForm';
import { employeeService } from '@/services/employee.service';
import { useEmployeeStore } from '@/store';
import type { CreateEmployeeDto } from '@/lib/types';

export default function NewEmployeePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const addEmployee = useEmployeeStore((s) => s.addEmployee);

  const handleSubmit = async (values: CreateEmployeeDto) => {
    setLoading(true);
    try {
      const newEmployee = await employeeService.create(values);
      addEmployee(newEmployee);
      message.success('Employee registered successfully!');
      // Redirect to face registration for the new employee
      router.push(`/employees/${newEmployee.id}/face-registration`);
    } catch (error: any) {
      message.error(
        error.response?.data?.message || 'Failed to register employee'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <EmployeeForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
