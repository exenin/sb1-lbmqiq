import React from 'react';
import { Task } from '../../types/tasks';
import { 
  MoreVertical, 
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { formatRelativeTime } from '../../utils/date';

interface TaskRowProps {
  task: Task;
}

export default function TaskRow({ task }: TaskRowProps) {
  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    review: 'bg-yellow-100 text-yellow-800',
    done: 'bg-green-100 text-green-800'
  };

  const priorityIcons = {
    low: <Clock className="h-4 w-4 text-gray-500" />,
    medium: <Clock className="h-4 w-4 text-blue-500" />,
    high: <AlertTriangle className="h-4 w-4 text-orange-500" />,
    urgent: <AlertTriangle className="h-4 w-4 text-red-500" />
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {task.status === 'done' ? (
              <div className="h-full w-full rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            ) : (
              <div className="h-full w-full rounded-full bg-gray-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full border-2 border-gray-400" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{task.title}</div>
            <div className="text-sm text-gray-500">{task.description}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {priorityIcons[task.priority]}
          <span className="ml-1 text-sm text-gray-500">
            {task.priority}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
          {formatRelativeTime(task.dueDate)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {task.assignedTo ? (
            <>
              <img
                className="h-8 w-8 rounded-full"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(task.assignedTo.name)}`}
                alt=""
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">
                  {task.assignedTo.name}
                </div>
                <div className="text-sm text-gray-500">
                  {task.assignedTo.email}
                </div>
              </div>
            </>
          ) : (
            <span className="text-sm text-gray-500">Unassigned</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-gray-400 hover:text-gray-500">
          <MoreVertical className="h-5 w-5" />
        </button>
      </td>
    </tr>
  );
}