import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Building, FileCheck, CreditCard, ArrowRight, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';
import blueMitraLogo from 'figma:asset/4278c6b56461cdf7f9081edcb230c99caa111a5f.png';
import { CompanyDetailsStep } from './registration/CompanyDetailsStep';
import { KYCDocumentsStep } from './registration/KYCDocumentsStep';
import { BankDetailsStep } from './registration/BankDetailsStep';
import { CompletionStep } from './registration/CompletionStep';
import { INITIAL_FORM_DATA } from './registration/constants';
import { isStepValid } from './registration/validation';
import { companyRegistrationAPI } from '../utils/api/companyRegistration';

interface CompanyRegistrationProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export function CompanyRegistration({ onComplete, onSkip }: CompanyRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [existingRegistration, setExistingRegistration] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const steps = [
    { id: 1, title: 'Company Details', icon: Building, completed: currentStep > 1 },
    { id: 2, title: 'KYC Documents', icon: FileCheck, completed: currentStep > 2 },
    { id: 3, title: 'Bank Details', icon: CreditCard, completed: currentStep > 3 },
    { id: 4, title: 'Onboarding Fees', icon: CheckCircle, completed: false }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  // Check for existing registration on component mount
  useEffect(() => {
    checkExistingRegistration();
  }, []);

  const checkExistingRegistration = async () => {
    try {
      const result = await companyRegistrationAPI.checkExisting();
      
      if (result.exists) {
        setExistingRegistration(result.registration);
        // If registration exists and is completed, go to step 4
        if (result.registration.status === 'submitted' || result.registration.status === 'approved') {
          setCurrentStep(4);
        }
      }
    } catch (error) {
      console.error('Error checking existing registration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitRegistration = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await companyRegistrationAPI.submit(formData);
      
      toast.success('Company registration submitted successfully!');
      console.log('Registration submitted:', result);
      
      // Update existing registration state
      await checkExistingRegistration();
      
      // Move to completion step
      setCurrentStep(4);
      
    } catch (error) {
      console.error('Registration submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit registration');
      toast.error('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  const nextStep = async () => {
    if (currentStep < 3 && isStepValid(currentStep, formData)) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3 && isStepValid(currentStep, formData)) {
      // Submit registration when moving from step 3 to 4
      await submitRegistration();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };



  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyDetailsStep 
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <KYCDocumentsStep 
            formData={formData}
            onInputChange={handleInputChange}
            onFileUpload={handleFileUpload}
          />
        );
      case 3:
        return (
          <BankDetailsStep 
            formData={formData}
            onInputChange={handleInputChange}
            onFileUpload={handleFileUpload}
          />
        );
      case 4:
        return <CompletionStep 
          registrationId={existingRegistration?.id} 
          status={existingRegistration?.status || 'submitted'} 
        />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="h-5 w-5 animate-spin" />
          <span>Loading registration status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <img 
              src={blueMitraLogo} 
              alt="BlueMitra Logo" 
              className="h-10 w-10 object-contain"
            />
            <div>
              <h1 className="text-2xl text-primary">BlueMitra</h1>
              <p className="text-sm text-muted-foreground">Company Registration</p>
            </div>
          </div>
          {onSkip && currentStep !== 4 && (
            <Button variant="ghost" onClick={onSkip} className="text-gray-500">
              Skip for now
            </Button>
          )}
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = step.completed;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : isCompleted 
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-2" />
        </div>

        {/* Existing Registration Alert */}
        {existingRegistration && currentStep < 4 && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You have an existing registration (Status: {existingRegistration.status}). 
              You can update your information or proceed to completion.
            </AlertDescription>
          </Alert>
        )}

        {/* Submit Error Alert */}
        {submitError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Step {currentStep} of 4</span>
              {currentStep < 4 && (
                <Badge variant="outline">
                  {isStepValid(currentStep, formData) ? 'Complete' : 'Required fields missing'}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={!isStepValid(currentStep, formData) || isSubmitting}
              className="flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>{currentStep === 3 ? 'Submit Registration' : 'Next'}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex justify-center mt-8">
            <Button onClick={onComplete} size="lg">
              Continue to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}