import React, { useState } from 'react';
import { ArrowRight, Building, Rocket, CheckCircle } from 'lucide-react';

interface PathOption {
  id: 'improve' | 'launch';
  title: string;
  description: string;
  icon: typeof Building;
  steps: string[];
}

const pathOptions: PathOption[] = [
  {
    id: 'improve',
    title: 'Improve Existing Business',
    description: 'Optimize and scale your current business model',
    icon: Building,
    steps: [
      'Business Analysis',
      'Process Optimization',
      'Market Expansion',
      'Digital Transformation'
    ]
  },
  {
    id: 'launch',
    title: 'Launch New Venture',
    description: 'Start a new business from scratch',
    icon: Rocket,
    steps: [
      'Market Research',
      'Business Planning',
      'MVP Development',
      'Go-to-Market Strategy'
    ]
  }
];

export default function PathSelector() {
  const [selectedPath, setSelectedPath] = useState<'improve' | 'launch' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="space-y-6">
      {!selectedPath ? (
        <div className="space-y-4">
          <h3 className="font-medium">Choose Your Path</h3>
          <div className="grid gap-4">
            {pathOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedPath(option.id)}
                className="flex items-start p-4 border rounded-lg hover:bg-gray-50 text-left"
              >
                <option.icon className="h-6 w-6 text-blue-600 mt-1 mr-4" />
                <div>
                  <h4 className="font-medium">{option.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto mt-1" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{pathOptions.find(p => p.id === selectedPath)?.title}</h3>
            <button
              onClick={() => {
                setSelectedPath(null);
                setCurrentStep(0);
              }}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Change Path
            </button>
          </div>

          <div className="space-y-4">
            {pathOptions
              .find(p => p.id === selectedPath)
              ?.steps.map((step, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center p-4 rounded-lg
                    ${index === currentStep 
                      ? 'bg-blue-50 border-blue-200 border-2' 
                      : index < currentStep
                      ? 'bg-green-50 border-green-200 border'
                      : 'bg-gray-50 border border-gray-200'}
                  `}
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{step}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {index === currentStep 
                        ? 'In Progress' 
                        : index < currentStep 
                        ? 'Completed' 
                        : 'Pending'}
                    </p>
                  </div>
                  {index < currentStep && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              disabled={currentStep === 3}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Next Step
            </button>
          </div>
        </div>
      )}
    </div>
  );
}