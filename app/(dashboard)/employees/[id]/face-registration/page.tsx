'use client';

import { useParams, useRouter } from 'next/navigation';
import { Spin, Typography, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import FacePhotoUpload from '@/components/upload/FacePhotoUpload';
import { useEmployees } from '@/lib/hooks';

const { Text } = Typography;

export default function FaceRegistrationPage() {
  const params = useParams();
  const router = useRouter();
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
    <div className="max-w-xl mx-auto">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push(`/employees/${id}`)}
        className="mb-4"
      >
        Back to Employee
      </Button>
      <FacePhotoUpload
        employeeId={id}
        employeeName={employee.name}
        onSuccess={() => router.push(`/employees/${id}`)}
      />
    </div>
  );
}
