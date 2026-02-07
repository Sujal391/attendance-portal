'use client';

import { Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import EmployeeTable from '@/components/employee/EmployeeTable';
import { useEmployees } from '@/lib/hooks';

export default function EmployeesPage() {
  const router = useRouter();
  const { employees, isLoading } = useEmployees();

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => router.push('/employees/new')}
          size="large"
          style={{
            background: 'linear-gradient(135deg, #2872A1 0%, #1d5580 100%)',
            border: 'none',
          }}
        >
          Register New Employee
        </Button>
      </div>
      <EmployeeTable employees={employees || []} loading={isLoading} />
    </div>
  );
}
