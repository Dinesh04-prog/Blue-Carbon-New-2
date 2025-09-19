import { supabase, projectId } from '../supabase/client';

export interface CompanyRegistrationData {
  // Company Details
  companyName: string;
  companySize: string;
  companyContact: string;
  gstin: string;
  addressLine1: string;
  addressLine2: string;
  pincode: string;
  country: string;
  state: string;
  city: string;
  fullName: string;
  designation: string;
  
  // KYC Documents
  identityProof: File | null;
  companyIdentityProof: File | null;
  incorporationCertificate: File | null;
  entityType: string;
  memorandumOfAssociation: File | null;
  articlesOfAssociation: File | null;
  
  // Bank Details
  accountName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  swiftCode: string;
  ifscCode: string;
  bankCity: string;
  bankCountry: string;
  bankDocument: File | null;
}

export interface RegistrationResponse {
  success: boolean;
  registrationId?: string;
  message: string;
  uploadedDocuments?: string[];
  error?: string;
}

export interface ExistingRegistrationResponse {
  exists: boolean;
  registration?: any;
  message?: string;
}

export const companyRegistrationAPI = {
  // Check if user has existing registration
  async checkExisting(): Promise<ExistingRegistrationResponse> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('No authentication session found');
    }

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-e5059356/company-registration`, 
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to check existing registration');
    }

    return await response.json();
  },

  // Submit company registration
  async submit(formData: CompanyRegistrationData): Promise<RegistrationResponse> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('No authentication session found');
    }

    // Create FormData for file uploads
    const formDataToSubmit = new FormData();
    
    // Add registration data as JSON (excluding files)
    const fileFields = ['identityProof', 'companyIdentityProof', 'incorporationCertificate', 
                       'memorandumOfAssociation', 'articlesOfAssociation', 'bankDocument'];
    
    const cleanedData = { ...formData };
    fileFields.forEach(field => {
      delete cleanedData[field as keyof CompanyRegistrationData];
    });
    
    formDataToSubmit.append('registrationData', JSON.stringify(cleanedData));

    // Add files to FormData
    fileFields.forEach(field => {
      const file = formData[field as keyof CompanyRegistrationData] as File | null;
      if (file instanceof File) {
        formDataToSubmit.append(field, file);
      }
    });

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-e5059356/company-registration`, 
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: formDataToSubmit,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit registration');
    }

    return await response.json();
  },

  // Get document access URL
  async getDocumentUrl(filename: string): Promise<{ signedUrl: string }> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('No authentication session found');
    }

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-e5059356/company-registration/document/${filename}`, 
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get document URL');
    }

    return await response.json();
  }
};