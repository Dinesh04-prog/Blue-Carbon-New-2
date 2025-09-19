import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Search, ShoppingCart, Award, BarChart3, Shield, FileCheck } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      step: 1,
      icon: Search,
      title: 'Browse Projects',
      description: 'Explore verified blue carbon projects from around the world. Filter by location, project type, and price to find credits that align with your values.',
      details: ['View project details', 'Check certifications', 'Read impact reports']
    },
    {
      step: 2,
      icon: ShoppingCart,
      title: 'Purchase Credits',
      description: 'Buy blue carbon credits with transparent pricing. Each credit represents one metric tonne of CO₂ sequestered or avoided through coastal ecosystem protection.',
      details: ['Secure payment processing', 'Instant digital receipts', 'Bulk purchase options']
    },
    {
      step: 3,
      icon: Award,
      title: 'Receive Certificates',
      description: 'Get verified digital certificates for your purchases. Each certificate includes project details, impact metrics, and blockchain-verified authenticity.',
      details: ['Digital certificates', 'Blockchain verification', 'Impact documentation']
    },
    {
      step: 4,
      icon: BarChart3,
      title: 'Track Impact',
      description: 'Monitor your environmental impact through your personal dashboard. See real-time updates on project progress and your contribution to ocean health.',
      details: ['Personal dashboard', 'Impact tracking', 'Progress updates']
    }
  ];

  const verificationProcess = [
    {
      icon: Shield,
      title: 'Third-Party Verification',
      description: 'All projects undergo rigorous third-party verification by internationally recognized standards like VCS, Gold Standard, and Plan Vivo.'
    },
    {
      icon: FileCheck,
      title: 'Continuous Monitoring',
      description: 'Projects are continuously monitored using satellite imagery, field surveys, and community reporting to ensure ongoing impact.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">How It Works</Badge>
            <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">
              Simple Steps to Climate Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purchasing blue carbon credits is straightforward and transparent. 
              Every step is designed to maximize impact and build trust.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="p-4 bg-blue-600 rounded-full">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-blue-800 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                        {step.step}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl mb-3 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  
                  <ul className="text-sm text-gray-500 space-y-1">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <span className="w-1 h-1 bg-blue-600 rounded-full mr-2"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          {/* Verification & Trust */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl mb-6 text-gray-900">Verification & Trust</h3>
              <p className="text-lg text-gray-600 mb-8">
                Trust is fundamental to carbon markets. Our rigorous verification process 
                ensures every credit represents real, additional, and permanent carbon impact.
              </p>

              <div className="space-y-6">
                {verificationProcess.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Icon className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-lg mb-2 text-gray-900">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h4 className="text-2xl mb-6 text-blue-900">Certification Standards</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <h5 className="text-gray-900">Verified Carbon Standard (VCS)</h5>
                    <p className="text-sm text-gray-600">World's most used GHG program</p>
                  </div>
                  <Badge className="bg-green-600">✓ Verified</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <h5 className="text-gray-900">Gold Standard</h5>
                    <p className="text-sm text-gray-600">Ensures sustainable development</p>
                  </div>
                  <Badge className="bg-green-600">✓ Verified</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <h5 className="text-gray-900">Plan Vivo</h5>
                    <p className="text-sm text-gray-600">Community-focused projects</p>
                  </div>
                  <Badge className="bg-green-600">✓ Verified</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                  <div>
                    <h5 className="text-gray-900">Climate Action Reserve</h5>
                    <p className="text-sm text-gray-600">North America focused</p>
                  </div>
                  <Badge className="bg-green-600">✓ Verified</Badge>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-800">
                  🔗 <strong>Blockchain Integration:</strong> All transactions are recorded on an 
                  immutable ledger for complete transparency and traceability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}