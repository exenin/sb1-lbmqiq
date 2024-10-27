import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Task {
  id: number;
  stage: 'SETUP' | 'LAUNCH' | 'SCALE';
  subStage: string;
  task: string;
  owner: string;
  startWeek: number;
  endWeek: number;
  status: 'pending' | 'in-progress' | 'completed';
}

const stages = {
  SETUP: { color: 'blue', tasks: 25 },
  LAUNCH: { color: 'green', tasks: 44 },
  SCALE: { color: 'purple', tasks: 31 }
};

export default function ProjectPlanner() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      stage: 'SETUP',
      subStage: 'Planning',
      task: 'Define business objectives',
      owner: 'John Doe',
      startWeek: 1,
      endWeek: 2,
      status: 'completed'
    },
    {
      id: 2,
      stage: 'SETUP',
      subStage: 'Research',
      task: 'Market analysis',
      owner: 'Jane Smith',
      startWeek: 2,
      endWeek: 4,
      status: 'in-progress'
    }
  ]);

  const [activeStage, setActiveStage] = useState<'SETUP' | 'LAUNCH' | 'SCALE'>('SETUP');
  const [currentWeek, setCurrentWeek] = useState(2);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(stages).map(([stage, info]) => (
          <button
            key={stage}
            onClick={() => setActiveStage(stage as 'SETUP' | 'LAUNCH' | 'SCALE')}
            className={`
              p-4 rounded-lg border-2 text-left
              ${activeStage === stage 
                ? `border-${info.color}-500 bg-${info.color}-50` 
                : 'border-gray-200'}
            `}
          >
            <h4 className="font-medium">{stage}</h4>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600">{info.tasks} Tasks</span>
              <span className="text-sm font-medium text-green-600">
                {Math.round((tasks.filter(t => 
                  t.stage === stage && t.status === 'completed'
                ).length / info.tasks) * 100)}%
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-4">Timeline</h3>
        <div className="relative">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="absolute h-full bg-blue-500 rounded-full"
              style={{ width: `${(currentWeek / 52) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Week 1</span>
            <span>Week 26</span>
            <span>Week 52</span>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Tasks</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Add Task
          </button>
        </div>

        <div className="space-y-2">
          {tasks
            .filter(task => task.stage === activeStage)
            .map(task => (
              <div 
                key={task.id}
                className="flex items-center justify-between p-4 bg-white border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(task.status)}
                  <div>
                    <h4 className="font-medium">{task.task}</h4>
                    <p className="text-sm text-gray-600">
                      {task.subStage} • Week {task.startWeek}-{task.endWeek}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{task.owner}</span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}