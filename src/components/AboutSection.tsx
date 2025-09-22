import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { TreePine, Waves, Sprout, TrendingUp, Shield, Users } from 'lucide-react';
import { formatINR, usdToInr } from '../utils/currency';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../contexts/TranslationContext';
import blueMitraLogo from 'figma:asset/4278c6b56461cdf7f9081edcb230c99caa111a5f.png';

export function AboutSection() {
  const { t } = useTranslation();
  
  const ecosystems = [
    {
      name: t('about.mangroves'),
      icon: TreePine,
      description: t('about.mangrovesDesc'),
      carbonRate: '1,000+ tonnes CO₂/hectare',
      color: 'bg-green-600'
    },
    {
      name: t('about.seagrass'),
      icon: Waves,
      description: t('about.seagrassDesc'),
      carbonRate: '200-400 tonnes CO₂/hectare',
      color: 'bg-blue-600'
    },
    {
      name: t('about.saltmarshes'),
      icon: Sprout,
      description: t('about.saltmarshesDesc'),
      carbonRate: '500-800 tonnes CO₂/hectare',
      color: 'bg-teal-600'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: t('about.highCarbon'),
      description: t('about.highCarbonDesc')
    },
    {
      icon: Shield,
      title: t('about.coastalProtection'),
      description: t('about.coastalProtectionDesc')
    },
    {
      icon: Users,
      title: t('about.communityBenefits'),
      description: t('about.communityBenefitsDesc')
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800">{t('about.badge')}</Badge>
          <h2 className="text-4xl md:text-5xl mb-6 text-gray-900">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        {/* Blue Carbon Ecosystems */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {ecosystems.map((ecosystem, index) => {
            const Icon = ecosystem.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 ${ecosystem.color} rounded-full`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl mb-3 text-center text-gray-900">{ecosystem.name}</h3>
                <p className="text-gray-600 text-center mb-4">{ecosystem.description}</p>
                <div className="text-center">
                  <Badge variant="outline" className="text-sm">
                    {ecosystem.carbonRate}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Why Blue Carbon Matters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl mb-6 text-gray-900">{t('about.whyTitle')}</h3>
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg mb-2 text-gray-900">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={blueMitraLogo} 
                  alt="BlueMitra Logo" 
                  className="h-8 w-8 object-contain"
                />
                <h4 className="text-lg text-blue-900">{t('about.marketImpact')}</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl text-blue-600">{formatINR(usdToInr(1_800_000_000))}</p>
                  <p className="text-sm text-blue-800">{t('about.marketSize')}</p>
                </div>
                <div>
                  <p className="text-2xl text-blue-600">35%</p>
                  <p className="text-sm text-blue-800">{t('about.annualGrowth')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1629215833375-edd0fb49a690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHNlYWdyYXNzJTIwdW5kZXJ3YXRlcnxlbnwxfHx8fDE3NTY0NjI2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Seagrass meadow underwater"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}