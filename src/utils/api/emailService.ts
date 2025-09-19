import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export interface CompanyRegistrationEmailData {
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
  entityType: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  swiftCode: string;
  ifscCode: string;
  bankCity: string;
  bankCountry: string;
  registrationId: string;
  submittedAt: string;
}

// Initialize AWS SES client
const sesClient = new SESClient({
  region: process.env.VITE_AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function sendCompanyRegistrationEmail(data: CompanyRegistrationEmailData): Promise<void> {
  try {
    const fromEmail = process.env.VITE_AWS_FROM_EMAIL || 'noreply@bluemitra.com';
    const toEmail = 'dineshbattul04@gmail.com';
    
    const command = new SendEmailCommand({
      Source: fromEmail,
      Destination: {
        ToAddresses: [toEmail],
      },
      Message: {
        Subject: {
          Data: `New Company Registration - ${data.companyName}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: generateEmailHTML(data),
            Charset: 'UTF-8',
          },
          Text: {
            Data: generateEmailText(data),
            Charset: 'UTF-8',
          },
        },
      },
    });

    console.log('Sending company registration email via AWS SES...');
    const result = await sesClient.send(command);
    
    console.log('Email sent successfully via AWS SES:', result.MessageId);
    console.log('Email sent to:', toEmail);
  } catch (error) {
    console.error('Failed to send email via AWS SES:', error);
    
    // Fallback to console logging if AWS SES fails
    console.log('Falling back to console logging...');
    console.log('Company Registration Email Data:', {
      to: 'dineshbattul04@gmail.com',
      subject: `New Company Registration - ${data.companyName}`,
      data: data
    });
    
    throw new Error('Failed to send verification email via AWS SES');
  }
}

function generateEmailHTML(data: CompanyRegistrationEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Company Registration - BlueMitra</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .section { margin-bottom: 20px; }
        .section h3 { color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 5px; }
        .field { margin-bottom: 10px; }
        .field-label { font-weight: bold; color: #555; }
        .field-value { margin-left: 10px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .action-button { 
          display: inline-block; 
          background: #0ea5e9; 
          color: white; 
          padding: 10px 20px; 
          text-decoration: none; 
          border-radius: 5px; 
          margin: 10px 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔵 BlueMitra</h1>
          <h2>New Company Registration</h2>
        </div>
        
        <div class="content">
          <p><strong>A new company has registered on BlueMitra and requires verification.</strong></p>
          
          <div class="section">
            <h3>📋 Registration Details</h3>
            <div class="field">
              <span class="field-label">Registration ID:</span>
              <span class="field-value">${data.registrationId}</span>
            </div>
            <div class="field">
              <span class="field-label">Submitted At:</span>
              <span class="field-value">${new Date(data.submittedAt).toLocaleString()}</span>
            </div>
          </div>

          <div class="section">
            <h3>🏢 Company Information</h3>
            <div class="field">
              <span class="field-label">Company Name:</span>
              <span class="field-value">${data.companyName}</span>
            </div>
            <div class="field">
              <span class="field-label">Company Size:</span>
              <span class="field-value">${data.companySize}</span>
            </div>
            <div class="field">
              <span class="field-label">Entity Type:</span>
              <span class="field-value">${data.entityType}</span>
            </div>
            <div class="field">
              <span class="field-label">GSTIN:</span>
              <span class="field-value">${data.gstin}</span>
            </div>
            <div class="field">
              <span class="field-label">Contact:</span>
              <span class="field-value">${data.companyContact}</span>
            </div>
          </div>

          <div class="section">
            <h3>📍 Address</h3>
            <div class="field">
              <span class="field-label">Address:</span>
              <span class="field-value">${data.addressLine1}${data.addressLine2 ? ', ' + data.addressLine2 : ''}</span>
            </div>
            <div class="field">
              <span class="field-label">City:</span>
              <span class="field-value">${data.city}</span>
            </div>
            <div class="field">
              <span class="field-label">State:</span>
              <span class="field-value">${data.state}</span>
            </div>
            <div class="field">
              <span class="field-label">Country:</span>
              <span class="field-value">${data.country}</span>
            </div>
            <div class="field">
              <span class="field-label">Pincode:</span>
              <span class="field-value">${data.pincode}</span>
            </div>
          </div>

          <div class="section">
            <h3>👤 Contact Person</h3>
            <div class="field">
              <span class="field-label">Full Name:</span>
              <span class="field-value">${data.fullName}</span>
            </div>
            <div class="field">
              <span class="field-label">Designation:</span>
              <span class="field-value">${data.designation}</span>
            </div>
          </div>

          <div class="section">
            <h3>🏦 Bank Details</h3>
            <div class="field">
              <span class="field-label">Account Name:</span>
              <span class="field-value">${data.accountName}</span>
            </div>
            <div class="field">
              <span class="field-label">Account Number:</span>
              <span class="field-value">${data.accountNumber}</span>
            </div>
            <div class="field">
              <span class="field-label">Bank Name:</span>
              <span class="field-value">${data.bankName}</span>
            </div>
            <div class="field">
              <span class="field-label">Branch:</span>
              <span class="field-value">${data.branchName}</span>
            </div>
            <div class="field">
              <span class="field-label">IFSC Code:</span>
              <span class="field-value">${data.ifscCode}</span>
            </div>
            <div class="field">
              <span class="field-label">SWIFT Code:</span>
              <span class="field-value">${data.swiftCode}</span>
            </div>
            <div class="field">
              <span class="field-label">Bank City:</span>
              <span class="field-value">${data.bankCity}</span>
            </div>
            <div class="field">
              <span class="field-label">Bank Country:</span>
              <span class="field-value">${data.bankCountry}</span>
            </div>
          </div>

          <div class="section">
            <h3>✅ Required Actions</h3>
            <p>Please review the above information and:</p>
            <ul>
              <li>Verify all company details are accurate</li>
              <li>Check uploaded KYC documents</li>
              <li>Validate bank account information</li>
              <li>Approve or reject the registration</li>
            </ul>
          </div>
        </div>

        <div class="footer">
          <p>This email was sent from BlueMitra Blue Carbon Credits Marketplace</p>
          <p>Please do not reply to this email. Contact support if needed.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateEmailText(data: CompanyRegistrationEmailData): string {
  return `
New Company Registration - BlueMitra

A new company has registered on BlueMitra and requires verification.

REGISTRATION DETAILS:
- Registration ID: ${data.registrationId}
- Submitted At: ${new Date(data.submittedAt).toLocaleString()}

COMPANY INFORMATION:
- Company Name: ${data.companyName}
- Company Size: ${data.companySize}
- Entity Type: ${data.entityType}
- GSTIN: ${data.gstin}
- Contact: ${data.companyContact}

ADDRESS:
- Address: ${data.addressLine1}${data.addressLine2 ? ', ' + data.addressLine2 : ''}
- City: ${data.city}
- State: ${data.state}
- Country: ${data.country}
- Pincode: ${data.pincode}

CONTACT PERSON:
- Full Name: ${data.fullName}
- Designation: ${data.designation}

BANK DETAILS:
- Account Name: ${data.accountName}
- Account Number: ${data.accountNumber}
- Bank Name: ${data.bankName}
- Branch: ${data.branchName}
- IFSC Code: ${data.ifscCode}
- SWIFT Code: ${data.swiftCode}
- Bank City: ${data.bankCity}
- Bank Country: ${data.bankCountry}

REQUIRED ACTIONS:
Please review the above information and:
- Verify all company details are accurate
- Check uploaded KYC documents
- Validate bank account information
- Approve or reject the registration

This email was sent from BlueMitra Blue Carbon Credits Marketplace
  `;
}
