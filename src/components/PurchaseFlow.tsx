import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  ShoppingCart, 
  CreditCard, 
  Wallet, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Download,
  ExternalLink,
  ArrowRight,
  Shield,
  Zap,
  Receipt
} from 'lucide-react';

interface PurchaseFlowProps {
  creditData?: {
    id: number;
    projectName: string;
    location: string;
    type: string;
    pricePerCredit: number;
    available: number;
    verification: string;
    developer: string;
  };
  onClose?: () => void;
}

export function PurchaseFlow({ creditData, onClose }: PurchaseFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQuantity] = useState(100);
  const [paymentMethod] = useState<'fiat'>('fiat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  // Mock credit data if none provided
  const credit = creditData || {
    id: 1,
    projectName: 'Mangrove Restoration - Philippines',
    location: 'Palawan, Philippines',
    type: 'Mangrove Restoration',
    pricePerCredit: 18.50,
    available: 2500,
    verification: 'Verified Carbon Standard (VCS)',
    developer: 'Blue Ocean Solutions'
  };

  const totalPrice = quantity * credit.pricePerCredit;
  const platformFee = totalPrice * 0.025; // 2.5% platform fee
  const finalTotal = totalPrice + platformFee;

  // Dynamically load Razorpay script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const steps = [
    { id: 1, name: 'Select Quantity', icon: ShoppingCart },
    { id: 2, name: 'Payment Method', icon: CreditCard },
    { id: 3, name: 'Confirm Purchase', icon: Shield },
    { id: 4, name: 'Processing', icon: Zap },
    { id: 5, name: 'Complete', icon: CheckCircle }
  ];

  const handlePurchase = async () => {
    setIsProcessing(true);
    setCurrentStep(4);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setIsProcessing(false);
      alert('Failed to load Razorpay. Please check your internet connection.');
      setCurrentStep(3);
      return;
    }

    const amountInPaise = Math.round(finalTotal * 100); // Razorpay expects amount in paise
    const key = (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || '';

    if (!key) {
      console.warn('VITE_RAZORPAY_KEY_ID is not set. Using test mode UI only.');
    }

    const options: any = {
      key,
      amount: amountInPaise,
      currency: 'INR',
      name: 'Blue Carbon Credits',
      description: `${quantity} credit(s) from ${credit.projectName}`,
      // order_id: '<create on server and pass here>', // recommended in production
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      notes: {
        project_name: credit.projectName,
        credits_quantity: String(quantity),
      },
      theme: { color: '#0ea5e9' },
      handler: (response: any) => {
        setPaymentId(response.razorpay_payment_id || '');
        setCurrentStep(5);
        setPurchaseComplete(true);
        setIsProcessing(false);
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
          setCurrentStep(3);
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="quantity" className="text-base font-semibold">
                How many credits would you like to purchase?
              </Label>
              <div className="mt-2 space-y-3">
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(credit.available, parseInt(e.target.value) || 1)))}
                  min="1"
                  max={credit.available}
                  className="text-lg p-3"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Minimum: 1 credit</span>
                  <span>Available: {credit.available.toLocaleString()} credits</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Purchase Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{quantity.toLocaleString()} tCO2e credits</span>
                </div>
                <div className="flex justify-between">
                  <span>Price per credit:</span>
                  <span>${credit.pricePerCredit}/tCO2e</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setCurrentStep(2)} 
              className="w-full" 
              size="lg"
              disabled={quantity < 1 || quantity > credit.available}
            >
              Continue to Payment <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-semibold">Payment Method</Label>
              <div className="grid grid-cols-1 gap-4 mt-3">
                <Card className={`ring-2 ring-primary`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6" />
                      <div>
                        <div className="font-semibold">Razorpay (Card / UPI)</div>
                        <div className="text-sm text-muted-foreground">Pay securely using credit/debit cards or UPI</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Secure Payment</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    You will be redirected to Razorpay Checkout to complete your payment.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setCurrentStep(3)} className="flex-1">
                Continue <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Confirm Your Purchase</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Project:</span>
                  <span className="font-semibold">{credit.projectName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{quantity.toLocaleString()} tCO2e credits</span>
                </div>
                <div className="flex justify-between">
                  <span>Credits subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform fee (2.5%):</span>
                  <span>${platformFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-800">Payment Protection</h4>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Secure processing via Razorpay</li>
                <li>• Instant confirmation on success</li>
                <li>• Digital certificate included</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handlePurchase} className="flex-1" size="lg">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay with Razorpay
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Zap className="h-10 w-10 text-blue-600 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Waiting for Payment</h3>
              <p className="text-muted-foreground">
                Complete the payment in the Razorpay window. Do not close this tab.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Progress value={66} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Verifying payment</span>
                <span>Minting tokens</span>
                <span>Transferring ownership</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-left max-w-md mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-semibold">Transaction Status</span>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Awaiting payment confirmation...</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-2 text-green-800">Purchase Successful!</h3>
              <p className="text-muted-foreground">
                You now own {quantity.toLocaleString()} blue carbon credits from {credit.projectName}
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Transaction Receipt
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {paymentId && (
                  <div className="flex justify-between">
                    <span>Payment ID:</span>
                    <span className="font-mono break-all">{paymentId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Credits Purchased:</span>
                  <span className="font-semibold">{quantity.toLocaleString()} tCO2e</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Paid:</span>
                  <span className="font-semibold">${finalTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Purchase Date:</span>
                  <span>{new Date().toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 max-w-md mx-auto">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Blockchain
              </Button>
            </div>

            <Button onClick={onClose} className="w-full max-w-md mx-auto">
              Return to Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${isCompleted ? 'bg-green-500 border-green-500 text-white' :
                      isCurrent ? 'border-primary bg-primary text-white' :
                      'border-gray-300 text-gray-400'}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-12 h-0.5 mx-2 
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((step) => (
              <div key={step.id} className="text-xs text-center w-20">
                {step.name}
              </div>
            ))}
          </div>
        </div>

        {/* Project Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              {credit.projectName}
            </CardTitle>
            <CardDescription>
              {credit.location} • {credit.type} • {credit.verification}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}