import React, { useState } from 'react';
import { 
  TrendingUp, 
  GitBranch, 
  Settings, 
  Search,
  Loader2
} from 'lucide-react';
import { useAI } from '../../hooks/useAI';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: typeof TrendingUp;
  prompt: string;
}

const tools: Tool[] = [
  {
    id: 'revenue',
    title: 'Revenue Strategy Generator',
    description: 'Generate innovative revenue streams and pricing models',
    icon: TrendingUp,
    prompt: 'Generate revenue strategy suggestions for a business that...'
  },
  {
    id: 'roadmap',
    title: 'Product Roadmap Builder',
    description: 'Plan your product development timeline',
    icon: GitBranch,
    prompt: 'Create a product roadmap outline for...'
  },
  {
    id: 'process',
    title: 'Process Optimizer',
    description: 'Identify and eliminate operational inefficiencies',
    icon: Settings,
    prompt: 'Analyze and suggest optimizations for business processes in...'
  },
  {
    id: 'market',
    title: 'Market Scanner',
    description: 'Discover new market opportunities',
    icon: Search,
    prompt: 'Identify potential market opportunities in the...'
  }
];

export default function InnovationTools() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const { generateSuggestion, loading } = useAI();

  const handleToolSelect = async (tool: Tool) => {
    setActiveTool(tool.id);
    setResult(null);
    
    const suggestion = await generateSuggestion(tool.prompt);
    if (suggestion) {
      setResult(suggestion);
    }
  };

  return (
    <div className="space-y-6">
      {!activeTool ? (
        <div className="grid gap-4">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolSelect(tool)}
              className="flex items-start p-4 border rounded-lg hover:bg-gray-50 text-left"
            >
              <tool.icon className="h-6 w-6 text-blue-600 mt-1 mr-4" />
              <div>
                <h4 className="font-medium">{tool.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">
              {tools.find(t => t.id === activeTool)?.title}
            </h3>
            <button
              onClick={() => setActiveTool(null)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Back to Tools
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : result ? (
            <div className="bg-white border rounded-lg p-4">
              <div className="prose prose-sm">
                <p className="whitespace-pre-wrap">{result}</p>
              </div>
              <button
                onClick={() => handleToolSelect(tools.find(t => t.id === activeTool)!)}
                className="mt-4 text-sm text-blue-600 hover:text-blue-700"
              >
                Generate Another
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}