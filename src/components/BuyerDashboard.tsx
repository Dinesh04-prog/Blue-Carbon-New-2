import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ShoppingCart, 
  Leaf, 
  TrendingUp,
  MapPin,
  Calendar,
  Filter,
  Eye,
  Award,
  BarChart3,
  Wallet,
  Download,
  ExternalLink
} from 'lucide-react';
import { formatINR, usdToInr, formatUsdAsInr } from '../utils/currency';

interface BuyerDashboardProps {
  user: any;
}

export function BuyerDashboard({ user }: BuyerDashboardProps) {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Mock data
  const stats = {
    totalPurchases: 15,
    creditsOwned: 8500,
    creditsRetired: 3200,
    totalSpent: 127500
  };

  const availableCredits = [
    {
      id: 1,
      projectName: 'Mangrove Restoration - Philippines',
      location: 'Palawan, Philippines',
      type: 'Mangrove Restoration',
      available: 2500,
      price: 18.50,
      vintage: '2024',
      verification: 'Verified Carbon Standard (VCS)',
      developer: 'Blue Ocean Solutions',
      rating: 4.8,
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      projectName: 'Seagrass Conservation - Australia',
      location: 'Queensland, Australia',
      type: 'Seagrass Conservation',
      available: 1800,
      price: 22.00,
      vintage: '2024',
      verification: 'Plan Vivo Standard',
      developer: 'Marine Carbon Co.',
      rating: 4.9,
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      projectName: 'Salt Marsh Protection - Netherlands',
      location: 'Wadden Sea, Netherlands',
      type: 'Salt Marsh Protection',
      available: 3200,
      price: 16.75,
      vintage: '2023',
      verification: 'Gold Standard',
      developer: 'European Blue Carbon',
      rating: 4.7,
      image: '/api/placeholder/300/200'
    }
  ];

  const myPurchases = [
    {
      id: 1,
      projectName: 'Kelp Forest Restoration - California',
      quantity: 1000,
      price: 20.00,
      purchaseDate: '2024-02-15',
      status: 'Active',
      retired: 0,
      transactionHash: '0x742d35cc6435c228c92d24e3e145c6c44b7be16745c2c7a0b7e3e2b0f8a9c2e1'
    },
    {
      id: 2,
      projectName: 'Mangrove Conservation - Indonesia',
      quantity: 2500,
      price: 17.50,
      purchaseDate: '2024-01-28',
      status: 'Partially Retired',
      retired: 1200,
      transactionHash: '0x8e9f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f'
    },
    {
      id: 3,
      projectName: 'Seagrass Restoration - UK',
      quantity: 800,
      price: 19.25,
      purchaseDate: '2024-01-10',
      status: 'Fully Retired',
      retired: 800,
      transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b'
    }
  ];

  const retirementCertificates = [
    {
      id: 1,
      projectName: 'Seagrass Restoration - UK',
      quantity: 800,
      retirementDate: '2024-02-01',
      certificateId: 'BC-RET-2024-001',
      reason: 'Corporate Net Zero Initiative'
    },
    {
      id: 2,
      projectName: 'Mangrove Conservation - Indonesia',
      quantity: 1200,
      retirementDate: '2024-02-10',
      certificateId: 'BC-RET-2024-002',
      reason: 'Annual Sustainability Program'
    }
  ];

  const filteredCredits = availableCredits.filter(credit => {
    const matchesSearch = credit.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         credit.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || credit.type === selectedType;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && credit.price < 20) ||
                        (priceRange === 'medium' && credit.price >= 20 && credit.price < 25) ||
                        (priceRange === 'high' && credit.price >= 25);
    return matchesSearch && matchesType && matchesPrice;
  });

  const handlePurchase = (creditId: number) => {
    alert(`Purchase flow initiated for credit ID: ${creditId}`);
  };

  const handleRetire = (purchaseId: number) => {
    alert(`Retirement process initiated for purchase ID: ${purchaseId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Buyer Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.user_metadata?.name || 'Buyer'}. Browse and purchase blue carbon credits.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Credits Owned</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.creditsOwned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              tCO2e available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Credits Retired</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.creditsRetired.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              tCO2e offset
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Purchases</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPurchases}</div>
            <p className="text-xs text-muted-foreground">
              Transactions completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Invested</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatINR(usdToInr(stats.totalSpent))}</div>
            <p className="text-xs text-muted-foreground">
              USD spent on credits
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
          <TabsTrigger value="retired">Retired Credits</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Project Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Mangrove Restoration">Mangrove Restoration</SelectItem>
                    <SelectItem value="Seagrass Conservation">Seagrass Conservation</SelectItem>
                    <SelectItem value="Salt Marsh Protection">Salt Marsh Protection</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="low">Under {formatUsdAsInr(20)}</SelectItem>
                    <SelectItem value="medium">{formatUsdAsInr(20)} - {formatUsdAsInr(25)}</SelectItem>
                    <SelectItem value="high">Above {formatUsdAsInr(25)}</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground flex items-center">
                  {filteredCredits.length} credits available
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Credits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCredits.map((credit) => (
              <Card key={credit.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <Leaf className="h-12 w-12 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">{credit.type}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg leading-tight">{credit.projectName}</h3>
                      <Badge className="bg-green-100 text-green-800 ml-2">★ {credit.rating}</Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {credit.location}
                      </div>
                      <div>
                        <span className="font-medium">Developer:</span> {credit.developer}
                      </div>
                      <div>
                        <span className="font-medium">Verification:</span> {credit.verification}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-primary">{formatUsdAsInr(credit.price)}</div>
                        <div className="text-sm text-muted-foreground">per tCO2e</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{credit.available.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">credits available</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => handlePurchase(credit.id)}>
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">My Carbon Credit Portfolio</h2>
            <Badge className="bg-blue-100 text-blue-800">
              <Wallet className="h-3 w-3 mr-1" />
              {stats.creditsOwned.toLocaleString()} tCO2e owned
            </Badge>
          </div>

          <div className="grid gap-4">
            {myPurchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{purchase.projectName}</h4>
                        <Badge className={
                          purchase.status === 'Active' ? 'bg-green-100 text-green-800' :
                          purchase.status === 'Partially Retired' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {purchase.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Quantity:</span>
                          <br />
                          {purchase.quantity.toLocaleString()} tCO2e
                        </div>
                        <div>
                          <span className="font-medium">Purchase Price:</span>
                          <br />
                          {formatUsdAsInr(purchase.price)}/tCO2e
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(purchase.purchaseDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Available:</span>
                          <br />
                          {(purchase.quantity - purchase.retired).toLocaleString()} tCO2e
                        </div>
                      </div>
                      <div className="mt-2 text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        Tx: {purchase.transactionHash.substring(0, 20)}...
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      {purchase.quantity > purchase.retired && (
                        <Button size="sm" onClick={() => handleRetire(purchase.id)}>
                          <Award className="h-4 w-4 mr-1" />
                          Retire Credits
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="retired" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Retired Credits & Certificates</h2>
            <Badge className="bg-blue-100 text-blue-800">
              <Award className="h-3 w-3 mr-1" />
              {stats.creditsRetired.toLocaleString()} tCO2e retired
            </Badge>
          </div>

          <div className="grid gap-4">
            {retirementCertificates.map((cert) => (
              <Card key={cert.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{cert.projectName}</h4>
                        <Badge className="bg-blue-100 text-blue-800">
                          <Award className="h-3 w-3 mr-1" />
                          Retired
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Quantity Retired:</span>
                          <br />
                          {cert.quantity.toLocaleString()} tCO2e
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(cert.retirementDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Certificate ID:</span>
                          <br />
                          {cert.certificateId}
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Retirement Reason:</span> {cert.reason}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download Certificate
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Verify on Blockchain
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Impact Over Time</CardTitle>
                <CardDescription>Your carbon credit purchases and retirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Analytics dashboard coming soon
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Breakdown</CardTitle>
                <CardDescription>Credits by project type and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Portfolio analytics coming soon
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