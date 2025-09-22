import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowRight, Leaf, Waves, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../contexts/TranslationContext';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

export function Hero({ setActiveSection }: HeroProps) {
  const { t } = useTranslation();
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1683064867668-9de8892fa40c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5ncm92ZSUyMGNvYXN0YWwlMjBlY29zeXN0ZW18ZW58MXx8fHwxNzU2NDYyNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Mangrove coastal ecosystem"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl mb-6 leading-tight">
            {t('hero.welcome')}{' '}
            <span className="text-blue-300">{t('hero.blueMitra')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
              onClick={() => setActiveSection('marketplace')}
            >
              {t('hero.exploreMarketplace')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-900">
              {t('hero.learnMore')}
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-600 rounded-full">
                  <Waves className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl mb-2">2.5M+</h3>
              <p className="text-blue-200">{t('hero.tonnesOffset')}</p>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-teal-600 rounded-full">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl mb-2">150+</h3>
              <p className="text-blue-200">{t('hero.activeProjects')}</p>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-600 rounded-full">
                  <Globe className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl mb-2">25</h3>
              <p className="text-blue-200">{t('hero.countriesCovered')}</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}