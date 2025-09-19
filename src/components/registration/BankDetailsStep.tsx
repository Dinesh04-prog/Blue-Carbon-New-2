import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FileUploadField } from './FileUploadField';
import { COUNTRIES } from './constants';

interface BankDetailsStepProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
  onFileUpload: (field: string, file: File | null) => void;
}

export function BankDetailsStep({ formData, onInputChange, onFileUpload }: BankDetailsStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg mb-4">Fill your Bank Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="accountName">Company's Account name *</Label>
          <Input
            id="accountName"
            value={formData.accountName}
            onChange={(e) => onInputChange('accountName', e.target.value)}
            placeholder="Enter account name"
          />
        </div>
        <div>
          <Label htmlFor="accountNumber">Account Number *</Label>
          <Input
            id="accountNumber"
            value={formData.accountNumber}
            onChange={(e) => onInputChange('accountNumber', e.target.value)}
            placeholder="Enter account number"
          />
        </div>
        <div>
          <Label htmlFor="bankName">Bank Name *</Label>
          <Input
            id="bankName"
            value={formData.bankName}
            onChange={(e) => onInputChange('bankName', e.target.value)}
            placeholder="Enter bank name"
          />
        </div>
        <div>
          <Label htmlFor="branchName">Branch Name</Label>
          <Input
            id="branchName"
            value={formData.branchName}
            onChange={(e) => onInputChange('branchName', e.target.value)}
            placeholder="Enter branch name"
          />
        </div>
        <div>
          <Label htmlFor="swiftCode">Swift Code</Label>
          <Input
            id="swiftCode"
            value={formData.swiftCode}
            onChange={(e) => onInputChange('swiftCode', e.target.value)}
            placeholder="Enter SWIFT code"
          />
        </div>
        <div>
          <Label htmlFor="ifscCode">IFSC Code *</Label>
          <Input
            id="ifscCode"
            value={formData.ifscCode}
            onChange={(e) => onInputChange('ifscCode', e.target.value)}
            placeholder="Enter IFSC code"
          />
        </div>
        <div>
          <Label htmlFor="bankCity">City</Label>
          <Input
            id="bankCity"
            value={formData.bankCity}
            onChange={(e) => onInputChange('bankCity', e.target.value)}
            placeholder="Enter city"
          />
        </div>
        <div>
          <Label htmlFor="bankCountry">Country</Label>
          <Select value={formData.bankCountry} onValueChange={(value) => onInputChange('bankCountry', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <FileUploadField 
        label="Upload Cancelled Cheque/Bank Statement/Passbook first page"
        field="bankDocument"
        file={formData.bankDocument}
        onFileUpload={onFileUpload}
        acceptedTypes=".pdf,.jpg,.jpeg,.png"
        required
      />
    </div>
  );
}