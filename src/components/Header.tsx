import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, LogOut } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from '../contexts/TranslationContext';
import blueMitraLogo from 'figma:asset/4278c6b56461cdf7f9081edcb230c99caa111a5f.png';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  user: any;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function Header({ activeSection, setActiveSection, user, onSignIn, onSignOut }: HeaderProps) {
  const { t } = useTranslation();
  
  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'marketplace', label: t('nav.marketplace') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'sell-credits', label: t('nav.sellCredits') },
    { id: 'faq', label: t('nav.faq') },
    { id: 'contact', label: t('nav.contact') }
  ];

  // Add company registration for signed-in users
  const allNavItems = user ? [
    ...navItems,
    { id: 'company-registration', label: t('nav.companyRegistration') }
  ] : navItems;

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setActiveSection('home')}
          >
            <img 
              src={blueMitraLogo} 
              alt="BlueMitra Logo" 
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-xl text-primary">BlueMitra</h1>
              <p className="text-xs text-muted-foreground">Blue Carbon Credits</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {allNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            {user ? (
              <div className="flex items-center space-x-3">
                {user.user_metadata?.user_type && (
                  <Badge variant="outline" className="text-xs">
                    {user.user_metadata.user_type}
                  </Badge>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveSection('dashboard')}
                  className="hidden sm:flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>{t('nav.dashboard')}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onSignOut}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={onSignIn} className="bg-blue-600 hover:bg-blue-700">
                {t('nav.signIn')}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex items-center space-x-6 overflow-x-auto">
          {allNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`whitespace-nowrap text-sm transition-colors ${
                activeSection === item.id
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}