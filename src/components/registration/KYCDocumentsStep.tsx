import React from 'react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FileUploadField } from './FileUploadField';
import { ENTITY_TYPES } from './constants';

interface KYCDocumentsStepProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
  onFileUpload: (field: string, file: File | null) => void;
}

export function KYCDocumentsStep({ formData, onInputChange, onFileUpload }: KYCDocumentsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg mb-2">Submit your KYC documents</h3>
        <p className="text-sm text-gray-600 mb-6">
          NOTE: Please upload clear and valid documents for KYC. Rest assured, your information will be handled with the utmost confidentiality.
        </p>
      </div>

      <div className="space-y-6">
        <FileUploadField 
          label="1. Account Manager's Identity Proof (PAN Card / Passport / Aadhar Card)" 
          field="identityProof"
          file={formData.identityProof}
          onFileUpload={onFileUpload}
          required
        />
        
        <FileUploadField 
          label="2. Company Identity Proof" 
          field="companyIdentityProof"
          file={formData.companyIdentityProof}
          onFileUpload={onFileUpload}
          required
        />
        
        <FileUploadField 
          label="3. Certificate of Incorporation/Company Registration Certificate" 
          field="incorporationCertificate"
          file={formData.incorporationCertificate}
          onFileUpload={onFileUpload}
          required
        />
        
        <div>
          <Label>4. Entity Type *</Label>
          <Select value={formData.entityType} onValueChange={(value) => onInputChange('entityType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select entity type" />
            </SelectTrigger>
            <SelectContent>
              {ENTITY_TYPES.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <FileUploadField 
          label="5. Memorandum of Association (MOA)" 
          field="memorandumOfAssociation"
          file={formData.memorandumOfAssociation}
          onFileUpload={onFileUpload}
        />
        
        <FileUploadField 
          label="6. Articles of Association (AOA)" 
          field="articlesOfAssociation"
          file={formData.articlesOfAssociation}
          onFileUpload={onFileUpload}
        />
      </div>
    </div>
  );
}