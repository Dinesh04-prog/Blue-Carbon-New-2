import React from 'react';
import { ProjectDeveloperDashboard } from './ProjectDeveloperDashboard';
import { ValidatorDashboard } from './ValidatorDashboard';
import { BuyerDashboard } from './BuyerDashboard';

interface DashboardSelectorProps {
  user: any;
}

export function DashboardSelector({ user }: DashboardSelectorProps) {
  // In a real app, this would come from user metadata or database
  const userRole = user?.user_metadata?.role || 'buyer';

  switch (userRole) {
    case 'developer':
      return <ProjectDeveloperDashboard user={user} />;
    case 'validator':
      return <ValidatorDashboard user={user} />;
    case 'buyer':
    default:
      return <BuyerDashboard user={user} />;
  }
}