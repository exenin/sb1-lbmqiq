import React, { useState } from 'react';
import { useAI } from '../../hooks/useAI';
import { Loader2, Save, RefreshCw } from 'lucide-react';

interface CanvasSection {
  id: string;
  title: string;
  content: string;
  suggestions?: string[];
}

export default function BusinessCanvas() {
  const [sections, setSections] = useState<CanvasSection[]>([
    { id: 'problem', title: 'Problem', content: '' },
    { id: 'solution', title: 'Solution', content: '' },
    { id: 'value', title: 'Value Proposition', content: '' },
    { id: 'revenue', title: 'Revenue Model', content: '' }
  ]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { generateSuggestion, loading } = useAI();

  const handleGenerateSuggestions = async (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const prompt = `Generate suggestions for the ${section.title} section of a business canvas. Current content: ${section.content}`;
    const suggestion = await generateSuggestion(prompt);
    
    if (suggestion) {
      setSections(sections.map(s => 
        s.id === sectionId 
          ? { ...s, suggestions: [suggestion] }
          : s
      ));
    }
  };

  const handleSave = () => {
    localStorage.setItem('businessCanvas', JSON.stringify(sections));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Business Model Canvas</h3>
        <button
          onClick={handleSave}
          className="flex items-center px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Canvas
        </button>
      </div>

      <div className="grid gap-4">
        {sections.map((section) => (
          <div key={section.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-700">{section.title}</h4>
              <button
                onClick={() => handleGenerateSuggestions(section.id)}
                className="p-1 hover:bg-gray-100 rounded"
                disabled={loading}
              >
                {loading && activeSection === section.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </button>
            </div>

            <textarea
              value={section.content}
              onChange={(e) => {
                setSections(sections.map(s =>
                  s.id === section.id
                    ? { ...s, content: e.target.value }
                    : s
                ));
              }}
              onFocus={() => setActiveSection(section.id)}
              className="w-full h-24 p-2 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Describe your ${section.title.toLowerCase()}...`}
            />

            {section.suggestions && section.suggestions.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-600">Suggestions:</p>
                <div className="mt-1 space-y-1">
                  {section.suggestions.map((suggestion, index) => (
                    <p key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {suggestion}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}