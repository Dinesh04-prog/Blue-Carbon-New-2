import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { COMPANY_SIZES, COUNTRIES } from './constants';

interface CompanyDetailsStepProps {
  formData: any;
  onInputChange: (field: string, value: string) => void;
}

export function CompanyDetailsStep({ formData, onInputChange }: CompanyDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg mb-4">Company Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => onInputChange('companyName', e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          <div>
            <Label htmlFor="companySize">Company Size</Label>
            <Select value={formData.companySize} onValueChange={(value) => onInputChange('companySize', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                {COMPANY_SIZES.map((size) => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="companyContact">Company Contact No. *</Label>
            <Input
              id="companyContact"
              value={formData.companyContact}
              onChange={(e) => onInputChange('companyContact', e.target.value)}
              placeholder="Enter contact number"
            />
          </div>
          <div>
            <Label htmlFor="gstin">GSTIN</Label>
            <Input
              id="gstin"
              value={formData.gstin}
              onChange={(e) => onInputChange('gstin', e.target.value)}
              placeholder="Enter GSTIN number"
            />
          </div>
          <div>
            <Label htmlFor="addressLine1">Company Address Line 1 *</Label>
            <Input
              id="addressLine1"
              value={formData.addressLine1}
              onChange={(e) => onInputChange('addressLine1', e.target.value)}
              placeholder="Enter address line 1"
            />
          </div>
          <div>
            <Label htmlFor="addressLine2">Company Address Line 2</Label>
            <Input
              id="addressLine2"
              value={formData.addressLine2}
              onChange={(e) => onInputChange('addressLine2', e.target.value)}
              placeholder="Enter address line 2"
            />
          </div>
          <div>
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              value={formData.pincode}
              onChange={(e) => onInputChange('pincode', e.target.value)}
              placeholder="Enter pincode"
            />
          </div>
          <div>
            <Label htmlFor="country">Country *</Label>
            <Select value={formData.country} onValueChange={(value) => onInputChange('country', value)}>
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
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => onInputChange('state', e.target.value)}
              placeholder="Enter state"
            />
          </div>
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => onInputChange('city', e.target.value)}
              placeholder="Enter city"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg mb-4">Account Manager Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => onInputChange('fullName', e.target.value)}
              placeholder="Enter full name"
            />
          </div>
          <div>
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              value={formData.designation}
              onChange={(e) => onInputChange('designation', e.target.value)}
              placeholder="Enter designation"
            />
          </div>
        </div>
      </div>
    </div>
  );
}