import React from 'react';
import { CheckCircle, Clock, FileText } from 'lucide-react';
import { Card } from '../ui/card';

interface CompletionStepProps {
  registrationId?: string;
  status?: string;
}

export function CompletionStep({ registrationId, status = 'submitted' }: CompletionStepProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-100',
          iconColor: 'text-green-600',
          title: 'Registration Approved!',
          description: 'Your company registration has been approved. You now have full access to all platform features.',
          alertBg: 'bg-green-50',
          alertText: 'text-green-800',
          alertMessage: 'Your account is now active and ready to use.'
        };
      case 'rejected':
        return {
          icon: FileText,
          bgColor: 'bg-red-100',
          iconColor: 'text-red-600',
          title: 'Registration Needs Review',
          description: 'Your registration requires additional information. Please check your email for details.',
          alertBg: 'bg-red-50',
          alertText: 'text-red-800',
          alertMessage: 'Please review the feedback and resubmit your application.'
        };
      default:
        return {
          icon: Clock,
          bgColor: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          title: 'Registration Submitted!',
          description: 'Your company registration has been submitted successfully. Our team will review your information and activate your account within 24-48 hours.',
          alertBg: 'bg-blue-50',
          alertText: 'text-blue-800',
          alertMessage: 'You will receive an email confirmation once your account is approved.'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center mb-6">
        <div className={`${statusConfig.bgColor} p-4 rounded-full`}>
          <StatusIcon className={`h-12 w-12 ${statusConfig.iconColor}`} />
        </div>
      </div>
      
      <h3 className="text-2xl">{statusConfig.title}</h3>
      
      <p className="text-gray-600 max-w-md mx-auto">
        {statusConfig.description}
      </p>

      {registrationId && (
        <Card className="p-4 bg-gray-50 max-w-md mx-auto">
          <div className="text-sm">
            <p className="font-medium">Registration ID:</p>
            <p className="text-gray-600 font-mono text-xs mt-1">{registrationId}</p>
          </div>
        </Card>
      )}
      
      <div className={`${statusConfig.alertBg} p-4 rounded-lg max-w-md mx-auto`}>
        <p className={`text-sm ${statusConfig.alertText}`}>
          {statusConfig.alertMessage}
        </p>
      </div>

      {status === 'submitted' && (
        <div className="bg-white p-4 rounded-lg border max-w-md mx-auto">
          <h4 className="font-medium mb-2">What happens next?</h4>
          <ul className="text-sm text-gray-600 text-left space-y-2">
            <li>• Document verification (1-2 business days)</li>
            <li>• KYC review and compliance check</li>
            <li>• Account activation notification</li>
            <li>• Welcome package with platform guide</li>
          </ul>
        </div>
      )}
    </div>
  );
}