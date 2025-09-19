import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Coins,
  TrendingUp,
  MapPin,
  Calendar,
  Upload,
  Eye
} from 'lucide-react';

interface ProjectDeveloperDashboardProps {
  user: any;
}

export function ProjectDeveloperDashboard({ user }: ProjectDeveloperDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app would come from API
  const stats = {
    totalProjects: 8,
    activeProjects: 3,
    creditsIssued: 12450,
    pendingValidation: 2
  };

  const projects = [
    {
      id: 1,
      name: 'Mangrove Restoration - Philippines',
      location: 'Palawan, Philippines',
      type: 'Mangrove Restoration',
      status: 'Credits Minted',
      progress: 100,
      creditsIssued: 5200,
      dateSubmitted: '2024-01-15',
      validationDate: '2024-02-28',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      name: 'Seagrass Conservation - Australia',
      location: 'Queensland, Australia',
      type: 'Seagrass Conservation',
      status: 'Pending Validation',
      progress: 75,
      creditsIssued: 0,
      dateSubmitted: '2024-02-20',
      validationDate: null,
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 3,
      name: 'Salt Marsh Protection - USA',
      location: 'California, USA',
      type: 'Salt Marsh Protection',
      status: 'Draft',
      progress: 30,
      creditsIssued: 0,
      dateSubmitted: null,
      validationDate: null,
      statusColor: 'bg-gray-100 text-gray-800'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Credits Minted':
        return <CheckCircle className="h-4 w-4" />;
      case 'Pending Validation':
        return <Clock className="h-4 w-4" />;
      case 'Draft':
        return <FileText className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Project Developer Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.user_metadata?.name || 'Developer'}. Manage your blue carbon projects.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Projects</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">
              Currently in development
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Credits Issued</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.creditsIssued.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              tCO2e total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending Validation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingValidation}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Project Overview</TabsTrigger>
          <TabsTrigger value="submit">Submit New Project</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">My Projects</h2>
            <Button onClick={() => setActiveTab('submit')}>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>

          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <Badge className={project.statusColor}>
                          {getStatusIcon(project.status)}
                          <span className="ml-1">{project.status}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {project.type}
                        </div>
                        {project.dateSubmitted && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Submitted {new Date(project.dateSubmitted).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Project Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="w-full" />
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {project.creditsIssued > 0 ? project.creditsIssued.toLocaleString() : '—'}
                        </div>
                        <div className="text-sm text-muted-foreground">tCO2e credits</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {project.status === 'Draft' && (
                          <Button size="sm">
                            <Upload className="h-4 w-4 mr-1" />
                            Continue
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Blue Carbon Project</CardTitle>
              <CardDescription>
                Upload your project documentation and submit for validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ready to submit a new project?</h3>
                <p className="text-muted-foreground mb-6">
                  Follow our guided process to submit your blue carbon project for validation
                </p>
                <Button size="lg" className="px-8">
                  <Upload className="h-4 w-4 mr-2" />
                  Start Project Submission
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Performance</CardTitle>
                <CardDescription>Credits issued over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Analytics dashboard coming soon
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Tracking</CardTitle>
                <CardDescription>Credits sold and revenue generated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Revenue analytics coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}