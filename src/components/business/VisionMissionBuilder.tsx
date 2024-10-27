import React, { useState } from 'react';
import { Save, Lightbulb, Wand2 } from 'lucide-react';
import Card from '../common/Card';
import { useAI } from '../../hooks/useAI';

interface VisionMissionState {
  vision: string;
  mission: string;
  values: string[];
}

export default function VisionMissionBuilder() {
  const [state, setState] = useState<VisionMissionState>({
    vision: '',
    mission: '',
    values: ['', '', '']
  });

  const { generateSuggestion, loading: aiLoading } = useAI();

  const handleGenerateSuggestion = async (type: 'vision' | 'mission') => {
    const prompt = type === 'vision' 
      ? 'Generate a visionary statement for a company that wants to ' + state.mission
      : 'Generate a mission statement based on the vision: ' + state.vision;
    
    const suggestion = await generateSuggestion(prompt);
    if (suggestion) {
      setState(prev => ({ ...prev, [type]: suggestion }));
    }
  };

  const handleSave = async () => {
    // Implement save functionality
  };

  return (
    <div className="space-y-6">
      <Card 
        title="Vision Statement" 
        icon={Lightbulb}
        action={{
          label: 'Generate',
          onClick: () => handleGenerateSuggestion('vision')
        }}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your vision statement describes the future you want to create. What does your company aspire to achieve?
          </p>
          <textarea
            value={state.vision}
            onChange={(e) => setState(prev => ({ ...prev, vision: e.target.value }))}
            className="w-full h-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Enter your vision statement..."
          />
        </div>
      </Card>

      <Card 
        title="Mission Statement" 
        icon={Wand2}
        action={{
          label: 'Generate',
          onClick: () => handleGenerateSuggestion('mission')
        }}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your mission statement defines how you'll achieve your vision. What does your company do and why?
          </p>
          <textarea
            value={state.mission}
            onChange={(e) => setState(prev => ({ ...prev, mission: e.target.value }))}
            className="w-full h-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            placeholder="Enter your mission statement..."
          />
        </div>
      </Card>

      <Card title="Core Values">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Define 3-5 core values that will guide your company's culture and decision-making.
          </p>
          <div className="space-y-2">
            {state.values.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => {
                  const newValues = [...state.values];
                  newValues[index] = e.target.value;
                  setState(prev => ({ ...prev, values: newValues }));
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
                placeholder={`Core Value ${index + 1}`}
              />
            ))}
            {state.values.length < 5 && (
              <button
                onClick={() => setState(prev => ({ 
                  ...prev, 
                  values: [...prev.values, ''] 
                }))}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                + Add another value
              </button>
            )}
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Foundation
        </button>
      </div>
    </div>
  );
}