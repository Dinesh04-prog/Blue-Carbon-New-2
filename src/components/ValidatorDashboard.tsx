import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  Download,
  MapPin,
  Calendar,
  AlertTriangle,
  Eye,
  MessageSquare,
  Shield
} from 'lucide-react';

interface ValidatorDashboardProps {
  user: any;
}

export function ValidatorDashboard({ user }: ValidatorDashboardProps) {
  const [activeTab, setActiveTab] = useState('pending');
  const [reviewComments, setReviewComments] = useState('');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Mock data
  const stats = {
    pendingReviews: 5,
    completedReviews: 23,
    approvedProjects: 18,
    rejectedProjects: 5
  };

  const pendingProjects = [
    {
      id: 1,
      name: 'Mangrove Restoration - Indonesia',
      developer: 'Blue Ocean Solutions',
      location: 'Java, Indonesia',
      type: 'Mangrove Restoration',
      submissionDate: '2024-03-01',
      estimatedCredits: 8500,
      priority: 'High',
      documents: ['PDD', 'Environmental Impact', 'MRV Plan', 'Community Consent'],
      daysWaiting: 7
    },
    {
      id: 2,
      name: 'Seagrass Conservation Project',
      developer: 'Marine Carbon Co.',
      location: 'Tasmania, Australia',
      type: 'Seagrass Conservation',
      submissionDate: '2024-02-28',
      estimatedCredits: 12000,
      priority: 'Medium',
      documents: ['PDD', 'Baseline Study', 'MRV Protocol'],
      daysWaiting: 9
    },
    {
      id: 3,
      name: 'Salt Marsh Restoration - UK',
      developer: 'Coastal Regeneration Ltd',
      location: 'Norfolk, UK',
      type: 'Salt Marsh Protection',
      submissionDate: '2024-02-25',
      estimatedCredits: 6200,
      priority: 'Low',
      documents: ['PDD', 'Satellite Imagery', 'Soil Analysis'],
      daysWaiting: 12
    }
  ];

  const completedReviews = [
    {
      id: 4,
      name: 'Blue Carbon Project - Philippines',
      developer: 'Archipelago Carbon',
      status: 'Approved',
      reviewDate: '2024-02-20',
      creditsIssued: 9500,
      validationTime: '14 days'
    },
    {
      id: 5,
      name: 'Kelp Forest Protection',
      developer: 'Pacific Blue Carbon',
      status: 'Rejected',
      reviewDate: '2024-02-18',
      creditsIssued: 0,
      validationTime: '21 days'
    }
  ];

  const handleApprove = (projectId: number) => {
    if (!reviewComments.trim()) {
      alert('Please add review comments before approving.');
      return;
    }
    alert(`Project ${projectId} approved successfully!`);
    setReviewComments('');
    setSelectedProject(null);
  };

  const handleReject = (projectId: number) => {
    if (!reviewComments.trim()) {
      alert('Please add review comments explaining the rejection.');
      return;
    }
    alert(`Project ${projectId} rejected with feedback.`);
    setReviewComments('');
    setSelectedProject(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Validator Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.user_metadata?.name || 'Validator'}. Review and validate blue carbon projects.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting validation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Completed Reviews</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedReviews}</div>
            <p className="text-xs text-muted-foreground">
              Total validated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approvedProjects}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.approvedProjects / stats.completedReviews) * 100).toFixed(0)}% approval rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejectedProjects}</div>
            <p className="text-xs text-muted-foreground">
              Needs improvement
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          <TabsTrigger value="completed">Completed Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Projects Awaiting Validation</h2>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-100 text-orange-800">
                <Clock className="h-3 w-3 mr-1" />
                {stats.pendingReviews} pending
              </Badge>
            </div>
          </div>

          <div className="grid gap-6">
            {pendingProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority} Priority
                        </Badge>
                        {project.daysWaiting > 10 && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Overdue
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                        <div>
                          <span className="font-medium">Developer:</span>
                          <br />
                          {project.developer}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(project.submissionDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Est. Credits:</span>
                          <br />
                          {project.estimatedCredits.toLocaleString()} tCO2e
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm font-medium">Submitted Documents:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="cursor-pointer hover:bg-accent">
                              <Download className="h-3 w-3 mr-1" />
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {selectedProject === project.id && (
                        <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Review Comments <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                              placeholder="Provide detailed feedback on the project validation..."
                              value={reviewComments}
                              onChange={(e) => setReviewComments(e.target.value)}
                              rows={4}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleApprove(project.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve Project
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleReject(project.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject Project
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => {
                                setSelectedProject(null);
                                setReviewComments('');
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <div className="text-right mb-2">
                        <div className="text-sm text-muted-foreground">
                          Waiting {project.daysWaiting} days
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => setSelectedProject(
                            selectedProject === project.id ? null : project.id
                          )}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {selectedProject === project.id ? 'Hide Review' : 'Start Review'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Completed Reviews</h2>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                {stats.approvedProjects} approved
              </Badge>
              <Badge className="bg-red-100 text-red-800">
                <XCircle className="h-3 w-3 mr-1" />
                {stats.rejectedProjects} rejected
              </Badge>
            </div>
          </div>

          <div className="grid gap-4">
            {completedReviews.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium">{project.name}</h4>
                        <Badge className={project.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {project.status === 'Approved' ? 
                            <CheckCircle className="h-3 w-3 mr-1" /> : 
                            <XCircle className="h-3 w-3 mr-1" />
                          }
                          {project.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {project.developer} • Reviewed on {new Date(project.reviewDate).toLocaleDateString()} 
                        • {project.validationTime} validation time
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {project.creditsIssued > 0 ? project.creditsIssued.toLocaleString() : '—'}
                      </div>
                      <div className="text-sm text-muted-foreground">tCO2e credits</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}