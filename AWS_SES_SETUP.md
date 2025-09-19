# AWS SES Integration Setup Guide

This guide will help you set up AWS SES (Simple Email Service) to send verification emails for company registrations.

## Prerequisites

1. AWS Account
2. Domain name (for sending emails)
3. AWS CLI installed (optional)

## Step 1: Set up AWS SES

### 1.1 Create AWS Account
- Go to [AWS Console](https://aws.amazon.com/console/)
- Sign up or sign in to your AWS account

### 1.2 Navigate to SES
- In AWS Console, search for "SES" or go to Simple Email Service
- Make sure you're in the correct region (e.g., us-east-1)

### 1.3 Verify Email Address (Sandbox Mode)
- In SES console, go to "Verified identities"
- Click "Create identity"
- Choose "Email address"
- Enter `dineshbattul04@gmail.com` (the recipient email)
- Click "Create identity"
- Check the email and click the verification link

### 1.4 Verify Domain (Production Mode)
- In "Verified identities", click "Create identity"
- Choose "Domain"
- Enter your domain (e.g., `yourdomain.com`)
- Follow DNS verification steps
- Add the required DNS records to your domain

## Step 2: Create IAM User

### 2.1 Create IAM User
- Go to IAM console
- Click "Users" → "Create user"
- Username: `bluemitra-ses-user`
- Click "Next"

### 2.2 Attach Policy
- Click "Attach policies directly"
- Search for "AmazonSESFullAccess" or create custom policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ses:SendEmail",
                "ses:SendRawEmail"
            ],
            "Resource": "*"
        }
    ]
}
```

### 2.3 Create Access Keys
- Go to the user → "Security credentials" tab
- Click "Create access key"
- Choose "Application running outside AWS"
- Copy the Access Key ID and Secret Access Key

## Step 3: Configure Environment Variables

Create a `.env` file in your project root:

```env
# AWS SES Configuration
VITE_AWS_REGION=us-east-1
VITE_AWS_ACCESS_KEY_ID=your_actual_access_key_id
VITE_AWS_SECRET_ACCESS_KEY=your_actual_secret_access_key
VITE_AWS_FROM_EMAIL=noreply@yourdomain.com

# Razorpay Configuration
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

## Step 4: Test the Integration

### 4.1 Start the Application
```bash
npm run dev
```

### 4.2 Test Company Registration
1. Go to Company Registration
2. Fill out all the required information
3. Submit the registration
4. Check the browser console for AWS SES logs
5. Check `dineshbattul04@gmail.com` for the verification email

## Step 5: Production Considerations

### 5.1 Move Out of Sandbox
- In SES console, go to "Account dashboard"
- Click "Request production access"
- Fill out the form explaining your use case
- Wait for AWS approval (usually 24-48 hours)

### 5.2 Set up Bounce and Complaint Handling
- Configure SNS topics for bounces and complaints
- Set up Lambda functions to handle these events

### 5.3 Monitor Usage
- Set up CloudWatch alarms for sending quotas
- Monitor bounce and complaint rates

## Troubleshooting

### Common Issues

1. **"Email address not verified"**
   - Make sure you've verified the sender email in SES
   - Check if you're in sandbox mode

2. **"Access denied"**
   - Verify IAM user has correct permissions
   - Check AWS credentials in environment variables

3. **"Invalid region"**
   - Make sure the region in your env file matches your SES region
   - Some regions don't support SES

### Debug Mode
The application includes fallback logging. If AWS SES fails, check the browser console for detailed error messages and fallback email data.

## Security Best Practices

1. **Never commit AWS credentials to version control**
2. **Use IAM roles instead of access keys when possible**
3. **Rotate access keys regularly**
4. **Use least privilege principle for IAM policies**
5. **Enable CloudTrail for audit logging**

## Cost Considerations

- SES charges $0.10 per 1,000 emails sent
- First 62,000 emails per month are free if sent from EC2
- No charges for emails that bounce or are rejected

## Support

For AWS SES specific issues:
- [AWS SES Documentation](https://docs.aws.amazon.com/ses/)
- [AWS Support](https://aws.amazon.com/support/)

For application issues:
- Check browser console for error messages
- Verify environment variables are set correctly
- Test with a simple email first

