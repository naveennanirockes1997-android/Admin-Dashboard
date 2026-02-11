import React, { useState } from 'react';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import { salesData } from '../data/sales';

const Sales = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    { key: 'month', label: 'Month' },
    { 
      key: 'sales', 
      label: 'Sales Revenue',
      render: (row) => `$${row.sales.toLocaleString()}`
    },
    { 
      key: 'users', 
      label: 'Total Users',
      render: (row) => row.users.toLocaleString()
    },
    { 
      key: 'performance', 
      label: 'Growth Status',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden min-w-[100px]">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${(row.sales / 5000) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs font-medium">{Math.round((row.sales / 5000) * 100)}%</span>
        </div>
      )
    },
  ];

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = salesData.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(salesData.length / pageSize);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold">Sales Performance</h2>
            <p className="text-sm text-muted-foreground">Detailed breakdown of monthly sales and user growth.</p>
          </div>
        </div>

        <Table columns={columns} data={paginatedData} />
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default Sales;
