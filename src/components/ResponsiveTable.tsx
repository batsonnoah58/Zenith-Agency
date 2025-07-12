import React from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface ResponsiveTableProps {
  columns: Column[];
  data: any[];
  className?: string;
  emptyMessage?: string;
  loading?: boolean;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  columns,
  data,
  className = '',
  emptyMessage = 'No data available',
  loading = false
}) => {
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
        <div className="p-4 border-b">
          <div className="animate-pulse bg-gray-200 h-6 w-32 rounded"></div>
        </div>
        <div className="p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
              <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
              <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
              <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow p-8 text-center ${className}`}>
        <div className="text-gray-500 text-lg">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${column.className || ''}`}
                  >
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="border-b border-gray-200 p-4 hover:bg-gray-50">
            {columns.filter(col => !col.hideOnMobile).map((column) => (
              <div key={column.key} className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-gray-500">{column.label}:</span>
                <span className="text-sm text-gray-900">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveTable; 