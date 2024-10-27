import React from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  BarChart2,
  Activity,
  Calendar,
  Mail,
  CheckCircle
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import { usePageTitle } from '../hooks/usePageTitle';
import Card from '../components/common/Card';

const Dashboard: React.FC = () => {
  usePageTitle('Dashboard');

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value="1,234"
          change={12}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Revenue"
          value="$54,321"
          change={8}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Growth"
          value="23%"
          change={-5}
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Active Deals"
          value="45"
          change={15}
          icon={BarChart2}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;