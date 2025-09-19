import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  User, 
  TrendingUp, 
  FileText, 
  Download, 
  Calendar, 
  MapPin, 
  Leaf, 
  DollarSign,
  Award,
  BarChart3
} from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/client';

interface UserDashboardProps {
  user: any;
}

interface Purchase {
  id: string;
  project_name: string;
  credits_purchased: number;
  price_per_credit: number;
  purchase_date: string;
  status: string;
  certificate_url?: string;
}

interface Portfolio {
  total_credits: number;
  total_spent: number;
  total_co2_offset: number;
  active_projects: number;
}

export function UserDashboard({ user }: UserDashboardProps) {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    total_credits: 0,
    total_spent: 0,
    total_co2_offset: 0,
    active_projects: 0
  });
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      // In demo mode, use mock data
      if (projectId === 'demo-project-id') {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setPortfolio({
          total_credits: 250,
          total_spent: 4250,
          total_co2_offset: 250,
          active_projects: 5
        });
        
        setPurchases([
          {
            id: '1',
            project_name: 'Mangrove Restoration - Andhra Pradesh',
            credits_purchased: 100,
            price_per_credit: 17,
            purchase_date: '2024-08-15',
            status: 'completed'
          },
          {
            id: '2',
            project_name: 'Seagrass Conservation - Great Barrier Reef',
            credits_purchased: 75,
            price_per_credit: 22,
            purchase_date: '2024-08-10',
            status: 'completed'
          },
          {
            id: '3',
            project_name: 'Salt Marsh Restoration - Norfolk',
            credits_purchased: 50,
            price_per_credit: 19,
            purchase_date: '2024-08-05',
            status: 'completed'
          },
          {
            id: '4',
            project_name: 'Blue Carbon Initiative - Philippines',
            credits_purchased: 25,
            price_per_credit: 15,
            purchase_date: '2024-08-01',
            status: 'completed'
          }
        ]);
        return;
      }

      // Load user portfolio data
      const portfolioResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e5059356/user-portfolio`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (portfolioResponse.ok) {
        const portfolioData = await portfolioResponse.json();
        setPortfolio(portfolioData);
      }

      // Load user purchases
      const purchasesResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e5059356/user-purchases`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (purchasesResponse.ok) {
        const purchasesData = await purchasesResponse.json();
        setPurchases(purchasesData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Fallback to mock data
      setPortfolio({
        total_credits: 250,
        total_spent: 4250,
        total_co2_offset: 250,
        active_projects: 5
      });
      
      setPurchases([
        {
          id: '1',
          project_name: 'Mangrove Restoration - Andhra Pradesh',
          credits_purchased: 100,
          price_per_credit: 17,
          purchase_date: '2024-08-15',
          status: 'completed'
        },
        {
          id: '2',
          project_name: 'Seagrass Conservation - Great Barrier Reef',
          credits_purchased: 75,
          price_per_credit: 22,
          purchase_date: '2024-08-10',
          status: 'completed'
        },
        {
          id: '3',
          project_name: 'Salt Marsh Restoration - Norfolk',
          credits_purchased: 50,
          price_per_credit: 19,
          purchase_date: '2024-08-05',
          status: 'completed'
        },
        {
          id: '4',
          project_name: 'Blue Carbon Initiative - Philippines',
          credits_purchased: 25,
          price_per_credit: 15,
          purchase_date: '2024-08-01',
          status: 'completed'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCertificate = (purchaseId: string) => {
    // In a real app, this would download the actual certificate
    alert(`Downloading certificate for purchase ${purchaseId}...`);
  };

  if (loading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-gray-900">
                  Welcome back, {user.user_metadata?.name || user.email}
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  {user.user_metadata?.user_type && (
                    <Badge variant="outline">
                      {user.user_metadata.user_type.replace('_', ' ')}
                    </Badge>
                  )}
                  <span className="text-gray-600">
                    Member since {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl text-gray-900">{portfolio.total_credits}</p>
                <p className="text-gray-600">Total Credits Owned</p>
                <p className="text-sm text-green-600">= {portfolio.total_co2_offset} tonnes CO₂ offset</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <Badge variant="outline">Total</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl text-gray-900">${portfolio.total_spent.toLocaleString()}</p>
                <p className="text-gray-600">Total Investment</p>
                <p className="text-sm text-blue-600">Avg. ${(portfolio.total_spent / portfolio.total_credits).toFixed(0)}/credit</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <Badge variant="outline">Global</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl text-gray-900">{portfolio.active_projects}</p>
                <p className="text-gray-600">Active Projects</p>
                <p className="text-sm text-purple-600">Across 4 countries</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-teal-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-teal-600" />
                </div>
                <Badge className="bg-teal-600">Growing</Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl text-gray-900">+15%</p>
                <p className="text-gray-600">Portfolio Growth</p>
                <p className="text-sm text-teal-600">Last 30 days</p>
              </div>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="purchases">Purchase History</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
              <TabsTrigger value="impact">Impact Report</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <Card className="lg:col-span-2 p-6">
                  <h3 className="text-xl mb-4 text-gray-900">Recent Activity</h3>
                  <div className="space-y-4">
                    {purchases.slice(0, 3).map((purchase) => (
                      <div key={purchase.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-gray-900">{purchase.project_name}</p>
                          <p className="text-sm text-gray-600">
                            {purchase.credits_purchased} credits • {new Date(purchase.purchase_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className="bg-green-600">
                          ${(purchase.credits_purchased * purchase.price_per_credit).toLocaleString()}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="text-xl mb-4 text-gray-900">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Buy More Credits
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      View Certificates
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Impact Analytics
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="purchases" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-xl mb-4 text-gray-900">Purchase History</h3>
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-900">{purchase.project_name}</h4>
                        <Badge className={purchase.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'}>
                          {purchase.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Credits</p>
                          <p className="text-gray-900">{purchase.credits_purchased}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Price per Credit</p>
                          <p className="text-gray-900">${purchase.price_per_credit}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total</p>
                          <p className="text-gray-900">${(purchase.credits_purchased * purchase.price_per_credit).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Date</p>
                          <p className="text-gray-900">{new Date(purchase.purchase_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="certificates" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-xl mb-4 text-gray-900">Digital Certificates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {purchases.map((purchase) => (
                    <Card key={purchase.id} className="p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <Award className="h-6 w-6 text-blue-600" />
                        <Badge variant="outline">Verified</Badge>
                      </div>
                      <h4 className="text-gray-900 mb-2">{purchase.project_name}</h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">Credits: {purchase.credits_purchased}</p>
                        <p className="text-gray-600">CO₂ Offset: {purchase.credits_purchased} tonnes</p>
                        <p className="text-gray-600">Date: {new Date(purchase.purchase_date).toLocaleDateString()}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full mt-3"
                        onClick={() => handleDownloadCertificate(purchase.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
                      </Button>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl mb-4 text-gray-900">Your Environmental Impact</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl text-green-600 mb-2">{portfolio.total_co2_offset}</div>
                    <p className="text-gray-600">Tonnes CO₂ Offset</p>
                    <p className="text-sm text-gray-500 mt-1">Equivalent to planting 1,250 trees</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl text-blue-600 mb-2">15,000</div>
                    <p className="text-gray-600">Hectares Protected</p>
                    <p className="text-sm text-gray-500 mt-1">Your contribution to ecosystem conservation</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl text-purple-600 mb-2">1,200</div>
                    <p className="text-gray-600">People Supported</p>
                    <p className="text-sm text-gray-500 mt-1">Local community members benefited</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg text-gray-900">Project Breakdown</h4>
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-gray-900">{purchase.project_name}</p>
                        <p className="text-sm text-gray-600">{purchase.credits_purchased} tonnes CO₂ offset</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900">{Math.round((purchase.credits_purchased / portfolio.total_credits) * 100)}%</p>
                        <p className="text-sm text-gray-600">of total impact</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}