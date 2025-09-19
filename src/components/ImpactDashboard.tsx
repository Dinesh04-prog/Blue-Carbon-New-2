import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Users, Globe, Leaf, Fish, TreePine, Waves, DollarSign } from 'lucide-react';

export function ImpactDashboard() {
  const impactStats = [
    {
      icon: TrendingUp,
      value: '2.5M',
      unit: 'tonnes CO₂',
      label: 'Total Carbon Offset',
      change: '+12%',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: TreePine,
      value: '15,000',
      unit: 'hectares',
      label: 'Ecosystems Protected',
      change: '+8%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      value: '45,000',
      unit: 'people',
      label: 'Communities Supported',
      change: '+15%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Globe,
      value: '25',
      unit: 'countries',
      label: 'Global Reach',
      change: '+3',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    }
  ];

  const ecosystemImpact = [
    {
      name: 'Mangroves',
      icon: TreePine,
      area: '8,500 hectares',
      carbon: '1.2M tonnes CO₂',
      communities: '25,000 people',
      percentage: 60,
      color: 'bg-green-600'
    },
    {
      name: 'Seagrass',
      icon: Waves,
      area: '4,200 hectares',
      carbon: '800K tonnes CO₂',
      communities: '12,000 people',
      percentage: 30,
      color: 'bg-blue-600'
    },
    {
      name: 'Salt Marshes',
      icon: Leaf,
      area: '2,300 hectares',
      carbon: '500K tonnes CO₂',
      communities: '8,000 people',
      percentage: 10,
      color: 'bg-teal-600'
    }
  ];

  const regionalData = [
    { region: 'Asia-Pacific', projects: 45, carbon: '1.2M', percentage: 48 },
    { region: 'Americas', projects: 32, carbon: '800K', percentage: 32 },
    { region: 'Europe', projects: 18, carbon: '350K', percentage: 14 },
    { region: 'Africa', projects: 12, carbon: '150K', percentage: 6 }
  ];

  const cobenefits = [
    {
      icon: Fish,
      title: 'Marine Biodiversity',
      description: '300+ species protected',
      value: '15% increase in fish populations'
    },
    {
      icon: Users,
      title: 'Sustainable Livelihoods',
      description: '12,000 jobs created',
      value: '$25M in community income'
    },
    {
      icon: TrendingUp,
      title: 'Coastal Protection',
      description: '500km of coastline protected',
      value: '$100M in avoided damages'
    },
    {
      icon: DollarSign,
      title: 'Economic Value',
      description: 'Local economic development',
      value: '$80M in ecosystem services'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">Impact Dashboard</Badge>
            <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">
              Real-Time Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track the collective environmental and social impact of our blue carbon community. 
              Every credit purchased contributes to these measurable outcomes.
            </p>
          </div>

          {/* Key Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline">
                      <span className="text-3xl text-gray-900">{stat.value}</span>
                      <span className="text-sm text-gray-500 ml-1">{stat.unit}</span>
                    </div>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Ecosystem Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <Card className="p-8">
              <h3 className="text-2xl mb-6 text-gray-900">Impact by Ecosystem</h3>
              
              <div className="space-y-6">
                {ecosystemImpact.map((ecosystem, index) => {
                  const Icon = ecosystem.icon;
                  return (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <span className="text-gray-900">{ecosystem.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{ecosystem.percentage}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${ecosystem.color} h-2 rounded-full`}
                          style={{ width: `${ecosystem.percentage}%` }}
                        ></div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Area</p>
                          <p className="text-gray-900">{ecosystem.area}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Carbon</p>
                          <p className="text-gray-900">{ecosystem.carbon}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">People</p>
                          <p className="text-gray-900">{ecosystem.communities}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl mb-6 text-gray-900">Regional Distribution</h3>
              
              <div className="space-y-4">
                {regionalData.map((region, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{region.region}</span>
                      <div className="text-right text-sm">
                        <p className="text-gray-900">{region.projects} projects</p>
                        <p className="text-gray-600">{region.carbon} tonnes CO₂</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${region.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-blue-900 mb-2">Global Impact</h4>
                <p className="text-sm text-blue-800">
                  Our projects span 25 countries across 4 continents, creating a truly 
                  global network of blue carbon protection and restoration.
                </p>
              </div>
            </Card>
          </div>

          {/* Co-benefits */}
          <Card className="p-8">
            <h3 className="text-2xl mb-8 text-gray-900 text-center">Beyond Carbon: Co-Benefits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cobenefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-blue-100 rounded-full">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h4 className="text-lg mb-2 text-gray-900">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{benefit.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {benefit.value}
                    </Badge>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 max-w-2xl mx-auto">
                Blue carbon projects deliver multiple benefits beyond carbon sequestration, 
                supporting biodiversity, coastal resilience, and sustainable development goals.
              </p>
            </div>
          </Card>

          {/* Live Updates */}
          <div className="mt-12 text-center">
            <Card className="p-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
              <h3 className="text-xl mb-2">Live Impact Updates</h3>
              <p className="text-blue-100 mb-4">
                Real-time data from our monitoring systems worldwide
              </p>
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <p className="text-2xl">+157</p>
                  <p className="text-xs text-blue-200">Credits retired today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl">23</p>
                  <p className="text-xs text-blue-200">Active projects</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl">+89</p>
                  <p className="text-xs text-blue-200">New hectares protected</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}