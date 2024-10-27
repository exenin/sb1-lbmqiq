import React from 'react';
import { Contact } from '../../types/models';
import DataTable from '../common/DataTable';
import { formatDate } from '../../utils/date';

interface ContactListProps {
  contacts: Contact[];
  onSort?: (column: string) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
}

export default function ContactList({
  contacts,
  onSort,
  sortColumn,
  sortDirection
}: ContactListProps) {
  const columns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value: string, contact: Contact) => (
        <div className="flex items-center space-x-3">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="h-8 w-8 rounded-full"
          />
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{contact.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'company',
      label: 'Company',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'active' ? 'bg-green-100 text-green-800' :
          value === 'inactive' ? 'bg-gray-100 text-gray-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'lastContact',
      label: 'Last Contact',
      sortable: true,
      render: (value: string) => formatDate(value)
    }
  ];

  return (
    <DataTable
      columns={columns}
      data={contacts}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSort={onSort}
    />
  );
}