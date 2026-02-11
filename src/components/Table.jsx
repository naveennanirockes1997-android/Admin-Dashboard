import React from 'react';
import { cn } from '../lib/utils';

const Table = ({ columns, data }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left border-collapse">
        <thead className="bg-secondary/50">
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                className="px-6 py-4 text-sm font-semibold text-muted-foreground border-b border-border"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr 
                key={row.id || index}
                className="group hover:bg-secondary/30 transition-colors"
              >
                {columns.map((column) => (
                  <td 
                    key={`${row.id || index}-${column.key}`}
                    className="px-6 py-4 text-sm border-b border-border group-last:border-none"
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length} 
                className="px-6 py-12 text-center text-muted-foreground"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
