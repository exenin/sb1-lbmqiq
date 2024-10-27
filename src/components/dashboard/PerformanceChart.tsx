import React from 'react';
import { BarChart2 } from 'lucide-react';
import Card from '../common/Card';

const PerformanceChart: React.FC = () => {
  return (
    <Card 
      title="Performance Overview" 
      icon={BarChart2}
      action={{ label: 'View Details', onClick: () => {} }}
    >
      <div className="h-64 flex items-center justify-center">
        <div className="flex space-x-4 items-end">
          {[65, 45, 75, 55, 85, 35, 95].map((height, i) => (
            <div key={i} className="flex flex-col items-center">
              <div 
                className="w-8 bg-blue-500 rounded-t"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs mt-2 text-gray-500">
                Day {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PerformanceChart;