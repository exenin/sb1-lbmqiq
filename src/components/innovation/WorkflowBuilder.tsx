import React, { useState } from 'react';
import { ArrowRight, Plus, Settings } from 'lucide-react';
import Card from '../common/Card';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  type: 'manual' | 'automated';
  status: 'pending' | 'in-progress' | 'completed';
}

export default function WorkflowBuilder() {
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: '1',
      title: 'Research Phase',
      description: 'Gather market data and user insights',
      type: 'manual',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Design Sprint',
      description: 'Collaborative design workshop',
      type: 'manual',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'AI Analysis',
      description: 'Process data using machine learning',
      type: 'automated',
      status: 'pending'
    }
  ]);

  const addStep = () => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      title: 'New Step',
      description: 'Description',
      type: 'manual',
      status: 'pending'
    };
    setSteps([...steps, newStep]);
  };

  return (
    <Card 
      title="Workflow Builder" 
      icon={Settings}
      action={{ label: 'Add Step', onClick: addStep }}
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex-1">
                <div className={`
                  p-4 rounded-lg border-2 
                  ${step.status === 'completed' ? 'border-green-500 bg-green-50' :
                    step.status === 'in-progress' ? 'border-blue-500 bg-blue-50' :
                    'border-gray-200 bg-white'}
                `}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{step.title}</h4>
                    <span className={`
                      text-xs px-2 py-1 rounded-full
                      ${step.type === 'automated' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}
                    `}>
                      {step.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="h-6 w-6 text-gray-400 flex-shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Card>
  );
}