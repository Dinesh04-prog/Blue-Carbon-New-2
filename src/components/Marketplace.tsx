import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapPin, Award, Leaf, Search, Filter } from 'lucide-react';
import { formatUsdAsInr } from '../utils/currency';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../contexts/TranslationContext';
import { projectId, publicAnonKey } from '../utils/supabase/client';

interface Project {
  id: string;
  name: string;
  location: string;
  type: string;
  price: number;
  certification: string;
  description: string;
  impact: string;
  image: string;
  credits_available: number;
  co_benefits: string[];
}

interface MarketplaceProps {
  user: any;
  onPurchaseClick?: () => void;
}

export function Marketplace({ user, onPurchaseClick }: MarketplaceProps) {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // Sample projects data - in a real app, this would come from your backend
  const sampleProjects: Project[] = [
    {
      id: '1',
      name: 'Mangrove Restoration - Andhra Pradesh, India',
      location: 'Andhra Pradesh, India',
      type: 'Restoration & Protection',
      price: 17,
      certification: 'Verified Carbon Standard (VCS)',
      description: 'Large-scale mangrove restoration project protecting 5,000 hectares of coastal forest.',
      impact: '1 credit = 1 metric tonne CO₂ removed',
      image: 'https://images.unsplash.com/photo-1683064867668-9de8892fa40c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5ncm92ZSUyMGNvYXN0YWwlMjBlY29zeXN0ZW18ZW58MXx8fHwxNzU2NDYyNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      credits_available: 50000,
      co_benefits: ['Biodiversity Protection', 'Local Fisheries Support', 'Coastal Defense']
    },
    {
      id: '2',
      name: 'Seagrass Conservation - Great Barrier Reef',
      location: 'Queensland, Australia',
      type: 'Conservation',
      price: 22,
      certification: 'Gold Standard',
      description: 'Protecting and restoring critical seagrass meadows in the Great Barrier Reef Marine Park.',
      impact: '1 credit = 1 metric tonne CO₂ sequestered',
      image: 'https://images.unsplash.com/photo-1629215833375-edd0fb49a690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHNlYWdyYXNzJTIwdW5kZXJ3YXRlcnxlbnwxfHx8fDE3NTY0NjI2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      credits_available: 25000,
      co_benefits: ['Marine Biodiversity', 'Tourism Support', 'Water Quality Improvement']
    },
    {
      id: '3',
      name: 'Salt Marsh Restoration - Norfolk, UK',
      location: 'Norfolk, United Kingdom',
      type: 'Restoration',
      price: 19,
      certification: 'Plan Vivo',
      description: 'Restoring degraded salt marshes along the Norfolk coast to enhance carbon storage.',
      impact: '1 credit = 1 metric tonne CO₂ stored',
      image: 'https://images.unsplash.com/photo-1719168370446-23f6b43b0f2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWx0bWFyc2glMjB3ZXRsYW5kJTIwY29uc2VydmF0aW9ufGVufDF8fHx8MTc1NjQ2MjYzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      credits_available: 15000,
      co_benefits: ['Flood Protection', 'Bird Habitat', 'Research Opportunities']
    },
    {
      id: '4',
      name: 'Blue Carbon Initiative - Philippines',
      location: 'Palawan, Philippines',
      type: 'Community-Based',
      price: 15,
      certification: 'Climate Action Reserve',
      description: 'Community-led mangrove restoration supporting local livelihoods and coastal protection.',
      impact: '1 credit = 1 metric tonne CO₂ avoided',
      image: 'https://images.unsplash.com/photo-1625568994589-01b221b61b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJib24lMjBvZmZzZXQlMjBmb3Jlc3R8ZW58MXx8fHwxNzU2NDYyNjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      credits_available: 30000,
      co_benefits: ['Community Employment', 'Sustainable Fishing', 'Education Programs']
    }
  ];

  useEffect(() => {
    // Simulate loading projects
    setLoading(true);
    setTimeout(() => {
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(project => 
        project.type.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      switch (priceFilter) {
        case 'low':
          filtered = filtered.filter(project => project.price < 18);
          break;
        case 'medium':
          filtered = filtered.filter(project => project.price >= 18 && project.price <= 20);
          break;
        case 'high':
          filtered = filtered.filter(project => project.price > 20);
          break;
      }
    }

    setFilteredProjects(filtered);
  }, [searchTerm, typeFilter, priceFilter, projects]);

  const handlePurchase = async (projectId: string, quantity: number = 1) => {
    if (!user) {
      alert('Please sign in to purchase credits');
      return;
    }

    // Trigger the purchase flow
    if (onPurchaseClick) {
      onPurchaseClick();
      return;
    }

    try {
      // In demo mode, simulate a successful purchase
      if (projectId === 'demo-project-id') {
        alert(`Demo: Successfully purchased ${quantity} credit(s)! In production, this would process the actual transaction.`);
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e5059356/purchase-credits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          projectId,
          quantity,
          userId: user.id
        })
      });

      if (response.ok) {
        alert(`Successfully purchased ${quantity} credit(s)!`);
      } else {
        throw new Error('Purchase failed');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert(`Demo: Successfully purchased ${quantity} credit(s)! In production, this would process through the secure payment system.`);
    }
  };

  if (loading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading marketplace...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl mb-4 text-gray-900">{t('marketplace.title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('marketplace.subtitle')}
            </p>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('marketplace.searchProjects')}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('marketplace.allTypes')}</SelectItem>
                  <SelectItem value="restoration">{t('marketplace.restoration')}</SelectItem>
                  <SelectItem value="conservation">{t('marketplace.conservation')}</SelectItem>
                  <SelectItem value="community">Community-Based</SelectItem>
                </SelectContent>
              </Select>

                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger>
                      <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                      <SelectItem value="all">{t('marketplace.allPrices')}</SelectItem>
                      <SelectItem value="low">Under {formatUsdAsInr(18)}</SelectItem>
                      <SelectItem value="medium">{formatUsdAsInr(18)} - {formatUsdAsInr(20)}</SelectItem>
                      <SelectItem value="high">Over {formatUsdAsInr(20)}</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>{t('marketplace.moreFilters')}</span>
              </Button>
            </div>
          </Card>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600">{project.type}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90">
                      <Award className="h-3 w-3 mr-1" />
                      {project.certification}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg mb-2 text-gray-900">{project.name}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{project.location}</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex items-center mb-4">
                    <Leaf className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">{project.impact}</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.co_benefits.slice(0, 2).map((benefit, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                    {project.co_benefits.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.co_benefits.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xl text-gray-900">{formatUsdAsInr(project.price)}</span>
                          <span className="text-sm text-gray-500 ml-1">{t('marketplace.pricePerCredit')}</span>
                        </div>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handlePurchase(project.id)}
                    >
                      {t('marketplace.purchaseCredits')}
                    </Button>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    {project.credits_available.toLocaleString()} {t('marketplace.creditsAvailable')}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No projects found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}