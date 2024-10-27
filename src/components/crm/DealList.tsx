import React from 'react';
import { Deal } from '../../types/models';
import DataTable from '../common/DataTable';
import { formatCurrency } from '../../utils/format';
import Badge from '../common/Badge';

interface DealListProps {
  deals: Deal[];
  onSort?: (column: string) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

export default function DealList({
  deals,
  onSort,
  sortColumn,
  sortDirection
}: DealListProps) {
  const getStageColor = (stage: string): 'info' | 'warning' | 'success' => {
    switch (stage) {
      case 'discovery': return 'info';
      case 'qualification': return 'info';
      case 'proposal': return 'warning';
      case 'negotiation': return 'warning';
      case 'closed': return 'success';
      default: return 'info';
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Deal',
      sortable: true,
      render: (value: string, deal: Deal) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{deal.company}</div>
        </div>
      )
    },
    {
      key: 'value',
      label: 'Value',
      sortable: true,
      render: (value: number) => formatCurrency(value)
    },
    {
      key: 'stage',
      label: 'Stage',
      sortable: true,
      render: (value: string) => (
        <Badge variant={getStageColor(value)}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    },
    {
      key: 'probability',
      label: 'Probability',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center">
          <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">{value}%</span>
        </div>
      )
    },
    {
      key: 'expectedCloseDate',
      label: 'Close Date',
      sortable: true,
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      key: 'owner',
      label: 'Owner',
      sortable: true
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={deals}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSort={onSort}
    />
  );
}