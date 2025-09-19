import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { Marketplace } from './components/Marketplace';
import { HowItWorks } from './components/HowItWorks';
import { ProjectDirectory } from './components/ProjectDirectory';
import { ImpactDashboard } from './components/ImpactDashboard';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { AuthModal } from './components/AuthModal';
import { UserDashboard } from './components/UserDashboard';
import { DashboardSelector } from './components/DashboardSelector';
import { CreditsMintedScreen } from './components/CreditsMintedScreen';
import { PurchaseFlow } from './components/PurchaseFlow';
import { CompanyRegistration } from './components/CompanyRegistration';
import SellCredits from './components/SellCredits';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { supabase } from './utils/supabase/client';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPurchaseFlow, setShowPurchaseFlow] = useState(false);
  const [showCreditsMinted, setShowCreditsMinted] = useState(false);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    };
    
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (event === 'SIGNED_IN') {
        setShowAuthModal(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setActiveSection('home');
    setIsRegistrationComplete(false);
  };

  const handleRegistrationComplete = () => {
    setIsRegistrationComplete(true);
  };

  const handleSkipRegistration = () => {
    // Just mark as complete for now
    setIsRegistrationComplete(true);
  };

  const renderContent = () => {
    // Show special flows if active
    if (showPurchaseFlow) {
      return <PurchaseFlow onClose={() => setShowPurchaseFlow(false)} />;
    }
    
    if (showCreditsMinted) {
      return <CreditsMintedScreen />;
    }

    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero setActiveSection={setActiveSection} />
            <AboutSection />
            <HowItWorks />
            <ImpactDashboard />
          </>
        );
      case 'marketplace':
        return <Marketplace user={user} onPurchaseClick={() => setShowPurchaseFlow(true)} />;
      case 'projects':
        return <ProjectDirectory />;
      case 'sell-credits':
        return user ? (
          <SellCredits />
        ) : (
          <div className="p-8 text-center">
            <h2 className="mb-4">Access Restricted</h2>
            <p className="text-muted-foreground">Please sign in to access the sell credits page.</p>
            <Button onClick={() => setShowAuthModal(true)} className="mt-4">
              Sign In
            </Button>
          </div>
        );
      case 'dashboard':
        return user ? <DashboardSelector user={user} /> : <div className="p-8 text-center">Please sign in to view your dashboard.</div>;
      case 'company-registration':
        return user ? (
          <CompanyRegistration 
            onComplete={() => {
              handleRegistrationComplete();
              setActiveSection('dashboard');
            }}
            onSkip={() => {
              handleSkipRegistration();
              setActiveSection('dashboard');
            }}
          />
        ) : (
          <div className="p-8 text-center">
            <h2 className="mb-4">Access Restricted</h2>
            <p className="text-muted-foreground">Please sign in to access company registration.</p>
            <Button onClick={() => setShowAuthModal(true)} className="mt-4">
              Sign In
            </Button>
          </div>
        );
      case 'faq':
        return <FAQ />;
      case 'contact':
        return <Contact />;
      case 'credits-minted':
        return <CreditsMintedScreen />;
      case 'purchase-flow':
        return <PurchaseFlow onClose={() => setActiveSection('marketplace')} />;
      default:
        return (
          <>
            <Hero setActiveSection={setActiveSection} />
            <AboutSection />
            <HowItWorks />
            <ImpactDashboard />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        user={user}
        onSignIn={() => setShowAuthModal(true)}
        onSignOut={handleSignOut}
      />
      
      {renderContent()}
      
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
        />
      )}
      
      {/* Demo Navigation - Remove in production */}
      {user && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
          <div className="text-sm font-semibold mb-2">Demo Navigation:</div>
          <div className="space-y-1">
            <button 
              onClick={() => setShowCreditsMinted(true)} 
              className="block w-full text-left text-xs text-blue-600 hover:underline"
            >
              View Credits Minted
            </button>
            <button 
              onClick={() => setShowPurchaseFlow(true)} 
              className="block w-full text-left text-xs text-blue-600 hover:underline"
            >
              Demo Purchase Flow
            </button>
          </div>
        </div>
      )}
      
      <Toaster />
    </div>
  );
}