'use client';

import { useParams } from 'next/navigation';
import { Spin, Typography } from 'antd';
import EmployeeCard from '@/components/employee/EmployeeCard';
import { useEmployees } from '@/lib/hooks';

const { Text } = Typography;

export default function EmployeeDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { employees, isLoading } = useEmployees();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  const employee = employees?.find((e) => e.id === id);

  if (!employee) {
    return (
      <div className="text-center py-20">
        <Text className="text-gray-500 text-lg">Employee not found.</Text>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <EmployeeCard employee={employee} />
    </div>
  );
}
