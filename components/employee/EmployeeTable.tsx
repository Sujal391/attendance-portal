'use client';

import { Table, Tag, Button, Space, Input, Typography } from 'antd';
import { EyeOutlined, SearchOutlined, CameraOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { formatMobile } from '@/lib/utils/formatters';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/lib/utils/constants';
import type { Employee } from '@/lib/types';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

const { Title } = Typography;

interface EmployeeTableProps {
  employees: Employee[];
  loading?: boolean;
}

export default function EmployeeTable({ employees, loading = false }: EmployeeTableProps) {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.empCode.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Employee> = [
    {
      title: 'Emp Code',
      dataIndex: 'empCode',
      key: 'empCode',
      sorter: (a, b) => a.empCode.localeCompare(b.empCode),
      render: (code: string) => <Tag color="blue">{code}</Tag>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: [...new Set(employees.map((e) => e.department))].map((d) => ({
        text: d,
        value: d,
      })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (mobile: string) => formatMobile(mobile),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => router.push(`/employees/${record.id}`)}
          >
            View
          </Button>
          <Button
            type="link"
            icon={<CameraOutlined />}
            onClick={() => router.push(`/employees/${record.id}/face-registration`)}
          >
            Upload Photo
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <Title level={4} className="!text-[#2872A1] !mb-0">
          Employees
        </Title>
        <Input
          placeholder="Search employees..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ maxWidth: 300 }}
          allowClear
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredEmployees}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} employees`,
        }}
        scroll={{ x: 800 }}
      />
    </div>
  );
}
