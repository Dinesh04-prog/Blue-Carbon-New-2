import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Calendar, Users, Leaf, TrendingUp, Award, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../contexts/TranslationContext';

interface Project {
  id: string;
  name: string;
  location: string;
  country: string;
  type: string;
  status: string;
  startDate: string;
  area: string;
  carbonStored: string;
  certification: string;
  description: string;
  longDescription: string;
  objectives: string[];
  community_benefits: string[];
  environmental_benefits: string[];
  methodology: string;
  monitoring: string;
  images: string[];
  progress: number;
  credits_issued: number;
  total_credits: number;
}

export function ProjectDirectory() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      name: 'Mangrove Restoration - Andhra Pradesh',
      location: 'Andhra Pradesh',
      country: 'India',
      type: 'Restoration & Protection',
      status: 'Active',
      startDate: '2022-03-15',
      area: '5,000 hectares',
      carbonStored: '500,000 tonnes CO₂',
      certification: 'Verified Carbon Standard (VCS)',
      description: 'Large-scale mangrove restoration project protecting coastal communities and marine ecosystems.',
      longDescription: 'This comprehensive mangrove restoration project spans 5,000 hectares along the Andhra Pradesh coastline. The project focuses on replanting native mangrove species, protecting existing forests from degradation, and establishing sustainable management practices with local communities. The initiative not only sequesters significant amounts of carbon but also provides crucial ecosystem services including coastal protection, biodiversity habitat, and sustainable livelihoods for fishing communities.',
      objectives: [
        'Restore 5,000 hectares of degraded mangrove ecosystems',
        'Sequester 500,000 tonnes of CO₂ over 20 years',
        'Protect coastal communities from storm surge and erosion',
        'Create sustainable employment for 2,500 local residents',
        'Establish 15 community-managed conservation areas'
      ],
      community_benefits: [
        'Employment for 2,500 local residents',
        'Sustainable fishing opportunities',
        'Eco-tourism development',
        'Education and training programs',
        'Healthcare facility improvements'
      ],
      environmental_benefits: [
        'Carbon sequestration: 25,000 tonnes CO₂/year',
        'Biodiversity habitat for 150+ species',
        'Coastal protection from storms',
        'Water quality improvement',
        'Nursery habitat for marine life'
      ],
      methodology: 'VM0007 - REDD+ Methodology Framework (REDD-MF)',
      monitoring: 'Quarterly field surveys, annual third-party verification, satellite monitoring',
      images: [
        'https://images.unsplash.com/photo-1683064867668-9de8892fa40c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5ncm92ZSUyMGNvYXN0YWwlMjBlY29zeXN0ZW18ZW58MXx8fHwxNzU2NDYyNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      progress: 75,
      credits_issued: 37500,
      total_credits: 50000
    },
    {
      id: '2',
      name: 'Great Barrier Reef Seagrass Conservation',
      location: 'Queensland',
      country: 'Australia',
      type: 'Conservation',
      status: 'Active',
      startDate: '2021-09-20',
      area: '2,500 hectares',
      carbonStored: '200,000 tonnes CO₂',
      certification: 'Gold Standard',
      description: 'Protecting critical seagrass meadows that serve as nurseries for marine life and carbon sinks.',
      longDescription: 'Located within the Great Barrier Reef Marine Park, this project protects and restores seagrass meadows that are essential for marine biodiversity and carbon sequestration. The project works with traditional owners, marine scientists, and local communities to implement sustainable management practices that allow these underwater grasslands to thrive while providing significant climate benefits.',
      objectives: [
        'Protect 2,500 hectares of seagrass meadows',
        'Restore degraded seagrass areas',
        'Monitor carbon sequestration rates',
        'Support marine biodiversity conservation',
        'Engage local and indigenous communities'
      ],
      community_benefits: [
        'Indigenous community employment',
        'Marine research opportunities',
        'Sustainable tourism revenue',
        'Traditional knowledge preservation',
        'Educational programs'
      ],
      environmental_benefits: [
        'Carbon sequestration: 8,000 tonnes CO₂/year',
        'Marine biodiversity protection',
        'Fish nursery habitat',
        'Water quality improvement',
        'Coastal stabilization'
      ],
      methodology: 'Blue Carbon Methodology for Seagrass',
      monitoring: 'Underwater surveys, carbon flux measurements, biodiversity assessments',
      images: [
        'https://images.unsplash.com/photo-1629215833375-edd0fb49a690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHNlYWdyYXNzJTIwdW5kZXJ3YXRlcnxlbnwxfHx8fDE3NTY0NjI2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      progress: 60,
      credits_issued: 15000,
      total_credits: 25000
    },
    {
      id: '3',
      name: 'Norfolk Salt Marsh Restoration',
      location: 'Norfolk',
      country: 'United Kingdom',
      type: 'Restoration',
      status: 'Planning',
      startDate: '2024-06-01',
      area: '1,200 hectares',
      carbonStored: '150,000 tonnes CO₂',
      certification: 'Plan Vivo',
      description: 'Restoring salt marshes to provide natural flood defenses and carbon storage.',
      longDescription: 'This innovative project restores degraded salt marshes along the Norfolk coast, creating natural flood defenses while sequestering significant amounts of carbon. The project works closely with local farmers, conservation groups, and coastal communities to implement managed realignment and salt marsh restoration techniques that benefit both climate and local resilience.',
      objectives: [
        'Restore 1,200 hectares of salt marsh habitat',
        'Provide natural flood protection',
        'Sequester 150,000 tonnes of CO₂',
        'Create wildlife corridors',
        'Support local agriculture adaptation'
      ],
      community_benefits: [
        'Flood protection for coastal communities',
        'Green jobs creation',
        'Research and education opportunities',
        'Recreational access improvements',
        'Agricultural land protection'
      ],
      environmental_benefits: [
        'Carbon sequestration: 7,500 tonnes CO₂/year',
        'Flood and erosion protection',
        'Bird habitat creation',
        'Water quality improvement',
        'Landscape connectivity'
      ],
      methodology: 'Wetlands Restoration and Conservation Methodology',
      monitoring: 'Annual vegetation surveys, carbon sampling, flood protection assessment',
      images: [
        'https://images.unsplash.com/photo-1719168370446-23f6b43b0f2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWx0bWFyc2glMjB3ZXRsYW5kJTIwY29uc2VydmF0aW9ufGVufDF8fHx8MTc1NjQ2MjYzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      ],
      progress: 15,
      credits_issued: 0,
      total_credits: 15000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-600';
      case 'Planning': return 'bg-yellow-600';
      case 'Completed': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  if (selectedProject) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setSelectedProject(null)}
              className="mb-6"
            >
              ← Back to Projects
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="relative h-96 mb-8">
                  <ImageWithFallback
                    src={selectedProject.images[0]}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                  <div className="absolute bottom-6 left-6">
                    <Badge className={`${getStatusColor(selectedProject.status)} mb-2`}>
                      {selectedProject.status}
                    </Badge>
                    <h1 className="text-3xl md:text-4xl text-white mb-2">{selectedProject.name}</h1>
                    <div className="flex items-center text-white/90">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{selectedProject.location}, {selectedProject.country}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl mb-4 text-gray-900">Project Overview</h2>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.longDescription}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl mb-4 text-gray-900">Project Objectives</h2>
                    <ul className="space-y-2">
                      {selectedProject.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl mb-4 text-gray-900">Community Benefits</h3>
                      <ul className="space-y-2">
                        {selectedProject.community_benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <Users className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl mb-4 text-gray-900">Environmental Benefits</h3>
                      <ul className="space-y-2">
                        {selectedProject.environmental_benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <Leaf className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl mb-4 text-gray-900">Methodology & Monitoring</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-4">
                        <h4 className="text-gray-900 mb-2">Methodology</h4>
                        <p className="text-sm text-gray-600">{selectedProject.methodology}</p>
                      </Card>
                      <Card className="p-4">
                        <h4 className="text-gray-900 mb-2">Monitoring</h4>
                        <p className="text-sm text-gray-600">{selectedProject.monitoring}</p>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl mb-4 text-gray-900">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Type</span>
                      <Badge variant="outline">{selectedProject.type}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Area</span>
                      <span className="text-gray-900">{selectedProject.area}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Start Date</span>
                      <span className="text-gray-900">
                        {new Date(selectedProject.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Certification</span>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-blue-600 mr-1" />
                        <span className="text-sm text-gray-900">{selectedProject.certification}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl mb-4 text-gray-900">Carbon Impact</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Total Carbon Storage</span>
                        <span className="text-gray-900">{selectedProject.carbonStored}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-900">{selectedProject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${selectedProject.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-gray-600">Credits Issued</span>
                        <span className="text-gray-900">
                          {selectedProject.credits_issued.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Credits</span>
                        <span className="text-gray-900">
                          {selectedProject.total_credits.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View in Marketplace
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl mb-4 text-gray-900">{t('projects.title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getStatusColor(project.status)}`}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90">
                      <Award className="h-3 w-3 mr-1" />
                      {project.certification.split(' ')[0]}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg mb-2 text-gray-900">{project.name}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.location}, {project.country}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t('projects.area')}</span>
                      <span className="text-gray-900">{project.area}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t('projects.carbonStorage')}</span>
                      <span className="text-gray-900">{project.carbonStored}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t('projects.progress')}</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-900">{project.progress}%</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => setSelectedProject(project)}
                  >
                    {t('projects.viewDetails')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}