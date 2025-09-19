export const COMPANY_SIZES = [
  'Startup (1-10 employees)',
  'Small Business (11-50 employees)',
  'Medium Business (51-200 employees)',
  'Large Enterprise (201-1000 employees)',
  'Corporation (1000+ employees)'
];

export const ENTITY_TYPES = [
  'Private Limited Company',
  'Public Limited Company',
  'Limited Liability Partnership (LLP)',
  'Partnership Firm',
  'Sole Proprietorship',
  'NGO/Non-Profit',
  'Government Entity',
  'Other'
];

export const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Japan', 'Singapore', 'Other'
];

export const REGISTRATION_STEPS = [
  { id: 1, title: 'Company Details', completed: false },
  { id: 2, title: 'KYC Documents', completed: false },
  { id: 3, title: 'Bank Details', completed: false },
  { id: 4, title: 'Onboarding Fees', completed: false }
];

export const INITIAL_FORM_DATA = {
  // Company Details
  companyName: '',
  companySize: '',
  companyContact: '',
  gstin: '',
  addressLine1: '',
  addressLine2: '',
  pincode: '',
  country: '',
  state: '',
  city: '',
  fullName: '',
  designation: '',
  
  // KYC Documents
  identityProof: null as File | null,
  companyIdentityProof: null as File | null,
  incorporationCertificate: null as File | null,
  entityType: '',
  memorandumOfAssociation: null as File | null,
  articlesOfAssociation: null as File | null,
  
  // Bank Details
  accountName: '',
  accountNumber: '',
  bankName: '',
  branchName: '',
  swiftCode: '',
  ifscCode: '',
  bankCity: '',
  bankCountry: '',
  bankDocument: null as File | null
};