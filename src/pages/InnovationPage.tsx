import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Lightbulb, 
  Workflow, 
  Layers, 
  Zap,
  Brain,
  GitBranch
} from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { usePageTitle } from '../hooks/usePageTitle';
import Card from '../components/common/Card';
import IdeaCanvas from '../components/innovation/IdeaCanvas';
import WorkflowBuilder from '../components/innovation/WorkflowBuilder';
import PrototypeViewer from '../components/innovation/PrototypeViewer';
import AIAssistant from '../components/innovation/AIAssistant';

const subNavItems = [
  { path: '', label: 'Overview', icon: Brain },
  { path: 'ideation', label: 'Ideation', icon: Lightbulb },
  { path: 'workflows', label: 'Workflows', icon: Workflow },
  { path: 'prototypes', label: 'Prototypes', icon: Layers },
  { path: 'execution', label: 'Execution', icon: GitBranch },
];

export default function InnovationPage() {
  usePageTitle('Innovation Design');
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        title="Innovation Design"
        icon={Lightbulb}
        description="Transform ideas into reality with AI-powered design workflows"
        action={{
          label: 'New Project',
          onClick: () => navigate('ideation/new')
        }}
      />
      
      <nav className="flex space-x-4 mb-8">
        {subNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <item.icon className="h-4 w-4 mr-2" />
            {item.label}
          </Link>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<InnovationOverview />} />
        <Route path="ideation/*" element={<IdeationSpace />} />
        <Route path="workflows/*" element={<WorkflowSpace />} />
        <Route path="prototypes/*" element={<PrototypeSpace />} />
        <Route path="execution/*" element={<ExecutionSpace />} />
      </Routes>
    </div>
  );
}

function InnovationOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          title="Active Projects" 
          icon={Lightbulb}
          action={{ label: 'View All', onClick: () => {} }}
        >
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                  <Brain className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium">Project {i}</h4>
                  <p className="text-sm text-gray-500">Last updated 2h ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card 
          title="AI Insights" 
          icon={Zap}
          action={{ label: 'Generate More', onClick: () => {} }}
        >
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                "Consider implementing machine learning for predictive maintenance"
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700">
                "User research suggests a need for mobile-first approach"
              </p>
            </div>
          </div>
        </Card>

        <Card 
          title="Team Activity" 
          icon={GitBranch}
          action={{ label: 'View Timeline', onClick: () => {} }}
        >
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <div>
                <p className="text-sm">
                  <span className="font-medium">Alex</span> updated the prototype
                </p>
                <p className="text-xs text-gray-500">10 minutes ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Innovation Pipeline" icon={Workflow}>
          <div className="h-64">
            <div className="flex justify-between items-center h-full">
              <div className="flex-1 h-2 bg-gray-200 rounded-full mx-4 relative">
                <div 
                  className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                  style={{ width: '60%' }}
                />
                {['Ideation', 'Design', 'Prototype', 'Testing', 'Launch'].map((stage, i) => (
                  <div
                    key={stage}
                    className="absolute top-0 transform -translate-y-8"
                    style={{ left: `${i * 25}%` }}
                  >
                    <div className="text-sm font-medium">{stage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card title="Resource Allocation" icon={Layers}>
          <div className="space-y-4">
            {['Research', 'Design', 'Development', 'Testing'].map((resource) => (
              <div key={resource} className="flex items-center">
                <span className="w-24 text-sm text-gray-600">{resource}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full mx-4">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {Math.floor(Math.random() * 100)}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function IdeationSpace() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IdeaCanvas />
        </div>
        <div>
          <AIAssistant />
        </div>
      </div>
    </div>
  );
}

function WorkflowSpace() {
  return (
    <div className="space-y-6">
      <WorkflowBuilder />
    </div>
  );
}

function PrototypeSpace() {
  return (
    <div className="space-y-6">
      <PrototypeViewer />
    </div>
  );
}

function ExecutionSpace() {
  return (
    <div className="space-y-6">
      <Card title="Execution Plan" icon={GitBranch}>
        <div className="space-y-4">
          {/* Execution plan content */}
        </div>
      </Card>
    </div>
  );
}