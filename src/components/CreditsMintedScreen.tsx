import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  Coins, 
  ExternalLink, 
  Download,
  Share2,
  Award,
  Sparkles,
  Clock,
  MapPin,
  Calendar,
  Users
} from 'lucide-react';
import blueMitraLogo from 'figma:asset/4278c6b56461cdf7f9081edcb230c99caa111a5f.png';

interface CreditsMintedScreenProps {
  projectData?: {
    id: number;
    name: string;
    location: string;
    type: string;
    creditsIssued: number;
    tokenStandard: 'ERC-20' | 'ERC-721';
    transactionHash: string;
    mintingDate: string;
    validationDate: string;
    validator: string;
    projectDeveloper: string;
  };
}

export function CreditsMintedScreen({ projectData }: CreditsMintedScreenProps) {
  // Mock data if none provided
  const project = projectData || {
    id: 1,
    name: 'Mangrove Restoration - Philippines',
    location: 'Palawan, Philippines',
    type: 'Mangrove Restoration',
    creditsIssued: 8500,
    tokenStandard: 'ERC-20' as const,
    transactionHash: '0x742d35cc6435c228c92d24e3e145c6c44b7be16745c2c7a0b7e3e2b0f8a9c2e1',
    mintingDate: '2024-03-15T10:30:00Z',
    validationDate: '2024-03-10T14:20:00Z',
    validator: 'Dr. Sarah Chen, Verified Carbon Standard',
    projectDeveloper: 'Blue Ocean Solutions Ltd.'
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${project.name} - Credits Successfully Minted`,
        text: `${project.creditsIssued.toLocaleString()} blue carbon credits have been successfully minted for ${project.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownloadCertificate = () => {
    alert('Digital certificate download initiated');
  };

  const handleViewOnBlockchain = () => {
    window.open(`https://etherscan.io/tx/${project.transactionHash}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <CheckCircle className="h-12 w-12 text-green-600" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Credits Successfully Minted!
          </h1>
          <p className="text-xl text-muted-foreground">
            Your blue carbon project has been validated and credits are now available on the blockchain
          </p>
        </div>

        {/* Main Credit Information */}
        <Card className="mb-8 border-2 border-green-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{project.name}</CardTitle>
                <CardDescription className="flex items-center gap-4 text-base">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {project.type}
                  </Badge>
                </CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                <Coins className="h-5 w-5 mr-2" />
                {project.creditsIssued.toLocaleString()} tCO2e
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-lg">Credit Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Credits Issued:</span>
                      <span className="font-semibold">{project.creditsIssued.toLocaleString()} tCO2e</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Token Standard:</span>
                      <Badge variant="outline">{project.tokenStandard}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Project Developer:</span>
                      <span>{project.projectDeveloper}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Validator:</span>
                      <span>{project.validator}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-lg">Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">Credits Minted</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(project.mintingDate).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          <span className="font-medium">Project Validated</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(project.validationDate).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-lg">Blockchain Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Transaction Hash</div>
                      <div className="font-mono text-sm break-all bg-white p-2 rounded border">
                        {project.transactionHash}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={handleViewOnBlockchain}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Blockchain Explorer
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-lg">Environmental Impact</h3>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {project.creditsIssued.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-700">
                        Tonnes of CO2 equivalent sequestered
                      </div>
                      <div className="text-xs text-green-600 mt-2">
                        Equivalent to removing ~{Math.round(project.creditsIssued / 4.6)} cars from the road for a year
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button size="lg" onClick={handleDownloadCertificate}>
            <Download className="h-5 w-5 mr-2" />
            Download Certificate
          </Button>
          <Button variant="outline" size="lg" onClick={handleShare}>
            <Share2 className="h-5 w-5 mr-2" />
            Share Achievement
          </Button>
          <Button variant="outline" size="lg" onClick={handleViewOnBlockchain}>
            <ExternalLink className="h-5 w-5 mr-2" />
            View on Blockchain
          </Button>
        </div>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              What's Next?
            </CardTitle>
            <CardDescription>
              Your credits are now available for sale in the marketplace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Marketplace Listing</h4>
                <p className="text-sm text-muted-foreground">
                  Your credits will automatically appear in the marketplace for potential buyers. 
                  You can set pricing and availability preferences in your dashboard.
                </p>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Marketplace Listing
                </Button>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Project Monitoring</h4>
                <p className="text-sm text-muted-foreground">
                  Continue monitoring your project's ongoing performance and submit periodic 
                  verification reports to maintain credit validity.
                </p>
                <Button variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  View Project Dashboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Digital Badge */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-green-100 px-6 py-3 rounded-full">
            <img 
              src={blueMitraLogo} 
              alt="BlueMitra Logo" 
              className="h-6 w-6 object-contain"
            />
            <Award className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">
              BlueMitra Verified Credit Producer
            </span>
            <Sparkles className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}