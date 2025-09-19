import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Configure CORS and logging
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Initialize storage buckets and sample data on startup
async function initializeSampleData() {
  try {
    // Create storage bucket for company registration documents
    const bucketName = 'make-e5059356-company-docs';
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 10 * 1024 * 1024, // 10MB limit
        allowedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      });
      console.log('Company documents storage bucket created');
    }

    // Check if sample projects already exist
    const existingProjects = await kv.getByPrefix('project:');
    if (existingProjects.length === 0) {
      console.log('Initializing sample blue carbon projects...');
      
      const sampleProjects = [
        {
          id: 'project:1',
          name: 'Mangrove Restoration - Andhra Pradesh, India',
          location: 'Andhra Pradesh, India',
          type: 'Restoration & Protection',
          price: 17,
          certification: 'Verified Carbon Standard (VCS)',
          description: 'Large-scale mangrove restoration project protecting 5,000 hectares of coastal forest.',
          impact: '1 credit = 1 metric tonne CO₂ removed',
          credits_available: 50000,
          co_benefits: ['Biodiversity Protection', 'Local Fisheries Support', 'Coastal Defense'],
          created_at: new Date().toISOString()
        },
        {
          id: 'project:2',
          name: 'Seagrass Conservation - Great Barrier Reef',
          location: 'Queensland, Australia',
          type: 'Conservation',
          price: 22,
          certification: 'Gold Standard',
          description: 'Protecting and restoring critical seagrass meadows in the Great Barrier Reef Marine Park.',
          impact: '1 credit = 1 metric tonne CO₂ sequestered',
          credits_available: 25000,
          co_benefits: ['Marine Biodiversity', 'Tourism Support', 'Water Quality Improvement'],
          created_at: new Date().toISOString()
        },
        {
          id: 'project:3',
          name: 'Salt Marsh Restoration - Norfolk, UK',
          location: 'Norfolk, United Kingdom',
          type: 'Restoration',
          price: 19,
          certification: 'Plan Vivo',
          description: 'Restoring degraded salt marshes along the Norfolk coast to enhance carbon storage.',
          impact: '1 credit = 1 metric tonne CO₂ stored',
          credits_available: 15000,
          co_benefits: ['Flood Protection', 'Bird Habitat', 'Research Opportunities'],
          created_at: new Date().toISOString()
        },
        {
          id: 'project:4',
          name: 'Blue Carbon Initiative - Philippines',
          location: 'Palawan, Philippines',
          type: 'Community-Based',
          price: 15,
          certification: 'Climate Action Reserve',
          description: 'Community-led mangrove restoration supporting local livelihoods and coastal protection.',
          impact: '1 credit = 1 metric tonne CO₂ avoided',
          credits_available: 30000,
          co_benefits: ['Community Employment', 'Sustainable Fishing', 'Education Programs'],
          created_at: new Date().toISOString()
        }
      ];

      for (const project of sampleProjects) {
        await kv.set(project.id, project);
      }
      
      console.log('Sample projects initialized successfully');
    }

    // Initialize impact statistics
    const existingStats = await kv.get('platform:stats');
    if (!existingStats) {
      const platformStats = {
        total_credits_sold: 125000,
        total_co2_offset: 125000,
        active_projects: 150,
        countries_covered: 25,
        communities_supported: 45000,
        ecosystems_protected: 15000,
        last_updated: new Date().toISOString()
      };
      await kv.set('platform:stats', platformStats);
      console.log('Platform statistics initialized');
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
}

// Initialize data on server start
initializeSampleData();

// Routes

// Health check
app.get('/make-server-e5059356/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Get all projects for marketplace
app.get('/make-server-e5059356/projects', async (c) => {
  try {
    const projects = await kv.getByPrefix('project:');
    return c.json(projects.map(p => p.value));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});

// Get single project by ID
app.get('/make-server-e5059356/projects/:id', async (c) => {
  try {
    const projectId = c.req.param('id');
    const project = await kv.get(`project:${projectId}`);
    
    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }
    
    return c.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return c.json({ error: 'Failed to fetch project' }, 500);
  }
});

// Purchase carbon credits
app.post('/make-server-e5059356/purchase-credits', async (c) => {
  try {
    const body = await c.req.json();
    const { projectId, quantity, userId } = body;

    if (!projectId || !quantity || !userId) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Get project details
    const project = await kv.get(`project:${projectId}`);
    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }

    // Check if enough credits available
    if (project.credits_available < quantity) {
      return c.json({ error: 'Not enough credits available' }, 400);
    }

    // Create purchase record
    const purchaseId = `purchase:${Date.now()}:${userId}`;
    const purchase = {
      id: purchaseId,
      user_id: userId,
      project_id: projectId,
      project_name: project.name,
      credits_purchased: quantity,
      price_per_credit: project.price,
      total_amount: quantity * project.price,
      purchase_date: new Date().toISOString(),
      status: 'completed',
      certificate_id: `cert:${Date.now()}:${userId}`
    };

    await kv.set(purchaseId, purchase);

    // Update project credits available
    project.credits_available -= quantity;
    await kv.set(`project:${projectId}`, project);

    // Update user portfolio
    const userPortfolioKey = `portfolio:${userId}`;
    let userPortfolio = await kv.get(userPortfolioKey);
    
    if (!userPortfolio) {
      userPortfolio = {
        user_id: userId,
        total_credits: 0,
        total_spent: 0,
        total_co2_offset: 0,
        active_projects: 0,
        purchases: []
      };
    }

    userPortfolio.total_credits += quantity;
    userPortfolio.total_spent += (quantity * project.price);
    userPortfolio.total_co2_offset += quantity;
    userPortfolio.purchases.push(purchaseId);
    userPortfolio.active_projects = new Set(userPortfolio.purchases.map(p => p.split(':')[1])).size;

    await kv.set(userPortfolioKey, userPortfolio);

    // Update platform statistics
    const platformStats = await kv.get('platform:stats');
    if (platformStats) {
      platformStats.total_credits_sold += quantity;
      platformStats.total_co2_offset += quantity;
      platformStats.last_updated = new Date().toISOString();
      await kv.set('platform:stats', platformStats);
    }

    console.log(`Purchase completed: ${quantity} credits for user ${userId} from project ${projectId}`);
    
    return c.json({ 
      success: true, 
      purchase,
      message: `Successfully purchased ${quantity} carbon credits`
    });
  } catch (error) {
    console.error('Error processing purchase:', error);
    return c.json({ error: 'Failed to process purchase' }, 500);
  }
});

// Get user portfolio
app.get('/make-server-e5059356/user-portfolio', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    // For demo purposes, we'll use a mock user ID
    // In production, you'd verify the JWT token and extract the user ID
    const mockUserId = 'demo-user-123';
    
    const userPortfolio = await kv.get(`portfolio:${mockUserId}`);
    
    if (!userPortfolio) {
      return c.json({
        total_credits: 0,
        total_spent: 0,
        total_co2_offset: 0,
        active_projects: 0
      });
    }
    
    return c.json(userPortfolio);
  } catch (error) {
    console.error('Error fetching user portfolio:', error);
    return c.json({ error: 'Failed to fetch portfolio' }, 500);
  }
});

// Get user purchases
app.get('/make-server-e5059356/user-purchases', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    // For demo purposes, we'll use a mock user ID
    const mockUserId = 'demo-user-123';
    
    const purchases = await kv.getByPrefix(`purchase:`);
    const userPurchases = purchases
      .filter(p => p.value.user_id === mockUserId)
      .map(p => p.value)
      .sort((a, b) => new Date(b.purchase_date).getTime() - new Date(a.purchase_date).getTime());
    
    return c.json(userPurchases);
  } catch (error) {
    console.error('Error fetching user purchases:', error);
    return c.json({ error: 'Failed to fetch purchases' }, 500);
  }
});

// Get platform statistics
app.get('/make-server-e5059356/stats', async (c) => {
  try {
    const stats = await kv.get('platform:stats');
    return c.json(stats || {
      total_credits_sold: 0,
      total_co2_offset: 0,
      active_projects: 0,
      countries_covered: 0,
      communities_supported: 0,
      ecosystems_protected: 0
    });
  } catch (error) {
    console.error('Error fetching platform stats:', error);
    return c.json({ error: 'Failed to fetch statistics' }, 500);
  }
});

// Create new project (for project developers)
app.post('/make-server-e5059356/projects', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const body = await c.req.json();
    const {
      name,
      location,
      type,
      price,
      certification,
      description,
      impact,
      credits_available,
      co_benefits
    } = body;

    if (!name || !location || !type || !price || !certification) {
      return c.json({ error: 'Missing required project fields' }, 400);
    }

    const projectId = `project:${Date.now()}`;
    const project = {
      id: projectId,
      name,
      location,
      type,
      price,
      certification,
      description,
      impact,
      credits_available: credits_available || 0,
      co_benefits: co_benefits || [],
      created_at: new Date().toISOString(),
      status: 'pending_verification'
    };

    await kv.set(projectId, project);
    
    console.log(`New project created: ${projectId} - ${name}`);
    
    return c.json({ 
      success: true, 
      project,
      message: 'Project submitted for verification'
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return c.json({ error: 'Failed to create project' }, 500);
  }
});

// Get contact form submissions
app.post('/make-server-e5059356/contact', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, subject, message, inquiryType } = body;

    if (!name || !email || !subject || !message) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    const contactId = `contact:${Date.now()}`;
    const contact = {
      id: contactId,
      name,
      email,
      company,
      subject,
      message,
      inquiry_type: inquiryType,
      submitted_at: new Date().toISOString(),
      status: 'new'
    };

    await kv.set(contactId, contact);
    
    console.log(`New contact submission: ${contactId} from ${email}`);
    
    return c.json({ 
      success: true, 
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return c.json({ error: 'Failed to submit contact form' }, 500);
  }
});

// Submit company registration
app.post('/make-server-e5059356/company-registration', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const accessToken = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    const formData = await c.req.formData();
    const registrationData = JSON.parse(formData.get('registrationData') as string);

    // Validate required fields
    const requiredFields = ['companyName', 'fullName', 'companyContact'];
    const missingFields = requiredFields.filter(field => !registrationData[field]);
    if (missingFields.length > 0) {
      return c.json({ error: `Missing required fields: ${missingFields.join(', ')}` }, 400);
    }

    const registrationId = `company_registration:${user.id}`;
    const bucketName = 'make-e5059356-company-docs';
    const uploadedFiles: Record<string, string> = {};

    // Handle file uploads
    const fileFields = [
      'identityProof', 'companyIdentityProof', 'incorporationCertificate',
      'memorandumOfAssociation', 'articlesOfAssociation', 'bankDocument'
    ];

    for (const fieldName of fileFields) {
      const file = formData.get(fieldName) as File;
      if (file && file.size > 0) {
        try {
          const fileExtension = file.name.split('.').pop();
          const fileName = `${user.id}/${fieldName}_${Date.now()}.${fileExtension}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucketName)
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error(`Upload error for ${fieldName}:`, uploadError);
            return c.json({ error: `Failed to upload ${fieldName}: ${uploadError.message}` }, 500);
          }

          // Get signed URL for the uploaded file
          const { data: signedUrlData, error: signedUrlError } = await supabase.storage
            .from(bucketName)
            .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1 year expiry

          if (signedUrlError) {
            console.error(`Signed URL error for ${fieldName}:`, signedUrlError);
            return c.json({ error: `Failed to create access URL for ${fieldName}` }, 500);
          }

          uploadedFiles[fieldName] = {
            fileName: fileName,
            originalName: file.name,
            signedUrl: signedUrlData.signedUrl,
            uploadedAt: new Date().toISOString()
          };
        } catch (fileError) {
          console.error(`File processing error for ${fieldName}:`, fileError);
          return c.json({ error: `Failed to process ${fieldName}` }, 500);
        }
      }
    }

    // Save registration data
    const registrationRecord = {
      id: registrationId,
      user_id: user.id,
      user_email: user.email,
      company_details: {
        companyName: registrationData.companyName,
        companySize: registrationData.companySize,
        companyContact: registrationData.companyContact,
        gstin: registrationData.gstin,
        address: {
          addressLine1: registrationData.addressLine1,
          addressLine2: registrationData.addressLine2,
          pincode: registrationData.pincode,
          country: registrationData.country,
          state: registrationData.state,
          city: registrationData.city
        },
        contactPerson: {
          fullName: registrationData.fullName,
          designation: registrationData.designation
        }
      },
      kyc_details: {
        entityType: registrationData.entityType,
        documents: uploadedFiles
      },
      bank_details: {
        accountName: registrationData.accountName,
        accountNumber: registrationData.accountNumber,
        bankName: registrationData.bankName,
        branchName: registrationData.branchName,
        swiftCode: registrationData.swiftCode,
        ifscCode: registrationData.ifscCode,
        bankCity: registrationData.bankCity,
        bankCountry: registrationData.bankCountry
      },
      status: 'submitted',
      submitted_at: new Date().toISOString(),
      last_updated: new Date().toISOString()
    };

    await kv.set(registrationId, registrationRecord);
    
    console.log(`Company registration submitted: ${registrationId} for user ${user.id}`);
    
    return c.json({ 
      success: true, 
      registrationId,
      message: 'Company registration submitted successfully',
      uploadedDocuments: Object.keys(uploadedFiles)
    });
  } catch (error) {
    console.error('Error processing company registration:', error);
    return c.json({ error: 'Failed to submit company registration' }, 500);
  }
});

// Get company registration status
app.get('/make-server-e5059356/company-registration', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const accessToken = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    const registrationId = `company_registration:${user.id}`;
    const registration = await kv.get(registrationId);
    
    if (!registration) {
      return c.json({ 
        exists: false,
        message: 'No company registration found'
      });
    }
    
    return c.json({
      exists: true,
      registration: {
        ...registration,
        // Remove sensitive bank details from response
        bank_details: {
          ...registration.bank_details,
          accountNumber: registration.bank_details.accountNumber ? '****' + registration.bank_details.accountNumber.slice(-4) : ''
        }
      }
    });
  } catch (error) {
    console.error('Error fetching company registration:', error);
    return c.json({ error: 'Failed to fetch company registration' }, 500);
  }
});

// Get company registration document
app.get('/make-server-e5059356/company-registration/document/:filename', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }

    const accessToken = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Invalid token' }, 401);
    }

    const filename = c.req.param('filename');
    const bucketName = 'make-e5059356-company-docs';
    
    // Verify the file belongs to the requesting user
    if (!filename.startsWith(user.id + '/')) {
      return c.json({ error: 'Access denied' }, 403);
    }

    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(filename, 3600); // 1 hour expiry

    if (signedUrlError) {
      console.error('Signed URL error:', signedUrlError);
      return c.json({ error: 'Failed to access document' }, 500);
    }

    return c.json({ signedUrl: signedUrlData.signedUrl });
  } catch (error) {
    console.error('Error fetching document:', error);
    return c.json({ error: 'Failed to fetch document' }, 500);
  }
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Route not found' }, 404);
});

console.log('Blue Carbon Credits server starting...');
Deno.serve(app.fetch);