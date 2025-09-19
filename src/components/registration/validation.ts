export const isStepValid = (step: number, formData: any): boolean => {
  switch (step) {
    case 1:
      return !!(formData.companyName && formData.companyContact && formData.addressLine1 && 
               formData.city && formData.country && formData.fullName);
    case 2:
      return !!(formData.identityProof && formData.companyIdentityProof && 
               formData.incorporationCertificate && formData.entityType);
    case 3:
      return !!(formData.accountName && formData.accountNumber && formData.bankName && 
               formData.ifscCode && formData.bankDocument);
    default:
      return false;
  }
};